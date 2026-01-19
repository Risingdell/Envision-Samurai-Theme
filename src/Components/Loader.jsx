import { useEffect, useRef } from "react";
import gsap from "gsap";

import katana from "../assets/katana.png";
import logo from "../assets/env-logo.png";
import metalClash from "../assets/metal-clash.mp3";

import "../Styles/loader.css";

export default function Loader({ onFinish }) {
  const loaderRef = useRef(null);
  const leftSword = useRef(null);
  const rightSword = useRef(null);
  const glowRef = useRef(null);

  const clashRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    clashRef.current = new Audio(metalClash);
    clashRef.current.volume = 0.85;
    clashRef.current.load();
  }, []);

  const startLoader = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => onFinish()
    });

    tl
      .fromTo(
        leftSword.current,
        { x: "-120vw", y: "-120vh", rotate: -45, opacity: 0 },
        { x: "-10%", y: "-10%", rotate: -35, opacity: 1, duration: 1.2 }
      )
      .fromTo(
        rightSword.current,
        { x: "120vw", y: "-120vh", rotate: 45, opacity: 0 },
        { x: "10%", y: "-10%", rotate: 35, opacity: 1, duration: 1.2 },
        "<"
      )
      .to(glowRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.15,
        onStart: () => {
          clashRef.current.currentTime = 0;
          clashRef.current.play();
        }
      })
      .to(glowRef.current, {
        scale: 2,
        opacity: 0,
        duration: 0.4
      })
      .to({}, { duration: 0.6 })
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.6
      });
  };

  return (
    <div className="loader" ref={loaderRef} onClick={startLoader}>
      <img ref={leftSword} src={katana} className="katana left" alt="" />
      <img ref={rightSword} src={katana} className="katana right" alt="" />
      <div ref={glowRef} className="cross-glow" />
      <img src={logo} className="loader-logo" alt="logo" />

      <p style={{ color: "#aaa", position: "absolute", bottom: "40px" }}>
        Click to Enter
      </p>
    </div>
  );
}
