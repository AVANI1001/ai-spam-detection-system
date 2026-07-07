import { useEffect, useState } from "react";
import api from "../api/api";

import Header from "../components/Header";
import DashboardStats from "../components/DashboardStats";
import MessageForm from "../components/MessageFrom";
import HistoryTable from "../components/HistoryTable";
import Charts from "../components/Charts";


function Dashboard() {

    const [stats, setStats] = useState({
        spam: 0,
        ham: 0,
        weeklyData: [],
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
       const res = await api.get("/dashboard");

        setStats(res.data);
    };

    return (
        <div className="dashboard">
            <Header />

            <br />

            <DashboardStats />

            <Charts
                spam={stats.spam}
                ham={stats.ham}
                weeklyData={stats.weeklyData}
            />
            <div className="hero">
                <h1>AI Spam Message Classifier</h1>

                <p>
                    Quick spam detection made easy.
                </p>
            </div>

            <MessageForm />

            <HistoryTable />
        </div>
    );
}

export default Dashboard;