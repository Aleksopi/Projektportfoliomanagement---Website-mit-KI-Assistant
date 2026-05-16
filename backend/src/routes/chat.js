const express   = require('express');
const router    = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const pool      = require('../db/pool');

const client = new Anthropic();

/* ── GET /api/chat/sessions — alle Sessions ── */
router.get('/chat/sessions', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT s.id, s.title, s.orientation_name, s.created_at, s.updated_at,
             COUNT(m.id) as message_count
      FROM chat_sessions s
      LEFT JOIN chat_messages m ON m.session_id = s.id
      GROUP BY s.id
      ORDER BY s.updated_at DESC
      LIMIT 30
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── GET /api/chat/sessions/:id — Session mit Nachrichten ── */
router.get('/chat/sessions/:id', async (req, res) => {
  try {
    const { rows: session } = await pool.query(
      'SELECT * FROM chat_sessions WHERE id = $1', [req.params.id]
    );
    if (!session.length) return res.status(404).json({ error: 'Session nicht gefunden' });
    const { rows: messages } = await pool.query(
      'SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC',
      [req.params.id]
    );
    res.json({ session: session[0], messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── POST /api/chat/sessions — neue Session anlegen ── */
router.post('/chat/sessions', async (req, res) => {
  const { orientationName } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO chat_sessions (title, orientation_name)
       VALUES ($1, $2) RETURNING *`,
      ['Neuer Chat', orientationName || 'Unbekannt']
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── POST /api/chat/sessions/:id/message — Nachricht senden ── */
router.post('/chat/sessions/:id/message', async (req, res) => {
  const { message, context } = req.body;
  const sessionId = req.params.id;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Nachricht darf nicht leer sein.' });
  }

  try {
    // Bestehende Nachrichten laden für Gesprächsverlauf
    const { rows: history } = await pool.query(
      'SELECT role, content FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC',
      [sessionId]
    );

    // Nutzernachricht speichern
    await pool.query(
      'INSERT INTO chat_messages (session_id, role, content) VALUES ($1, $2, $3)',
      [sessionId, 'user', message]
    );

    // Kontext aufbauen
    const activeProjects = (context.activeProjects || []).map(p =>
      `• ${p.id}: ${p.name} (${p.areaId?.toUpperCase()}, ${p.budget}k€, ${p.status})`
    ).join('\n');

    const systemPrompt = `Du bist ein strategischer KI-Berater für das Haufe Group Portfolio-Management.

AKTUELL GELADENE AUSRICHTUNG: "${context.orientationName || 'Unbekannt'}"
BESCHREIBUNG: ${context.orientationDesc || '—'}
GEWICHTUNG: KI ${context.weights?.ki || 0}% · Plattform ${context.weights?.pl || 0}% · Akademie ${context.weights?.ak || 0}% · Ventures ${context.weights?.ve || 0}%
RISIKO: ${context.risk || '—'} | TIME-TO-IMPACT: ${context.ttImpact || '—'}

AKTIVE PROJEKTE (${(context.activeProjects || []).length}):
${activeProjects || '—'}

Antworte präzise, analytisch und auf Deutsch. Beziehe dich konkret auf die Daten.
Halte Antworten kompakt (max. 3-4 Absätze). Nutze Markdown für Struktur wenn sinnvoll.`;

    // Gesprächsverlauf für Claude aufbauen
    const messages = history.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    }));
    messages.push({ role: 'user', content: message });

    // Claude aufrufen
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages
    });

    const assistantMessage = response.content[0].text;

    // Antwort speichern
    await pool.query(
      'INSERT INTO chat_messages (session_id, role, content) VALUES ($1, $2, $3)',
      [sessionId, 'assistant', assistantMessage]
    );

    // Session-Titel aus erster Nachricht ableiten (wenn noch Standard)
    const { rows: sess } = await pool.query('SELECT title FROM chat_sessions WHERE id=$1', [sessionId]);
    if (sess[0]?.title === 'Neuer Chat' && history.length === 0) {
      const shortTitle = message.length > 40 ? message.slice(0, 40) + '…' : message;
      await pool.query(
        'UPDATE chat_sessions SET title=$1, updated_at=NOW() WHERE id=$2',
        [shortTitle, sessionId]
      );
    } else {
      await pool.query('UPDATE chat_sessions SET updated_at=NOW() WHERE id=$1', [sessionId]);
    }

    res.json({ success: true, message: assistantMessage });
  } catch (err) {
    console.error('Chat Fehler:', err.message);
    res.status(500).json({ error: 'Chat-Anfrage fehlgeschlagen: ' + err.message });
  }
});

/* ── DELETE /api/chat/sessions/:id ── */
router.delete('/chat/sessions/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM chat_sessions WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
