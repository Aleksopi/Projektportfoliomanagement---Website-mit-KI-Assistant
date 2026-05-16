// Wird in Schritt 3.3 vollständig ausgefüllt
// Platzhalter — Grundstruktur
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'haufe-portfolio-backend' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend läuft auf Port ${PORT}`));
