const express = require("express");
const router = express.Router();
const { 
    checkMessage,
    getHistory,
    getDashboard,
} = require("../controllers/messageController");

router.post("/check", checkMessage);

router.get("/history", getHistory);

router.get("/dashboard", getDashboard);

module.exports = router;