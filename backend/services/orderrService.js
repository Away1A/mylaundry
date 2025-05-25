import models from '../models/index.js';
const { Order, Customer } = models;

export const getAllOrders = async () => {
  return await Order.findAll({
    include: {
      model: Customer,
      as: 'customer',
      attributes: ['id', 'name', 'phone', 'email'],
    },
  });
};

export const getOrderById = async (id) => {
  return await Order.findOne({
    where: { id },
    include: {
      model: Customer,
      as: 'customer',
      attributes: ['id', 'name', 'phone', 'email'],
    },
  });
};

export const createOrder = async (data) => {
  return await Order.create(data);
};

export const updateOrder = async (id, data) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  return await order.update(data);
};

export const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) return null;
  await order.destroy();
  return true;
};
