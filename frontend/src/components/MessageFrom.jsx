// import { useState } from "react";
// import api from "../api/api";

// function MessageForm() {
//   const [message, setMessage] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleCheck = async () => {
//     if (!message.trim()) {
//       alert("Please enter a message");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/check", {
//         message,
//       });

//       setResult(response.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error connecting to backend");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>AI Spam Classifier</h1>

//       <textarea
//         rows="6"
//         placeholder="Type your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <br />
//       <br />

//       <button onClick={handleCheck} disabled={loading}>
//         {loading ? "Checking..." : "Check Spam"}
//       </button>

//       {result && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Prediction: {result.prediction.toUpperCase()}</h3>

//           <p>
//             <strong>Confidence:</strong>{" "}
//             {(result.confidence * 100).toFixed(2)}%
//           </p>

//           <p>
//             <strong>Message:</strong> {result.message}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MessageForm;

import { useState } from "react";
import api from "../api/api";

function MessageForm() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSpam = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/check", {
        message,
      });

      setResult(res.data);
      // Clear textarea after successful prediction
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-card">
      <textarea
        rows="6"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={checkSpam} disabled={loading}>
        {loading ? "Analyzing..." : "🔍 Analyze Message"}
      </button>

      {result && (
        <div className="result-card">
          <h2>
            {result.prediction === "spam"
              ? "🔴 SPAM"
              : "🟢 HAM"}
          </h2>

          <h3>
            Confidence:
            {(result.confidence * 100).toFixed(2)}%
          </h3>

          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}

export default MessageForm;