import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

import User from './user.js';
import Customer from './costumer.js';
import Order from './order.js';

// Init models harus dipanggil dengan sequelize instance
const models = {
  User: User.init(sequelize),
  Customer: Customer.init(sequelize),
  Order: Order.init(sequelize),

};

// Jika ada asosiasi antar model, panggil associate
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

export { sequelize };
export default models;
