const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');

router.post('/', casoController.createCaso);
router.get('/', casoController.getCasos);
router.get('/:id', casoController.getCasoById);
router.patch('/:id/status', casoController.updateStatus);
router.post('/:id/evidencias', casoController.addEvidence);

module.exports = router;
