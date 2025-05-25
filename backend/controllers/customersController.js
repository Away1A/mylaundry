// controllers/customersController.js
import * as customerService from '../services/customerService.js';

export const getAllCustomers = async (req, res) => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
};

export const getCustomerById = async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
};

export const createCustomer = async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  res.status(201).json(customer);
};

export const updateCustomer = async (req, res) => {
  const customer = await customerService.updateCustomer(req.params.id, req.body);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
};

export const deleteCustomer = async (req, res) => {
  const customer = await customerService.deleteCustomer(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json({ message: 'Customer deleted' });
};
