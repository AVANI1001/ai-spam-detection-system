const axios = require("axios");
const Message = require("../models/Message");

exports.checkMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const mlRes = await axios.post("http://localhost:5001/predict", {
      message
    });

    const saved = await Message.create({
      message,
      prediction: mlRes.data.prediction,
      confidence: mlRes.data.confidence
    });

    res.json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// exports.getDashboard = async (req, res) => {
//   try {
//     const total = await Message.countDocuments();

//     const spam = await Message.countDocuments({
//       prediction: "spam",
//     });

//     const ham = await Message.countDocuments({
//       prediction: "ham",
//     });

//     const confidence = await Message.aggregate([
//       {
//         $group: {
//           _id: null,
//           avgConfidence: {
//             $avg: "$confidence",
//           },
//         },
//       },
//     ]);

//     res.json({
//       total,
//       spam,
//       ham,
//       avgConfidence:
//         confidence.length > 0
//           ? confidence[0].avgConfidence
//           : 0,
//     });

//   } catch (err) {
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };

exports.getDashboard = async (req, res) => {
  try {
    const total = await Message.countDocuments();

    const spam = await Message.countDocuments({
      prediction: "spam",
    });

    const ham = await Message.countDocuments({
      prediction: "ham",
    });

    const confidence = await Message.aggregate([
      {
        $group: {
          _id: null,
          avgConfidence: { $avg: "$confidence" },
        },
      },
    ]);

    // Weekly Data
    const weekly = await Message.aggregate([
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id": 1,
        },
      },
    ]);

    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const weeklyData = days.map((day, index) => {
      const found = weekly.find((w) => w._id === index + 1);

      return {
        day,
        count: found ? found.count : 0,
      };
    });

    res.json({
      total,
      spam,
      ham,
      avgConfidence:
        confidence.length > 0
          ? confidence[0].avgConfidence
          : 0,
      weeklyData,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};