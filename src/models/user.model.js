const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const bcrypt = require('bcrypt');

const User = sequelize.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_de_usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
    tableName: 'usuarios',
  schema:'auth',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Hash password before saving
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;