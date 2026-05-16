const fs   = require('fs');
const path = require('path');
const pool = require('./pool');

// ── Pfade ──────────────────────────────────────────────────
const DATA_JS = path.join('/app/frontend/assets/js/data.js');
const CSV_DIR   = path.join(__dirname, '../../../database/data');

// ── data.js in Node.js laden (window.* simulieren) ─────────
function loadDataJs() {
  const src = fs.readFileSync(DATA_JS, 'utf8');
  const sandbox = { window: {} };
  const fn = new Function('window', src);
  fn(sandbox.window);
  return sandbox.window;
}

// ── CSV schreiben ───────────────────────────────────────────
function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function writeCSV(filepath, headers, rows) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map(h => escapeCSV(row[h])).join(','));
  }
  fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
  console.log(`  ✓ ${path.basename(filepath)} (${rows.length} Zeilen)`);
}

function generateCSVs(data) {
  fs.mkdirSync(CSV_DIR, { recursive: true });

  // areas.csv
  writeCSV(
    path.join(CSV_DIR, 'areas.csv'),
    ['id','name','short','color','icon','blurb'],
    data.AREAS.map(a => ({
      id: a.id, name: a.name, short: a.short,
      color: a.color, icon: a.icon, blurb: a.blurb
    }))
  );

  // projects.csv — aus GOALS + GESETZ_EXTRA flach klopfen
  const projects = [];
  data.GOALS.forEach(g => {
    g.ags.forEach(ag => {
      ag.ps.forEach(p => {
        projects.push({
          id:             p.id,
          name:           p.name,
          description:    p.desc,
          status:         p.st,
          budget:         p.budget,
          resources:      p.res,
          duration:       p.dur,
          priority:       p.prio,
          area_id:        g.area,
          goal_id:        g.id,
          annual_goal_id: ag.id,
          year:           ag.year,
          dependencies:   (p.deps && p.deps.length) ? p.deps.join(';') : '',
          reg:            p.reg || '',
          reg_paragraph:  p.regParagraph || '',
          overlap:        ''
        });
      });
    });
  });
  data.GESETZ_EXTRA.forEach(p => {
    projects.push({
      id:             p.id,
      name:           p.name,
      description:    p.desc,
      status:         p.st,
      budget:         p.budget,
      resources:      p.res,
      duration:       p.dur,
      priority:       p.prio,
      area_id:        p.areaId,
      goal_id:        '',
      annual_goal_id: '',
      year:           2026,
      dependencies:   (p.deps && p.deps.length) ? p.deps.join(';') : '',
      reg:            p.reg || '',
      reg_paragraph:  p.regParagraph || '',
      overlap:        (p.overlap && p.overlap.length) ? p.overlap.join(';') : ''
    });
  });
  writeCSV(
    path.join(CSV_DIR, 'projects.csv'),
    ['id','name','description','status','budget','resources','duration','priority',
     'area_id','goal_id','annual_goal_id','year','dependencies','reg','reg_paragraph','overlap'],
    projects
  );

  // orientations.csv
  writeCSV(
    path.join(CSV_DIR, 'orientations.csv'),
    ['id','name','icon','tag','description','weight_ki','weight_pl','weight_ak','weight_ve',
     'risk','tt_impact','active_projects','priority_mz'],
    data.ORIENTATIONS.map(o => ({
      id:              o.id,
      name:            o.name,
      icon:            o.icon,
      tag:             o.tag,
      description:     o.desc,
      weight_ki:       o.weights.ki,
      weight_pl:       o.weights.pl,
      weight_ak:       o.weights.ak,
      weight_ve:       o.weights.ve,
      risk:            o.risk,
      tt_impact:       o.ttImpact,
      active_projects: o.active.join(';'),
      priority_mz:     o.priorityMZ.join(';')
    }))
  );
}

// ── Datenbank befüllen ──────────────────────────────────────
async function seedDatabase(data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Areas
    for (const a of data.AREAS) {
      await client.query(
        `INSERT INTO areas(id,name,short,color,icon,blurb)
         VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(id) DO NOTHING`,
        [a.id, a.name, a.short, a.color, a.icon, a.blurb]
      );
    }

    // Goals
    for (const g of data.GOALS) {
      await client.query(
        `INSERT INTO goals(id,area_id,name,type)
         VALUES($1,$2,$3,$4) ON CONFLICT(id) DO NOTHING`,
        [g.id, g.area, g.name, g.type]
      );

      // Annual Goals
      for (const ag of g.ags) {
        await client.query(
          `INSERT INTO annual_goals(id,goal_id,year,name,kpis)
           VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING`,
          [ag.id, g.id, ag.year, ag.name, ag.kpis]
        );

        // Projects
        for (const p of ag.ps) {
          await client.query(
            `INSERT INTO projects(id,name,description,status,budget,resources,duration,
              priority,area_id,goal_id,annual_goal_id,year,dependencies,reg,reg_paragraph)
             VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
             ON CONFLICT(id) DO NOTHING`,
            [p.id, p.name, p.desc, p.st, p.budget, p.res, p.dur,
             p.prio, g.area, g.id, ag.id, ag.year,
             p.deps||[], p.reg||null, p.regParagraph||null]
          );
        }
      }
    }

    // Gesetzliche Projekte
    for (const p of data.GESETZ_EXTRA) {
      await client.query(
        `INSERT INTO projects(id,name,description,status,budget,resources,duration,
          priority,area_id,year,dependencies,reg,reg_paragraph,overlap)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         ON CONFLICT(id) DO NOTHING`,
        [p.id, p.name, p.desc, p.st, p.budget, p.res, p.dur,
         p.prio, p.areaId, 2026,
         p.deps||[], p.reg||null, p.regParagraph||null, p.overlap||[]]
      );
    }

    // Orientations
    for (const o of data.ORIENTATIONS) {
      await client.query(
        `INSERT INTO orientations(id,name,icon,tag,description,
          weight_ki,weight_pl,weight_ak,weight_ve,
          risk,tt_impact,active_projects,priority_mz)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         ON CONFLICT(id) DO NOTHING`,
        [o.id, o.name, o.icon, o.tag, o.desc,
         o.weights.ki, o.weights.pl, o.weights.ak, o.weights.ve,
         o.risk, o.ttImpact, o.active, o.priorityMZ]
      );
    }

    await client.query('COMMIT');
  } catch(err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// ── Hauptfunktion ───────────────────────────────────────────
async function init() {
  console.log('\n🔄 Datenbank-Init wird geprüft...');

  // Prüfen ob DB bereits befüllt ist
  const { rows } = await pool.query('SELECT COUNT(*) FROM projects');
  const count = parseInt(rows[0].count);

  if (count > 0) {
    console.log(`✅ Datenbank bereits befüllt (${count} Projekte) — kein Seed nötig.\n`);
    return;
  }

  console.log('📂 Datenbank leer — starte Seed aus data.js...');

  // data.js laden
  const data = loadDataJs();
  console.log(`  ✓ data.js geladen (${data.AREAS.length} Areas, ${data.GOALS.length} Ziele)`);

  // CSVs generieren
  console.log('📄 CSVs werden generiert...');
  generateCSVs(data);

  // DB befüllen
  console.log('💾 Datenbank wird befüllt...');
  await seedDatabase(data);

  const { rows: after } = await pool.query('SELECT COUNT(*) FROM projects');
  console.log(`✅ Seed abgeschlossen: ${after[0].count} Projekte in der Datenbank.\n`);
}

module.exports = init;
