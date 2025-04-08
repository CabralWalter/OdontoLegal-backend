const mongoose = require('mongoose');
const { Schema } = mongoose;

const evidenciaSchema = new Schema({
  tipo: { type: String, required: true, enum: ['imagem', 'texto'] },
  dataColeta: { type: Date, required: true },
  coletadoPor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  caso: { type: Schema.Types.ObjectId, ref: 'Caso', required: true }
}, { discriminatorKey: 'tipo', timestamps: true });

const Evidencia = mongoose.model('Evidencia', evidenciaSchema);

const imagemSchema = new Schema({
  imagemURL: { type: String, required: true }
});

const EvidenciaImagem = Evidencia.discriminator('imagem', imagemSchema);

const textoSchema = new Schema({
  conteudo: { type: String, required: true }
});

const EvidenciaTexto = Evidencia.discriminator('texto', textoSchema);

module.exports = {
  Evidencia,
  EvidenciaImagem,
  EvidenciaTexto
};
