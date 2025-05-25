// services/customerService.js
import models from '../models/index.js';
const { Customer } = models;

export const getAllCustomers = async () => {
  return await Customer.findAll();
};

export const getCustomerById = async (id) => {
  return await Customer.findByPk(id);
};

export const createCustomer = async (data) => {
  return await Customer.create(data);
};

export const updateCustomer = async (id, data) => {
  const customer = await Customer.findByPk(id);
  if (!customer) return null;
  await customer.update(data);
  return customer;
};

export const deleteCustomer = async (id) => {
  const customer = await Customer.findByPk(id);
  if (!customer) return null;
  await customer.destroy();
  return customer;
};
