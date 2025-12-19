import React, { useState, useEffect } from "react";
import PlayerTable from "./PlayerTable";
import Statistics from "./Statistics";
import "./Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("players");
  const [teamDC, setTeamDC] = useState([]);
  const [teamMarvel, setTeamMarvel] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    fetch("http://localhost:8000/teamdc")
      .then(res => res.json())
      .then(data => setTeamDC(data));

    fetch("http://localhost:8000/teammarvel")
      .then(res => res.json())
      .then(data => setTeamMarvel(data));
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === "players" ? "active" : ""}
          onClick={() => setActiveTab("players")}
        >
          Players
        </button>
        <button
          className={activeTab === "stats" ? "active" : ""}
          onClick={() => setActiveTab("stats")}
        >
          Statistics / Charts
        </button>
      </div>

      {activeTab === "players" && (
        <PlayerTable
          teamDC={teamDC}
          teamMarvel={teamMarvel}
          refreshTeams={fetchTeams}
        />
      )}

      {activeTab === "stats" && (
        <Statistics
          teamDC={teamDC}
          teamMarvel={teamMarvel}
        />
      )}
    </div>
  );
}

export default Dashboard;
