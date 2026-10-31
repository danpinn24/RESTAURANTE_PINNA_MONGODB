const { Schema, model } = require('mongoose');

const platoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
    },
    ingredientes: {
      type: [String],
      validate: {
        validator: (lista) => lista.length > 0,
        message: 'El plato debe tener al menos un ingrediente',
      },
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    aptoCeliacos: { type: Boolean, default: false },
    aptoVeganos: { type: Boolean, default: false },
    aptoDiabeticos: { type: Boolean, default: false },
    calorias: {
      type: Number,
      required: [true, 'Las calorías son obligatorias'],
      min: [0, 'Las calorías no pueden ser negativas'],
    },
    imagen: {
      type: String,
      required: [true, 'La imagen es obligatoria'],
      match: [/^https?:\/\/.+/, 'La imagen debe ser una URL (http o https)'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Plato', platoSchema);