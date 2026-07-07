import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function Charts({ spam, ham, weeklyData }) {
  const pieData = {
    labels: ["Spam", "Ham"],
    datasets: [
      {
        data: [spam, ham],
        backgroundColor: ["#ef4444", "#22c55e"],
      },
    ],
  };

  const lineData = {
  labels: weeklyData.map((item) => item.day),

  datasets: [
    {
      label: "Predictions",
      data: weeklyData.map((item) => item.count),
      borderColor: "#2563eb",
      tension: 0.4,
    },
  ],
};


return (
  <div
    style={{
      display: "flex",
      gap: 20,
      marginTop: 30,
      flexWrap: "wrap",
    }}
  >
    {/* Pie Chart */}
    <div
      style={{
        flex: 1,
        background: "white",
        padding: 20,
        borderRadius: 12,
        height: 350,
      }}
    >
      <h2>Spam vs Ham</h2>

      <div style={{ height: "260px" }}>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>

    {/* Line Chart */}
    <div
      style={{
        flex: 2,
        background: "white",
        padding: 20,
        borderRadius: 12,
        height: 350,
      }}
    >
      <h2>Weekly Predictions</h2>

      <div style={{ height: "260px" }}>
        <Line
          data={lineData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  </div>
);
}

export default Charts;