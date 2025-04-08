const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
const casoRoutes = require('./routes/casoRoutes');
const evidenciaRoutes = require('./routes/evidenciaRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/casos', casoRoutes);
app.use('/api/evidencias', evidenciaRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
  