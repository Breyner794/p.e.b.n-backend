const express = require('express');
const { verifyToken, isAdmin } = require('../../Middleware/auth.middleware.js');

const {

    getReserva,
    getReservaOne,
    createReserva,
    updateReserva,
    deleteReserva,

} = require('../../controllers/ClientesControllers/reservasControllers.js');

const router = express.Router();

router.get('/reservas',verifyToken,  getReserva);
router.get('/reservas/:id_reserva',verifyToken, getReservaOne);
router.post('/reservas',verifyToken, isAdmin, createReserva);
router.put('/reservas/:id_reserva',verifyToken, isAdmin, updateReserva);
router.delete('/reservas/:id_reserva',verifyToken, isAdmin, deleteReserva);

module.exports = router;