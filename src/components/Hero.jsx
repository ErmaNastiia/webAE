import { useEffect, useRef } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import "./Hero.scss";

const BUBBLE_COUNT = 54;
const MOUSE_RADIUS = 140;

const BUBBLE_COLORS = [
  { fill: "255, 159, 184", rim: "255, 184, 212" }, // pink
  { fill: "255, 166, 114", rim: "255, 199, 154" }, // orange
  { fill: "255, 214, 232", rim: "255, 255, 255" }, // pale pink
  { fill: "235, 169, 137", rim: "255, 255, 255" }, // pale orange
];

function randomBubble(width, height) {
  const r = Math.random() * 22 + 8;
  return {
    x: Math.random() * width,
    y: Math.random() * height + height * 0.9,
    r,
    // bigger bubbles float slower, like real ones
    speed: (Math.random() * 0.4 + 0.15) * (30 / r),
    sway: Math.random() * 0.6 + 0.2,
    swaySeed: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.5 + 0.2,
    color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
    // current displacement caused by the mouse push, eases back to 0
    pushX: 0,
    pushY: 0,
    // pop animation state
    popping: false,
    popProgress: 0,
  };
}

function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    let width, height, bubbles;
    let time = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    }

    function createBubbles() {
      bubbles = Array.from({ length: BUBBLE_COUNT }, () =>
        randomBubble(width, height),
      );
    }

    function drawBubble(b, x, y, radiusOverride) {
      const r = radiusOverride ?? b.r;
      const gradient = ctx.createRadialGradient(
        x - r * 0.35,
        y - r * 0.35,
        r * 0.1,
        x,
        y,
        r,
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, 0.85)`);
      gradient.addColorStop(0.35, `rgba(${b.color.fill}, 0.45)`);
      gradient.addColorStop(1, `rgba(${b.color.fill}, 0.12)`);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${b.color.rim}, 0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // tiny highlight
      ctx.beginPath();
      ctx.arc(x - r * 0.35, y - r * 0.4, r * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    }

    function step() {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        // gentle upward float + side-to-side sway
        b.y -= b.speed;
        const swayX = Math.sin(time * b.swaySpeed + b.swaySeed) * b.sway;

        // respawn at the bottom once a bubble floats off the top
        if (b.y + b.r < 0) {
          b.y = height + b.r;
          b.x = Math.random() * width;
          b.pushX = 0;
          b.pushY = 0;
        }

        const baseX = b.x + swayX;
        const baseY = b.y;

        // check if the mouse is actually touching the bubble (not just nearby)
        const touchDist = Math.sqrt(
          (baseX - mouse.x) ** 2 + (baseY - mouse.y) ** 2,
        );
        if (!b.popping && touchDist < b.r) {
          b.popping = true;
          b.popProgress = 0;
        }

        if (b.popping) {
          b.popProgress += 0.02; // controls pop speed — higher = faster
          const scale = 1 + b.popProgress * 0.4;
          const fade = Math.max(1 - b.popProgress, 0);

          ctx.save();
          ctx.globalAlpha = fade;
          drawBubble(b, baseX, baseY, b.r * scale);
          ctx.restore();

          if (b.popProgress >= 1) {
            // respawn just like the existing "floated off the top" reset
            b.y = height + b.r;
            b.x = Math.random() * width;
            b.pushX = 0;
            b.pushY = 0;
            b.popping = false;
            b.popProgress = 0;
          }
          return; // skip the normal push/draw below for this bubble
        }

        // push away from the mouse when it gets close
        const dx = baseX + b.pushX - mouse.x;
        const dy = baseY + b.pushY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const reach = MOUSE_RADIUS + b.r;

        if (dist < reach) {
          const force = (reach - dist) / reach;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          b.pushX += nx * force * 6;
          b.pushY += ny * force * 6;
        }

        // ease the push back to zero so bubbles drift back to their path
        b.pushX *= 0.92;
        b.pushY *= 0.92;

        drawBubble(b, baseX + b.pushX, baseY + b.pushY);
      });

      animationId = requestAnimationFrame(step);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    let animationId;
    resize();
    createBubbles();
    step();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      createBubbles();
    });
    resizeObserver.observe(container);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__content">
        <span className="section-label hero__eyebrow">Available for hire</span>
        <h1>
          Anastasia Ermakova
          <br />
          Web <span>Developer</span>
        </h1>
        <p>
          I design and build fast, accessible web applications. Currently
          looking for my full-time or freelance opportunity.
        </p>
        <div className="hero__btns">
          <a href="#projects" className="btn btn-primary">
            View Work <FiArrowRight />
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch <FiMail />
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint">Scroll ↓</div>
    </section>
  );
}

export default Hero;
