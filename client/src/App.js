import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EventList from './EventList';
import EventCreate from './EventCreate';
import AdminPanel from './AdminPanel'; // Administratoriaus panelės komponentas

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Miesto Renginiai</h1>
          <p>Čia galite rasti artėjančius renginius mūsų mieste</p>
        </header>

        <nav>
          <div className="button-container">
            <Link to="/create-event" className="button">Sukurti renginį</Link>
            <Link to="/view-events" className="button">Peržiūrėti renginius</Link>
            <Link to="/admin-panel" className="button">Administratoriaus panelė</Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/create-event" element={<EventCreate />} />  {/* Renginių kūrimo forma */}
            <Route path="/view-events" element={<EventList />} />    {/* Renginių sąrašas */}
            <Route path="/admin-panel" element={<AdminPanel />} />  {/* Administratoriaus panelė */}
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Miesto Renginiai | Visos teisės saugomos</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
