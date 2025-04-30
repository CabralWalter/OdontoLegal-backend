const express = require('express');
const cors = require('cors');
const casosRoutes = require('./routes/casosRoutes.js');

const app = express();
const port = 3000;

app.use(cors());  // Habilitar CORS
app.use(express.json());  // Para interpretar JSON no corpo da requisição

// Rota para casos
app.use('/api/casos', casosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
