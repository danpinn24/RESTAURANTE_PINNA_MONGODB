# API Restaurante - MongoDB y Mongoose

Trabajo práctico: base de datos de un restaurante con MongoDB y Mongoose.
Tiene una colección `platos` con los datos de cada plato y una API con Express
para hacer altas, bajas, modificaciones y consultas.

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose

## Datos de cada plato

nombre, descripción, ingredientes, precio, apto para celíacos, apto para veganos,
apto para diabéticos, calorías e imagen (URL).

## Cómo ejecutarlo

1. Tener instalado Node.js y MongoDB.
2. Instalar las dependencias:
   ```
   npm install
   ```
3. Crear un archivo `.env` con:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/restaurante
   PORT=3000
   ```
4. Cargar los 10 platos de ejemplo:
   ```
   npm run seed
   ```
5. Iniciar el servidor:
   ```
   npm run dev
   ```

## Endpoints

| Método | Ruta | Acción |
|---|---|---|
| GET | /api/platos | Listar platos (filtros: ?celiacos=true, ?veganos=true, ?diabeticos=true) |
| GET | /api/platos/:id | Traer un plato |
| POST | /api/platos | Alta |
| PUT | /api/platos/:id | Modificación |
| DELETE | /api/platos/:id | Baja |

## Archivos de prueba

- `requests.http`: pruebas de todos los endpoints (extensión REST Client de VS Code).
- `sentencias-mongosh.js`: sentencias de creación, altas, bajas y modificaciones
  directamente en MongoDB. Se ejecuta con `mongosh sentencias-mongosh.js`.