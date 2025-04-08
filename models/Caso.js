const mongoose = require('mongoose');

const casoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  status: {
    type: String,
    enum: ['em andamento', 'finalizado', 'arquivado'],
    default: 'em andamento'
  },
  dataAbertura: { type: Date, default: Date.now },
  dataFechamento: { type: Date },
  evidencias: [{ type: String }], // pode evoluir pra referência depois
}, { timestamps: true });

// Métodos customizados
casoSchema.methods.addEvidence = function (evidencia) {
  this.evidencias.push(evidencia);
  return this.save();
};

casoSchema.methods.generateReport = function () {
  // Aqui vai lógica futura de geração de laudo
  return `Laudo gerado para o caso: ${this.titulo}`;
};

casoSchema.methods.updateStatus = function (novoStatus) {
  this.status = novoStatus;
  if (novoStatus === 'finalizado' || novoStatus === 'arquivado') {
    this.dataFechamento = new Date();
  }
  return this.save();
};

module.exports = mongoose.model('Caso', casoSchema);
