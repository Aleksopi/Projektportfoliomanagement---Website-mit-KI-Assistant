const express    = require('express');
const router     = express.Router();
const Anthropic  = require('@anthropic-ai/sdk');
const pool       = require('../db/pool');

const client = new Anthropic();

// POST /api/ai/orientation
router.post('/ai/orientation', async (req, res) => {
  const { userInput } = req.body;

  if (!userInput || userInput.trim().length < 10) {
    return res.status(400).json({ error: 'Bitte eine aussagekräftige Strategiebeschreibung eingeben.' });
  }

  try {
    // Projektdaten aus DB laden
    const { rows: projects } = await pool.query(`
      SELECT id, name, description, status, budget, priority, area_id, duration
      FROM projects ORDER BY id
    `);
    const { rows: areas } = await pool.query('SELECT * FROM areas');

    // Projektliste für Prompt aufbereiten
    const projectList = projects.map(p =>
      `${p.id} | ${p.area_id.toUpperCase()} | ${p.name} | Budget: ${p.budget}k€ | ${p.status} | Prio: ${p.priority}`
    ).join('\n');

    const areaList = areas.map(a =>
      `${a.id}: ${a.name}`
    ).join('\n');

    const systemPrompt = `Du bist ein strategischer Portfolio-Berater für die Haufe Group.
Du kennst das komplette Projektportfolio mit 76 Projekten über 4 Kernthemen:

KERNTHEMEN:
${areaList}

ALLE PROJEKTE (Format: ID | Bereich | Name | Budget | Status | Priorität):
${projectList}

REGELN:
- Wähle GENAU 10 strategische Projekte als aktiv (nicht gesetzliche)
- Die 3 gesetzlichen Projekte (P-G1, P-G2, P-G8) sind IMMER automatisch aktiv
- Wähle Projekte die zur beschriebenen Strategie passen
- Gewichte die 4 Bereiche (ki, pl, ak, ve) — Summe muss genau 100 ergeben
- "name": Erstelle einen prägnanten, aussagekräftigen Titel (max. 4 Wörter) der die Kernstrategie widerspiegelt
- "explanation": Schreibe 2-3 Sätze die erklären warum genau diese Projekte gewählt wurden und was die Ausrichtung strategisch bewirkt
- Antworte NUR mit validem JSON, kein Text davor oder danach

AUSGABE-FORMAT (exakt so):
{
  "name": "Prägnanter Strategietitel",
  "icon": "◈",
  "tag": "Kurze Tagline max 6 Wörter",
  "desc": "Ein Satz der die Ausrichtung beschreibt.",
  "explanation": "2-3 Sätze warum diese Projekte gewählt wurden und was die Ausrichtung strategisch bewirkt.",
  "weights": { "ki": 25, "pl": 25, "ak": 25, "ve": 25 },
  "risk": "niedrig",
  "ttImpact": "mittel",
  "active": ["P01", "P02", "P03", "P21", "P22", "P23", "P31", "P42", "P46", "P48"],
  "priorityMZ": ["ki-mz1", "pl-mz1"]
}`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Erstelle eine Portfolio-Ausrichtung für folgende Strategie: ${userInput}`
        }
      ]
    });

    // JSON aus Antwort extrahieren
    const raw = message.content[0].text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('KI hat kein gültiges JSON zurückgegeben.');

    const orientation = JSON.parse(jsonMatch[0]);

    // Pflichtfelder prüfen
    const required = ['name', 'weights', 'active', 'risk', 'ttImpact'];
    for (const field of required) {
      if (!orientation[field]) throw new Error(`Pflichtfeld fehlt: ${field}`);
    }

    // Gesetzliche Projekte immer hinzufügen
    const gesetz = ['P-G1', 'P-G2', 'P-G8'];
    gesetz.forEach(id => {
      if (!orientation.active.includes(id)) orientation.active.push(id);
    });

    res.json({ success: true, orientation });

  } catch (err) {
    console.error('KI Fehler:', err.message);
    res.status(500).json({ error: 'KI-Anfrage fehlgeschlagen: ' + err.message });
  }
});

// GET /api/ai/orientations — alle gespeicherten KI-Ausrichtungen
router.get('/ai/orientations', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM ai_orientations ORDER BY created_at DESC LIMIT 20'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/orientations/save — KI-Ausrichtung speichern
router.post('/ai/orientations/save', async (req, res) => {
  const { orientation, userInput } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO ai_orientations
        (name, icon, tag, description, explanation, user_input,
         weight_ki, weight_pl, weight_ak, weight_ve,
         risk, tt_impact, active_projects, priority_mz)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING id, created_at`,
      [
        orientation.name,
        orientation.icon || '◈',
        orientation.tag,
        orientation.desc,
        orientation.explanation || '',
        userInput,
        orientation.weights.ki,
        orientation.weights.pl,
        orientation.weights.ak,
        orientation.weights.ve,
        orientation.risk,
        orientation.ttImpact,
        orientation.active,
        orientation.priorityMZ || []
      ]
    );
    res.json({ success: true, id: rows[0].id, created_at: rows[0].created_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;