const express = require('express');
const Localize = require('engine/helper/localize/index');
const helper = require('./helper');

const router = express.Router();

const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Localize().getLocalTime().toISOString(),
      uptime: helper.formatDuration(process.uptime()),
      service: 'rating-consumer',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Localize().getLocalTime().toISOString(),
      error: error.message,
    });
  }
};

router.get('/liveness', healthCheck);

module.exports = router;
