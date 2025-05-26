const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCustomers = async (token) => {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
};

export const fetchOrders = async (token) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};
