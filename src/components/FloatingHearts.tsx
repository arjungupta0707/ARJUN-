import React, { useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
  wiggleSpeed: number;
  wiggleRange: number;
  color: string;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const hearts: Heart[] = [];
    const colors = [
      "rgba(244, 63, 94, 0.6)",   // Rose 500
      "rgba(251, 113, 133, 0.5)", // Rose 400
      "rgba(236, 72, 153, 0.6)",  // Pink 500
      "rgba(244, 114, 182, 0.5)", // Pink 400
      "rgba(219, 39, 119, 0.4)",  // Pink 600
    ];

    // Create initial hearts
    const heartCount = Math.min(width < 768 ? 20 : 40, 50);
    for (let i = 0; i < heartCount; i++) {
      hearts.push(createHeart(true));
    }

    function createHeart(randomY = false): Heart {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 20,
        size: Math.random() * 12 + 6,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        angle: Math.random() * Math.PI * 2,
        wiggleSpeed: Math.random() * 0.02 + 0.005,
        wiggleRange: Math.random() * 20 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    function drawHeart(c: CanvasRenderingContext2D, h: Heart) {
      c.save();
      c.translate(h.x, h.y);
      c.globalAlpha = h.opacity;
      c.fillStyle = h.color;
      c.beginPath();

      // Custom path for drawing high-quality canvas vector hearts
      const s = h.size / 10;
      c.moveTo(0, -3 * s);
      c.bezierCurveTo(-5 * s, -10 * s, -15 * s, -5 * s, -15 * s, 5 * s);
      c.bezierCurveTo(-15 * s, 15 * s, -5 * s, 20 * s, 0, 28 * s);
      c.bezierCurveTo(5 * s, 20 * s, 15 * s, 15 * s, 15 * s, 5 * s);
      c.bezierCurveTo(15 * s, -5 * s, 5 * s, -10 * s, 0, -3 * s);

      c.closePath();
      c.fill();
      c.restore();
    }

    function update() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Add romantic warm ambient lights
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(255, 241, 242, 0.4)"); // rose-50
      gradient.addColorStop(1, "rgba(255, 228, 230, 0.1)"); // rose-100
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y -= h.speed;
        h.angle += h.wiggleSpeed;
        h.x += Math.sin(h.angle) * 0.5;

        // Fade out as it goes higher
        if (h.y < height * 0.2) {
          h.opacity -= 0.005;
        }

        if (h.y < -30 || h.opacity <= 0) {
          hearts[i] = createHeart(false);
        } else {
          drawHeart(ctx, h);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="floating-hearts-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
