import React from "react";
import "./Statistics.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

/* ----------------- Helper math functions ----------------- */

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function stdDev(values, mean) {
  if (!values.length) return 0;
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
    values.length;
  return Math.sqrt(variance);
}

function calculateStats(players = []) {
  if (!players.length) return null;

  const heights = players.map(p => Number(p.player_height || 0));
  const weights = players.map(p => Number(p.player_weight || 0));
  const matches = players.map(p => Number(p.player_matches_played || 0));

  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  const avgHeight = avg(heights);
  const avgWeight = avg(weights);
  const avgMatches = avg(matches);

  return {
    totalPlayers: players.length,
    avgHeight,
    medianHeight: median(heights),
    stdHeight: stdDev(heights, avgHeight),
    avgWeight,
    medianWeight: median(weights),
    stdWeight: stdDev(weights, avgWeight),
    avgMatches
  };
}

/* ----------------- TeamStats Component ----------------- */

function TeamStats({ teamName, stats }) {
  if (!stats) return null;

  const overviewData = {
    labels: ["Avg Height", "Avg Weight", "Avg Matches"],
    datasets: [
      {
        label: teamName,
        data: [stats.avgHeight, stats.avgWeight, stats.avgMatches],
        backgroundColor: "rgba(54,162,235,0.6)"
      }
    ]
  };

  const meanMedianData = {
    labels: ["Height", "Weight"],
    datasets: [
      {
        label: "Mean",
        data: [stats.avgHeight, stats.avgWeight],
        backgroundColor: "rgba(75,192,192,0.6)"
      },
      {
        label: "Median",
        data: [stats.medianHeight, stats.medianWeight],
        backgroundColor: "rgba(255,159,64,0.6)"
      }
    ]
  };

  const stdDevData = {
    labels: ["Height", "Weight"],
    datasets: [
      {
        label: "Std Dev",
        data: [stats.stdHeight, stats.stdWeight],
        backgroundColor: "rgba(153,102,255,0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  return (
    <div className="team-stats">
      <h2>{teamName}</h2>
      <p>Total Players: {stats.totalPlayers}</p>
      <p>Avg Height: {stats.avgHeight.toFixed(1)}</p>
      <p>Avg Weight: {stats.avgWeight.toFixed(1)}</p>
      <p>Avg Matches Played: {stats.avgMatches.toFixed(1)}</p>

      <div className="charts-wrapper">
        <div>
          <h4>Team Overview</h4>
          <Bar data={overviewData} options={options} />
        </div>

        <div>
          <h4>Mean vs Median</h4>
          <Bar data={meanMedianData} options={options} />
        </div>

        <div>
          <h4>Variation (Std Dev)</h4>
          <Bar data={stdDevData} options={options} />
        </div>
      </div>
    </div>
  );
}

/* ----------------- Main Statistics Component ----------------- */

function Statistics({ teamDC = [], teamMarvel = [] }) {
  const dcStats = calculateStats(teamDC);
  const marvelStats = calculateStats(teamMarvel);

  if (!dcStats && !marvelStats) {
    return <p>No stats available</p>;
  }

  const comparisonData = {
    labels: ["Avg Height", "Avg Weight", "Avg Matches"],
    datasets: [
      {
        label: "Team DC",
        data: dcStats
          ? [dcStats.avgHeight, dcStats.avgWeight, dcStats.avgMatches]
          : [],
        backgroundColor: "rgba(54,162,235,0.6)"
      },
      {
        label: "Team Marvel",
        data: marvelStats
          ? [marvelStats.avgHeight, marvelStats.avgWeight, marvelStats.avgMatches]
          : [],
        backgroundColor: "rgba(255,99,132,0.6)"
      }
    ]
  };

  return (
    <div className="stats-wrapper">
      <TeamStats teamName="Team DC" stats={dcStats} />
      <TeamStats teamName="Team Marvel" stats={marvelStats} />

      <div className="team-stats">
        <h2>Team Comparison</h2>
        <Bar data={comparisonData} />
      </div>
    </div>
  );
}

export default Statistics;
