import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CharacterList from "./pages/Characters/CharacterList";
import CharacterDetail from "./pages/Characters/CharacterDetail";
import PlanetList from "./pages/Planets/PlanetList";
import PlanetDetail from "./pages/Planets/PlanetDetail";
import StarshipList from "./pages/Starships/StarshipList";
import StarshipDetail from "./pages/Starships/StarshipDetail";

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
