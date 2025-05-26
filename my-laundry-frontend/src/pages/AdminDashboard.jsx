import { useEffect, useState } from "react";
import { fetchMyProfile } from "../api/auth";
import CustomerList from "../components/CustomerList";
import OrderList from "../components/OrderList";
import Sidebar from "../components/Sidebar";
import ChartSection from "../components/ChartSection";
import styles from "../styles/Dashboard.module.css";

const AdminDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const loadProfile = async () => {
      try {
        const data = await fetchMyProfile(token);
        setProfile(data);
      } catch {
        setError("Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.content}>
        <header className={styles.dashboardHeader}>
          <h1>📊 Admin Dashboard</h1>
          <div className={styles.profileBox}>
            {profile ? (
              <>
                <span className={styles.username}>{profile.username}</span>
                <span className={styles.roleBadge}>{profile.role}</span>
              </>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </header>

        {error && <p className={styles.errorText}>{error}</p>}

        <main className={styles.dashboardMain}>
          <ChartSection />

          <section className={styles.card}>
            <h2>👥 Customers</h2>
            <div className={styles.tableWrapper}>
              <CustomerList />
            </div>
          </section>

          <section className={styles.card}>
            <h2>🛒 Orders</h2>
            <div className={styles.tableWrapper}>
              <OrderList />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
