require('dotenv').config();
const mongoose = require('mongoose');
const conectarDB = require('../db');
const Plato = require('../models/Plato');
const platos = require('./platos.json');

async function seed() {
  await conectarDB();
  try {
    await Plato.deleteMany({});
    const insertados = await Plato.insertMany(platos);
    console.log(`Se insertaron ${insertados.length} platos`);
  } catch (error) {
    console.error('Error en el seed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();