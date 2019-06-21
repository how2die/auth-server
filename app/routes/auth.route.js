const express = require('express');
const router = express.Router();

const credentials_controller = require('../controllers/auth.controller');

router.put('/credentials/:userid', credentials_controller.saveCredentials);
router.post('/tokens', credentials_controller.createToken);
router.get('/tokens/:token', credentials_controller.verifyToken);

module.exports = router;
