const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const evidenciaController = require('../controllers/evidenciaController');

router.post('/:casoId/upload-imagem', upload.single('arquivo'), evidenciaController.uploadImagem);

router.post('/:casoId/texto', evidenciaController.criarTexto);

module.exports = router;
