const express = require('express');
const { verifyToken, isAdmin } = require('../../Middleware/auth.middleware.js');

const{ 

    getPasajeros,
    createPasajero,
    getOnePasajero,
    updatePasajero,
    deletePasajero,

} = require('../../controllers/ClientesControllers/pasajerosControllers.js');

const router = express.Router();

router.get('/pasajeros',verifyToken, getPasajeros);
router.post('/pasajeros',verifyToken, isAdmin, createPasajero);
router.get('/pasajeros/:id_pasajero',verifyToken, getOnePasajero);
router.put('/pasajeros/:id_pasajero',verifyToken, isAdmin, updatePasajero);
router.delete('/pasajeros/:id_pasajero',verifyToken, isAdmin, deletePasajero);

module.exports = router;
