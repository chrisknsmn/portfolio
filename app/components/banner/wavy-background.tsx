"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.003;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    w = ctx.canvas.width =
      canvas.parentElement?.offsetWidth || window.innerWidth;
    h = ctx.canvas.height = 100;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      if (!ctx || !canvas) return;
      w = ctx.canvas.width =
        canvas.parentElement?.offsetWidth || window.innerWidth;
      h = ctx.canvas.height = 100;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  // const waveColors = colors ?? [
  //   "#38bdf8",
  //   "#818cf8",
  //   "#c084fc",
  //   "#e879f9",
  //   "#22d3ee",
  // ];
  const waveColors = colors ?? [
    "#10b981",
    "#34d399",
    "#22d3ee",
    "#86efac",
    "#bbf7d0",
  ];
  const drawWave = (n: number) => {
    if (!ctx) return;

    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 50;
        ctx.lineTo(x, y + 100); // center waves at 100px (middle of 300px)
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = waveOpacity || 0.5;
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [blur, waveOpacity, waveWidth, speed]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start relative",
        containerClassName
      )}
    >
      <canvas
        className="absolute top-0 left-0 w-full h-24 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
