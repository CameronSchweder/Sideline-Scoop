import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NFLNewsPage from "./pages/nfl-pages/NFLNewsPage";
import NFLSchedulePage from "./pages/nfl-pages/NFLSchedulePage";
import NFLStandingsPage from "./pages/nfl-pages/NFLStandingsPage";
import NFLPlayersPage from "./pages/nfl-pages/NFLPlayersPage";

import TestPage from "./pages/TestPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<NFLNewsPage />} />
          <Route path="/nfl-news" element={<NFLNewsPage />} />
          <Route path="/nfl-schedule" element={<NFLSchedulePage />} />
          <Route path="/nfl-standings" element={<NFLStandingsPage />} />
          <Route path="/nfl-players" element={<NFLPlayersPage />} />

          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
