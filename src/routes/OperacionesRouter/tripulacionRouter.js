const express = require('express');
const {verifyToken, isAdmin} =require('../../Middleware/auth.middleware.js')

const {getAllTripulaciones,
    getTripulacionBy,
    deleteTripulacion,
    createTripulacion,
    updateTripulacion,
}= require('../../controllers/OperacionesControllers/tripulacion_vueloControllers.js');

const router = express.Router();

router.get('/tripulacion',verifyToken, getAllTripulaciones);
router.get('/tripulacion/:id_tripulacion',verifyToken, getTripulacionBy);
router.delete('/tripulacion/:id_tripulacion', verifyToken, isAdmin,deleteTripulacion);
router.post('/tripulacion', verifyToken, isAdmin,createTripulacion);
router.put('/tripulacion/:id_tripulacion', verifyToken, isAdmin, updateTripulacion);

module.exports=router;