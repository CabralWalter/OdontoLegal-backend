const Caso = require('../models/Caso');

// Criar novo caso
exports.createCaso = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const novoCaso = await Caso.create({ titulo, descricao });
    res.status(201).json(novoCaso);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Listar todos os casos
exports.getCasos = async (req, res) => {
  try {
    const casos = await Caso.find();
    res.json(casos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Obter um caso por ID
exports.getCasoById = async (req, res) => {
  try {
    const caso = await Caso.findById(req.params.id);
    if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });
    res.json(caso);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Atualizar status do caso
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const caso = await Caso.findById(req.params.id);
    if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });

    await caso.updateStatus(status);
    res.json(caso);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Adicionar evidência ao caso
exports.addEvidence = async (req, res) => {
  try {
    const { evidencia } = req.body;
    const caso = await Caso.findById(req.params.id);
    if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });

    await caso.addEvidence(evidencia);
    res.json(caso);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
