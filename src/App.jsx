import { Routes, Route } from "react-router-dom";
import Entrance from "./Pages/Entrance";
import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Team from "./Pages/Team";
import Sponsors from "./Pages/Sponsors";
import About from "./Pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Entrance />} />
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/team" element={<Team />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
