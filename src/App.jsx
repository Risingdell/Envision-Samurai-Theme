import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Loader from "./Components/Loader";
import Entrance from "./Pages/Entrance";

import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Team from "./Pages/Team";
import Sponsors from "./Pages/Sponsors";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const [phase, setPhase] = useState("loader");
  // "loader" → "entrance" → "app"

  return (
    <AuthProvider>
      <CartProvider>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
