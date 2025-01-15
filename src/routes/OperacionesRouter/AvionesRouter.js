const express = require('express');
const {verifyToken, isAdmin} = require('../../Middleware/auth.middleware.js')

const{
    getAllAviones,
    createAvion,
    deleteAvion,
    updateAvion,
} = require ('../../controllers/OperacionesControllers/avionesController.js')

const router = express.Router();

router.get('/aviones', verifyToken, getAllAviones);
router.post('/aviones', verifyToken, isAdmin,createAvion);
router.delete('/aviones/:id_avion',verifyToken, isAdmin, deleteAvion);
router.put('/aviones/:id_avion',verifyToken, isAdmin, updateAvion);

module.exports=router;