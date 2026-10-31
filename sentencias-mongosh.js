// =============================================================
// Sentencias directas de MongoDB (sin la API ni Mongoose)
// Ejecutar con:  mongosh sentencias-mongosh.js
// Después, para restaurar los datos de la API:  npm run seed
// =============================================================

// ---------- CREACIÓN ----------
// Seleccionar la base de datos
db = db.getSiblingDB('restaurante');

// Borrar la colección si ya existía y crearla de nuevo
db.platos.drop();
db.createCollection('platos');

// Índice único por nombre (lo mismo que unique: true en Mongoose)
db.platos.createIndex({ nombre: 1 }, { unique: true });

// ---------- ALTAS ----------
// Alta de un solo plato
db.platos.insertOne({
  nombre: 'Milanesa napolitana con papas fritas',
  descripcion: 'Milanesa con salsa de tomate, jamón y muzzarella, con papas fritas.',
  ingredientes: ['nalga de ternera', 'pan rallado', 'huevo', 'salsa de tomate', 'jamón cocido', 'muzzarella', 'papas'],
  precio: 14500,
  aptoCeliacos: false,
  aptoVeganos: false,
  aptoDiabeticos: false,
  calorias: 1150,
  imagen: 'https://placehold.co/600x400?text=Milanesa+napolitana',
});

// Alta de varios platos a la vez
db.platos.insertMany([
  {
    nombre: 'Bife de chorizo con ensalada mixta',
    descripcion: 'Bife a la parrilla con ensalada de lechuga, tomate y cebolla.',
    ingredientes: ['bife de chorizo', 'lechuga', 'tomate', 'cebolla'],
    precio: 18900, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: true,
    calorias: 780, imagen: 'https://placehold.co/600x400?text=Bife+de+chorizo',
  },
  {
    nombre: 'Ensalada César',
    descripcion: 'Lechuga romana, pollo, croutons y parmesano.',
    ingredientes: ['lechuga romana', 'pollo', 'croutons', 'parmesano', 'aderezo César'],
    precio: 11200, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: true,
    calorias: 520, imagen: 'https://placehold.co/600x400?text=Ensalada+Cesar',
  },
  {
    nombre: 'Bowl vegano de garbanzos',
    descripcion: 'Garbanzos, quinoa, palta y aderezo de tahini.',
    ingredientes: ['garbanzos', 'quinoa', 'palta', 'zanahoria', 'tahini'],
    precio: 10800, aptoCeliacos: true, aptoVeganos: true, aptoDiabeticos: true,
    calorias: 610, imagen: 'https://placehold.co/600x400?text=Bowl+vegano',
  },
  {
    nombre: 'Ravioles de ricota con salsa bolognesa',
    descripcion: 'Ravioles caseros con salsa bolognesa.',
    ingredientes: ['harina de trigo', 'huevo', 'ricota', 'carne picada', 'tomate'],
    precio: 12600, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: false,
    calorias: 890, imagen: 'https://placehold.co/600x400?text=Ravioles+bolognesa',
  },
  {
    nombre: 'Salmón grillado con vegetales',
    descripcion: 'Salmón a la plancha con vegetales salteados.',
    ingredientes: ['salmón', 'zucchini', 'morrón', 'brócoli'],
    precio: 21500, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: true,
    calorias: 540, imagen: 'https://placehold.co/600x400?text=Salmon+grillado',
  },
  {
    nombre: 'Risotto de hongos',
    descripcion: 'Arroz arbóreo con hongos, sin lácteos.',
    ingredientes: ['arroz arbóreo', 'hongos de pino', 'champiñones', 'caldo de verduras'],
    precio: 13400, aptoCeliacos: true, aptoVeganos: true, aptoDiabeticos: false,
    calorias: 650, imagen: 'https://placehold.co/600x400?text=Risotto+de+hongos',
  },
  {
    nombre: 'Hamburguesa completa',
    descripcion: 'Medallón de 180 g con cheddar, panceta y huevo.',
    ingredientes: ['carne vacuna', 'pan de papa', 'queso cheddar', 'panceta', 'huevo'],
    precio: 13900, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: false,
    calorias: 1080, imagen: 'https://placehold.co/600x400?text=Hamburguesa+completa',
  },
  {
    nombre: 'Wok de vegetales y tofu',
    descripcion: 'Tofu salteado con vegetales y salsa de soja sin TACC.',
    ingredientes: ['tofu', 'brotes de soja', 'repollo', 'zanahoria', 'salsa de soja sin TACC'],
    precio: 11900, aptoCeliacos: true, aptoVeganos: true, aptoDiabeticos: true,
    calorias: 430, imagen: 'https://placehold.co/600x400?text=Wok+de+tofu',
  },
  {
    nombre: 'Flan casero con dulce de leche',
    descripcion: 'Flan de huevo con caramelo y dulce de leche.',
    ingredientes: ['leche', 'huevo', 'azúcar', 'dulce de leche'],
    precio: 5800, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: false,
    calorias: 420, imagen: 'https://placehold.co/600x400?text=Flan',
  },
]);

print('Platos después de las altas:', db.platos.countDocuments()); // 10

// ---------- CONSULTAS ----------
print('\nPlatos veganos:');
printjson(db.platos.find({ aptoVeganos: true }, { nombre: 1, _id: 0 }).toArray());

print('\nPlatos de menos de 12000, del más barato al más caro:');
printjson(db.platos.find({ precio: { $lt: 12000 } }, { nombre: 1, precio: 1, _id: 0 }).sort({ precio: 1 }).toArray());

print('\nPlatos que llevan huevo:');
printjson(db.platos.find({ ingredientes: 'huevo' }, { nombre: 1, _id: 0 }).toArray());

// ---------- MODIFICACIONES ----------
// Cambiar el precio de un plato
db.platos.updateOne(
  { nombre: 'Hamburguesa completa' },
  { $set: { precio: 14900 } }
);

// Agregar un ingrediente a la lista
db.platos.updateOne(
  { nombre: 'Ensalada César' },
  { $push: { ingredientes: 'huevo duro' } }
);

// Aumentar 500 el precio de todos los platos aptos para celíacos
db.platos.updateMany(
  { aptoCeliacos: true },
  { $inc: { precio: 500 } }
);

print('\nDespués de las modificaciones:');
printjson(db.platos.findOne({ nombre: 'Ensalada César' }, { nombre: 1, ingredientes: 1, _id: 0 }));
printjson(db.platos.findOne({ nombre: 'Hamburguesa completa' }, { nombre: 1, precio: 1, _id: 0 }));

// ---------- BAJAS ----------
// Eliminar un plato
db.platos.deleteOne({ nombre: 'Flan casero con dulce de leche' });

// Eliminar todos los platos de más de 1000 calorías
db.platos.deleteMany({ calorias: { $gt: 1000 } });

print('\nPlatos después de las bajas:', db.platos.countDocuments()); // 7