import "../styles/entrance.css";
import samurai from "../assets/samurai.png";
import Katana from "../assets/katana.png";
import fog from "../assets/fog.png";
import cherryBlossom from "../assets/cherry-blossom.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Entrance() {
  const navigate = useNavigate(); // ✅ INSIDE component

  useEffect(() => {
  const timer = setTimeout(() => {
    document.getElementById("entrance")?.classList.add("exit");
    setTimeout(() => navigate("/home"), 700);
  }, 5000);

  return () => clearTimeout(timer);
}, [navigate]);


  return (
    <div id="entrance">

      <img src={fog} alt="fog" className="fog" />

      <div className="samurai-light"></div>
      <div className="bg-text">FIGHT LIKE YOU'RE DEAD</div>
      <div className="samurai-bg" aria-hidden="true"></div>
      <div className="samurai-glow" aria-hidden="true"></div>

      <img src={samurai} className="samurai" alt="samurai" />

      <div className="texture"></div>
      <div className="eye-glow"></div>

      {/* Cherry Blossom Particles */}
      <img src={cherryBlossom} className="blossom-particle blossom-1" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-2" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-3" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-4" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-5" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-6" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-7" alt="" />
      <img src={cherryBlossom} className="blossom-particle blossom-8" alt="" />

    </div>
  );
}
