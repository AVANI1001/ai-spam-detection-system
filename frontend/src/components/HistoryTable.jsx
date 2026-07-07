import { useEffect, useState } from "react";
import api from "../api/api";

function HistoryTable() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await api.get("/history");

    setHistory(res.data);
  };

  return (
    <div className="history-card">
      <h2>Prediction History</h2>

      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Prediction</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.message}</td>

              <td>
                {item.prediction === "spam"
                  ? "🔴 Spam"
                  : "🟢 Ham"}
              </td>

              <td>
                {(item.confidence * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;