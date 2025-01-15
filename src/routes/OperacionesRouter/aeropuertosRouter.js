const express = require('express');
const {verifyToken, isAdmin} = require('../../Middleware/auth.middleware.js');

const{
    getAllAeropuertos,
    createAeropuerto,
    deleteaeropuerto,
    updateAeropuerto,
    getAeropuertosById

} = require ('../../controllers/OperacionesControllers/aeropuertosControllers.js')

const router = express.Router();

router.get('/aeropuertos',verifyToken, getAllAeropuertos);
router.get('/aeropuertos/:id_aeropuerto',verifyToken, getAeropuertosById);
router.post('/aeropuertos',verifyToken, isAdmin, createAeropuerto);
router.delete('/aeropuertos/:id_aeropuerto',verifyToken, isAdmin, deleteaeropuerto);
router.put('/aeropuertos/:id_aeropuerto',verifyToken, isAdmin, updateAeropuerto);


module.exports=router;