import { useEffect, useState } from "react";
import api from "../api/api";
import StatsCard from "./StatsCard";

function DashboardStats() {

  const [stats, setStats] = useState({
    total: 0,
    spam: 0,
    ham: 0,
    avgConfidence: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    const res = await api.get("/dashboard");

    setStats(res.data);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        marginBottom: 30,
      }}
    >
      <StatsCard
        title="Total"
        value={stats.total}
        color="#2563eb"
      />

      <StatsCard
        title="Spam"
        value={stats.spam}
        color="#dc2626"
      />

      <StatsCard
        title="Safe"
        value={stats.ham}
        color="#16a34a"
      />

      <StatsCard
        title="Avg Confidence"
        value={`${(stats.avgConfidence * 100).toFixed(1)}%`}
        color="#7c3aed"
      />
    </div>
  );
}

export default DashboardStats;