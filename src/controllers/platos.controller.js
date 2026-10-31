const mongoose = require('mongoose');
const Plato = require('../models/Plato');

// Verifica que el id tenga el formato de MongoDB
const idValido = (id) => mongoose.Types.ObjectId.isValid(id);

// Convierte los errores de Mongoose en respuestas claras
function manejarError(res, error) {
  if (error.name === 'ValidationError') {
    const errores = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un plato con ese nombre' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

// GET /api/platos   (filtros: ?celiacos=true&veganos=true&diabeticos=true)
async function listar(req, res) {
  try {
    const filtro = {};
    if (req.query.celiacos) filtro.aptoCeliacos = req.query.celiacos === 'true';
    if (req.query.veganos) filtro.aptoVeganos = req.query.veganos === 'true';
    if (req.query.diabeticos) filtro.aptoDiabeticos = req.query.diabeticos === 'true';

    const platos = await Plato.find(filtro).sort({ nombre: 1 });
    res.json(platos);
  } catch (error) {
    manejarError(res, error);
  }
}

// GET /api/platos/:id
async function obtener(req, res) {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const plato = await Plato.findById(req.params.id);
    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }
    res.json(plato);
  } catch (error) {
    manejarError(res, error);
  }
}

// POST /api/platos  -> ALTA
async function crear(req, res) {
  try {
    const plato = await Plato.create(req.body);
    res.status(201).json(plato);
  } catch (error) {
    manejarError(res, error);
  }
}

// PUT /api/platos/:id  -> MODIFICACIÓN
async function actualizar(req, res) {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const plato = await Plato.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // devuelve el plato ya modificado
      runValidators: true, // aplica las reglas del schema también al modificar
    });
    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }
    res.json(plato);
  } catch (error) {
    manejarError(res, error);
  }
}

// DELETE /api/platos/:id  -> BAJA
async function eliminar(req, res) {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const plato = await Plato.findByIdAndDelete(req.params.id);
    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }
    res.json({ mensaje: 'Plato eliminado', plato });
  } catch (error) {
    manejarError(res, error);
  }
}

module.exports = { listar, obtener, crear, actualizar, eliminar };