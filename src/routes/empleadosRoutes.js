const express = require('express');
const {verifyToken, isAdmin} = require('../Middleware/auth.middleware.js');

const {
    getAllEmpleados,
    createEmpleado,
    getEmpleadoById,
    updateEmpleado,
    deleteEmpleado,
} = require('../controllers/empleadosController.js');

const router = express.Router();

/* Configurar el nombre de la ruta, para la api, osea que si le cambio el nombre a empleadoss entonces la direccion seria http://localhost:5000/api/empleadoss*/

router.get('/empleados',verifyToken, getAllEmpleados);
router.post('/empleados',verifyToken, isAdmin, createEmpleado);
router.get('/empleados/:id_empleado',verifyToken, getEmpleadoById);
router.put('/empleados/:id_empleado',verifyToken, isAdmin, updateEmpleado);
router.delete('/empleados/:id_empleado',verifyToken, isAdmin, deleteEmpleado);

module.exports = router;