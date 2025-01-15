const express = require('express');
const {verifyToken, isAdmin} =require('../../Middleware/auth.middleware.js');

const {
    
    getAllVuelos,
    getVuelos,
    deleteVuelo,
    createVuelo,
    updateVuelo,
    
} = require('../../controllers/OperacionesControllers/vuelosControllers.js');

const router = express.Router();


router.get('/vuelos',verifyToken, getAllVuelos);
router.get('/vuelos/:id_vuelo',verifyToken, getVuelos);
router.delete('/vuelos/:id_vuelo',verifyToken, isAdmin, deleteVuelo);
router.post('/vuelos',verifyToken, isAdmin, createVuelo);
router.put('/vuelos/:id_vuelo',verifyToken, isAdmin, updateVuelo);

module.exports=router;