# React Dashboard Frontend

This repository contains the **React frontend** for the Players Dashboard application. It provides an interactive user interface to view, add, and monitor player data for multiple teams using APIs exposed by the Django REST Framework backend.

---

## Project Overview

- Frontend built using **React**
- Displays player data for **Team DC** and **Team Marvel**
- Communicates with Django REST APIs to fetch and update data
- Automatically refreshes data at fixed intervals to stay in sync with backend updates

---

## Tech Stack

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Fetch API

---

## Project Structure

```text
react_dashboard_frontend/
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── PlayerTable.jsx
│   │   ├── Statistics.jsx
│   ├── App.js
│   ├── index.js
│
├── package.json
```
## Application Features

### Navigation Tabs

- **Players**
- **Statistics / Charts**

Tabs allow users to switch between player management and analytical views.

---

### Players Tab

- Displays **two separate teams**:
  - Team DC
  - Team Marvel
- Each team has:
  - A dedicated **form** to add new players
  - A **table view** showing current player data
- Player details include:
  - Name
  - Height
  - Weight
  - Matches played
- Data is fetched from the backend using team-specific APIs

---

### Statistics / Charts Tab

- Displays statistical charts for both teams
- Visualizes player-related metrics
- Data is derived from the same backend APIs used in the Players tab

---

### Auto Refresh Logic

- The frontend automatically **refreshes player data every 5 seconds**
- Ensures the UI stays updated if:
  - Data is modified via pgAdmin
  - Data is updated from another client
  - Data changes through public API access (ngrok)

## Backend Integration

The frontend consumes the following backend endpoints:

- `/teamdc/` – Fetches players belonging to Team DC
- `/teammarvel/` – Fetches players belonging to Team Marvel

The backend is expected to run on:

```arduino
http://localhost:8000/
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd react_dashboard_frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm start
```
The application will be available at:
```arduino
http://localhost:3000/
```