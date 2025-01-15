const express = require('express');
const { verifyToken, isAdmin } = require('../../Middleware/auth.middleware.js');

const{  
    getEquipaje,
    createEquipaje,
    updateEquipaje,
    deleteEquipaje,
} = require('../../controllers/ClientesControllers/equipajeControllers.js');

const router = express.Router();

router.get('/equipaje',verifyToken, isAdmin, getEquipaje);
router.post('/equipaje',verifyToken, isAdmin, createEquipaje);
router.put('/equipaje/:id_equipaje',verifyToken, isAdmin, updateEquipaje);
router.delete('/equipaje/:id_equipaje',verifyToken, isAdmin, deleteEquipaje);

module.exports = router;