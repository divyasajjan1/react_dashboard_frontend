import React, { useState } from "react";
import './PlayerTable.css';

function PlayerTable({ teamDC, teamMarvel, refreshTeams })  {

  const [newDCPlayer, setNewDCPlayer] = useState({
    player_name: "",
    player_height: "",
    player_weight: "",
    player_matches_played: ""
  });

  const [newMarvelPlayer, setNewMarvelPlayer] = useState({
    player_name: "",
    player_height: "",
    player_weight: "",
    player_matches_played: ""
  });

  // REMOVE this line:
  // refreshTeams();

  const handleInputChange = (e, team) => {
    const { name, value } = e.target;
    if(team === "DC") {
      setNewDCPlayer(prev => ({ ...prev, [name]: value }));
    } else {
      setNewMarvelPlayer(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = (e, team) => {
    e.preventDefault();
    let payload = team === "DC" ? newDCPlayer : newMarvelPlayer;

    if(!payload.player_name.trim()) {
      alert("Player name is required!");
      return;
    }

    fetch(team === "DC" ? "http://localhost:8000/teamdc" : "http://localhost:8000/teammarvel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      // REPLACE fetchTeams() with refreshTeams()
      refreshTeams();
      team === "DC" 
        ? setNewDCPlayer({ player_name: "", player_height: "", player_weight: "", player_matches_played: "" })
        : setNewMarvelPlayer({ player_name: "", player_height: "", player_weight: "", player_matches_played: "" });
    })
    .catch(err => console.error(err));
  }

  const renderTeam = (teamName, teamData, newPlayer, teamKey) => (
    <div className="team-container">
      <h3>Add new player</h3>
      <form className="add-player-form" onSubmit={(e) => handleSubmit(e, teamKey)}>
        <div className="input-fields">
          <input
            type="text"
            name="player_name"
            placeholder="Name"
            value={newPlayer.player_name}
            onChange={(e) => handleInputChange(e, teamKey)}
            required
          />
          <input
            type="number"
            name="player_height"
            placeholder="Height (cm)"
            value={newPlayer.player_height}
            onChange={(e) => handleInputChange(e, teamKey)}
          />
          <input
            type="number"
            name="player_weight"
            placeholder="Weight (lb)"
            value={newPlayer.player_weight}
            onChange={(e) => handleInputChange(e, teamKey)}
          />
          <input
            type="number"
            name="player_matches_played"
            placeholder="Matches Played"
            value={newPlayer.player_matches_played}
            onChange={(e) => handleInputChange(e, teamKey)}
          />
        </div>
        <button type="submit">Add Player</button>
      </form>

      <h2>{teamName}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height (cm)</th>
            <th>Weight (lb)</th>
            <th>Matches Played</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map(player => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.player_name}</td>
              <td>{player.player_height}</td>
              <td>{player.player_weight}</td>
              <td>{player.player_matches_played}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="teams-wrapper">
      {renderTeam("Team DC", teamDC, newDCPlayer, "DC")}
      {renderTeam("Team Marvel", teamMarvel, newMarvelPlayer, "Marvel")}
    </div>
  );
}

export default PlayerTable;
