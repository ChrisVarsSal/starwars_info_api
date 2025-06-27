import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";
import PlanetList from "./pages/PlanetList";
import PlanetDetail from "./pages/PlanetDetail";
import StarshipList from "./pages/StarshipList";
import StarshipDetail from "./pages/StarshipDetail";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/planets" element={<PlanetList />} />
          <Route path="/planet/:id" element={<PlanetDetail />} />
          <Route path="/starships" element={<StarshipList />} />
          <Route path="/starship/:id" element={<StarshipDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
