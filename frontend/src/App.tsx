import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
import SchedulePage from "./pages/SchedulePage";
import StandingsPage from "./pages/StandingsPage";
import PlayersPage from "./pages/PlayersPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<SchedulePage />} />
          <Route path="/nfl-news" element={<NewsPage />} />
          <Route path="/nfl-schedule" element={<SchedulePage />} />
          <Route path="/nfl-standings" element={<StandingsPage />} />
          <Route path="/nfl-players" element={<PlayersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
