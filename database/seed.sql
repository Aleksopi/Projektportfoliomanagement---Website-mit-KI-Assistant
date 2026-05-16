require('dotenv').config();
const pool = require('./pool');

const { AREAS, GOALS, GESETZ_EXTRA, ORIENTATIONS } = {
  AREAS: require('../../../frontend/assets/js/data.js').AREAS,
  GOALS: require('../../../frontend/assets/js/data.js').GOALS,
  GESETZ_EXTRA: require('../../../frontend/assets/js/data.js').GESETZ_EXTRA,
  ORIENTATIONS: require('../../../frontend/assets/js/data.js').ORIENTATIONS,
};