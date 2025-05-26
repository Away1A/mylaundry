import { useEffect, useState } from "react";
import { fetchOrders } from "../api/dashboard";
import styles from "../styles/Table.module.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchOrders(token)
      .then((data) => setOrders(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Order Date</th>
          <th>Pickup Date</th>
          <th>Status</th>
          <th>Total Price</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.customer?.name || "-"}</td>
            <td>{new Date(o.order_date).toLocaleDateString()}</td>
            <td>{new Date(o.pickup_date).toLocaleDateString()}</td>
            <td>{o.status}</td>
            <td>{o.total_price}</td>
            <td>{o.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
