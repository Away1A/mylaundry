import { useEffect, useState } from "react";
import { fetchCustomers } from "../api/dashboard";
import styles from "../styles/Table.module.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchCustomers(token)
      .then((data) => setCustomers(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!customers.length) return <p>No customers found.</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.phone}</td>
            <td>{c.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
