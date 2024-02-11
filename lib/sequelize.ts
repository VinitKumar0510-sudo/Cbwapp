import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/cbwapp',
  {
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false
  }
);

export const GitCommand = sequelize.define('GitCommand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  command: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default sequelize;