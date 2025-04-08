const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, senha, perfil } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha: hash, perfil });
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id, perfil: user.perfil }, process.env.JWT_SECRET);
    res.json({ token, perfil: user.perfil });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
