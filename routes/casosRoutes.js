const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

// Rota para buscar todos os casos
router.get('/', casosController.getCasos);

// Rota para buscar os detalhes de um caso específico
router.get('/:id', casosController.getCasoById);

module.exports = router;
