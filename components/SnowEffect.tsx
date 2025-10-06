"use client";

import { useEffect, useState } from "react";

type Snowflake = {
  id: number;
  left: string;
  width: string;
  height: string;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
};

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generatedSnowflakes: Snowflake[] = Array.from({ length: 100 }).map(
      (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        opacity: Math.random() * 0.6 + 0.2,
        animationDuration: `${Math.random() * 8 + 15}s`,
        animationDelay: `${Math.random() * 10}s`,
      })
    );

    setSnowflakes(generatedSnowflakes);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute rounded-full bg-white"
          style={{
            left: flake.left,
            width: flake.width,
            height: flake.height,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration} linear ${flake.animationDelay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
