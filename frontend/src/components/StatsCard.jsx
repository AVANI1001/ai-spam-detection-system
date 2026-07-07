function StatsCard({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: 20,
        borderRadius: 15,
        flex: 1,
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default StatsCard;