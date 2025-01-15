const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 1) { // Asumiendo que 1 es el ID del rol admin
    return res.status(403).json({ message: 'Requiere rol de administrador' });
  }
  next();
};
