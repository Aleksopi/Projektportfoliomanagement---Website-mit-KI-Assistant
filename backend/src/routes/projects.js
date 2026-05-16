const express = require('express');
const router  = express.Router();
const pool    = require('../db/pool');

// GET /api/areas
router.get('/areas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM areas ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects
router.get('/projects', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.*, a.name as area_name, a.color as area_color, a.icon as area_icon
      FROM projects p
      LEFT JOIN areas a ON p.area_id = a.id
      ORDER BY p.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:id
router.get('/projects/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.*, a.name as area_name, a.color as area_color, a.icon as area_icon
      FROM projects p
      LEFT JOIN areas a ON p.area_id = a.id
      WHERE p.id = $1
    `, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Projekt nicht gefunden' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orientations
router.get('/orientations', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orientations ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;