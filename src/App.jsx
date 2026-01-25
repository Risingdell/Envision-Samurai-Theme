import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Loader from "./Components/Loader";
import Entrance from "./Pages/Entrance";

import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Team from "./Pages/Team";
import Sponsors from "./Pages/Sponsors";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";

function App() {
  const [phase, setPhase] = useState("loader");
  // "loader" → "entrance" → "app"

  return (
    <>
      {phase === "loader" && (
        <Loader onFinish={() => setPhase("entrance")} />
      )}

      {phase === "entrance" && (
        <Entrance onFinish={() => setPhase("app")} />
      )}

      {phase === "app" && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        </Routes>
      )}
    </>
  );
}

export default App;
