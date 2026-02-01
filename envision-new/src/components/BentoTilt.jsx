import { useState, useRef } from "react";
import type { ReactNode, MouseEvent } from "react";

interface BentoTiltProps {
    children: ReactNode;
    className?: string;
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className="relative transition-all duration-300"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={className}
                style={{ transform: transformStyle }}
            >
                {children}
            </div>
        </div>
    );
};
