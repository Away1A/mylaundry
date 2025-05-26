import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../styles/Dashboard.module.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const ChartSection = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Orders",
        data: [5, 9, 14, 7, 11],
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14,165,233,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className={styles.card}>
      <h2>📈 Monthly Orders</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartSection;
