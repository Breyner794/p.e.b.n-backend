const express = require('express');
const sequelize = require('./db.js');
const cors = require('cors');
const empleadosRouters = require('./routes/empleadosRoutes.js'); // ../src/routes/empleadosRoutes.js
const rolesRouters = require('./routes/r_h.rolesRoutes.js');
const UsuariosRouters = require('./routes/r_h.usuariosRouters.js');;
const AeropuertosRouters = require('./routes/OperacionesRouter/aeropuertosRouter.js');
const AvionesRouters = require('./routes/OperacionesRouter/AvionesRouter.js');
const VuelosRouters = require('./routes/OperacionesRouter/vuelosRouters.js');
const TripulacionRouter = require('./routes/OperacionesRouter/tripulacionRouter.js');
const PasajeroRouter = require('./routes/ClientesRouter/pasajeroRouter.js');
const ReservaRouter = require('./routes/ClientesRouter/reservasRouter.js');
const EquipajeRouter = require('./routes/ClientesRouter/equipajeRouter.js');
const authRoutes = require('./routes/auth.routes.js');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', empleadosRouters, rolesRouters, UsuariosRouters, AeropuertosRouters, AvionesRouters, VuelosRouters, TripulacionRouter, PasajeroRouter, ReservaRouter, EquipajeRouter);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});