const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  perfil: { type: String, enum: ['admin', 'perito', 'assistente'], default: 'assistente' }
});

module.exports = mongoose.model('User', UserSchema);
