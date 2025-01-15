const User = require('..//models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // Agregamos esta línea

// Método de registro
exports.register = async (req, res) => {
  try {
    const { nombre_de_usuario, email, password, id_rol = 2 } = req.body; // id_rol 2 para usuarios normales

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { nombre_de_usuario }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'El email o nombre de usuario ya está registrado' 
      });
    }

    // Crear el usuario
    const user = await User.create({
      nombre_de_usuario,
      email,
      password, // el hash se hace automáticamente en el modelo
      id_rol,
      activo: true
    });

    // Generar token
    const token = jwt.sign(
      { id: user.id_usuario, role: user.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      message: 'Error en el servidor',
      error: error.message 
    });
  }
};

// Método de login (actualizado con más detalles)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validar que se proporcionen las credenciales
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email y password son requeridos' 
      });
    }

    const user = await User.findOne({ 
      where: { email, activo: true },
      attributes: ['id_usuario', 'nombre_de_usuario', 'email', 'password', 'id_rol']
    });

    if (!user) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Credenciales inválidas' 
      });
    }

    const token = jwt.sign(
      { 
        id: user.id_usuario, 
        role: user.id_rol,
        email: user.email,
        nombre: user.nombre_de_usuario
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id_usuario,
        nombre: user.nombre_de_usuario,
        email: user.email,
        rol: user.id_rol
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      message: 'Error en el servidor',
      error: error.message 
    });
  }
};