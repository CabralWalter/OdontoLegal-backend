const casos = [
  {
    id: 1,
    titulo: 'Caso 1',
    resumo: 'Resumo detalhado do caso 1.',
    laudo: 'Laudo completo do caso 1...',
    evidencias: ['Evidência 1', 'Evidência 2', 'Evidência 3']
  },
  {
    id: 2,
    titulo: 'Caso 2',
    resumo: 'Resumo detalhado do caso 2.',
    laudo: 'Laudo completo do caso 2...',
    evidencias: ['Evidência A', 'Evidência B']
  }
];

// Função para obter todos os casos
exports.getCasos = (req, res) => {
  res.json(casos);
};

// Função para obter um caso específico
exports.getCasoById = (req, res) => {
  const casoId = parseInt(req.params.id);
  const caso = casos.find(c => c.id === casoId);
  if (caso) {
    res.json(caso);
  } else {
    res.status(404).json({ mensagem: 'Caso não encontrado' });
  }
};
