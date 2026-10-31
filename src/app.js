require('dotenv').config();
const express = require('express');
const conectarDB = require('./db');
const platosRoutes = require('./routes/platos.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del restaurante funcionando', endpoints: '/api/platos' });
});

app.use('/api/platos', platosRoutes);

// Cualquier ruta que no exista
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
});