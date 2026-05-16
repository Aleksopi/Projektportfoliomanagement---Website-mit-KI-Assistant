require('dotenv').config();
const express  = require('express');
const init     = require('./db/init');
const projects = require('./routes/projects');
const ai       = require('./routes/ai');
const chat     = require('./routes/chat');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api', projects);
app.use('/api', ai);
app.use('/api', chat);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'haufe-portfolio-backend' });
});

async function start() {
  try {
    await init();
    app.listen(PORT, () => {
      console.log(`🚀 Backend läuft auf Port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Fehler beim Start:', err.message);
    process.exit(1);
  }
}

start();
