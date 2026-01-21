import { useEffect, useRef } from "react";
import gsap from "gsap";

import katana from "../assets/katana.png";
import logo from "../assets/env-logo.png";
import metalClash from "../assets/metal-clash.mp3";

import "../Styles/loader.css";

export default function Loader({ onFinish }) {
  const loaderRef = useRef(null);
  const leftSwordWrap = useRef(null);
  const rightSwordWrap = useRef(null);
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
  // LEFT SWORD - from top-left corner, crossing through center
  .fromTo(
    leftSwordWrap.current,
    {
      x: "-90vw",
      y: "-90vh",
      rotate: 0,
      opacity: 0
    },
    {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.2
    }
  )

  // RIGHT SWORD - from top-right corner, crossing through center
  .fromTo(
    rightSwordWrap.current,
    {
      x: "90vw",
      y: "-90vh",
      rotate: 0,
      opacity: 0
    },
    {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.2
    },
    "<"
  )


    // CLASH
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

    // HOLD
    .to({}, { duration: 0.6 })

    // FADE OUT
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.6
    });
};


  return (
    <div className="loader" ref={loaderRef} onClick={startLoader}>
      {/* LEFT SWORD */}
      <div ref={leftSwordWrap} className="katana-wrapper left">
        <img src={katana} className="katana-img" alt="" />
      </div>

      {/* RIGHT SWORD */}
      <div ref={rightSwordWrap} className="katana-wrapper right">
        <img src={katana} className="katana-img" alt="" />
      </div>

      {/* GLOW */}
      <div ref={glowRef} className="cross-glow" />

      {/* LOGO */}
      <img src={logo} className="loader-logo" alt="logo" />

      <p className="enter-text">Click to Enter</p>
    </div>
  );
}
