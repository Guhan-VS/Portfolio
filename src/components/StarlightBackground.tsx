import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  colorType: 'white' | 'champagne' | 'ice' | 'violet';
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number; // For parallax (0.3 to 1.0)
  hasGlint: boolean;
  glintSize: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  dx: number;
  dy: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  width: number;
  color: string;
  tailColor: string;
}

interface ConstellationPoint {
  xPct: number;
  yPct: number;
}

interface Constellation {
  name: string;
  points: ConstellationPoint[];
  edges: [number, number][]; // Index pairs
}

// Famous constellations mapped by percentage of screen width & height
const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Ursa Major (Big Dipper)',
    points: [
      { xPct: 0.12, yPct: 0.18 }, // Alkaid
      { xPct: 0.16, yPct: 0.22 }, // Mizar
      { xPct: 0.20, yPct: 0.25 }, // Alioth
      { xPct: 0.24, yPct: 0.29 }, // Megrez
      { xPct: 0.23, yPct: 0.36 }, // Phecda
      { xPct: 0.29, yPct: 0.38 }, // Merak
      { xPct: 0.30, yPct: 0.30 }, // Dubhe
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 3],
    ],
  },
  {
    name: 'Cassiopeia',
    points: [
      { xPct: 0.74, yPct: 0.14 }, // Caph
      { xPct: 0.79, yPct: 0.19 }, // Schedar
      { xPct: 0.83, yPct: 0.15 }, // Gamma Cas
      { xPct: 0.87, yPct: 0.21 }, // Ruchbah
      { xPct: 0.91, yPct: 0.17 }, // Segin
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: 'Orion',
    points: [
      { xPct: 0.68, yPct: 0.62 }, // Betelgeuse
      { xPct: 0.77, yPct: 0.64 }, // Bellatrix
      { xPct: 0.71, yPct: 0.72 }, // Alnitak
      { xPct: 0.73, yPct: 0.73 }, // Alnilam
      { xPct: 0.75, yPct: 0.74 }, // Mintaka
      { xPct: 0.69, yPct: 0.84 }, // Saiph
      { xPct: 0.78, yPct: 0.82 }, // Rigel
    ],
    edges: [
      [0, 2],
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
      [0, 1],
      [5, 6],
    ],
  },
];

type AtmosphereMode = 'diamond' | 'champagne' | 'nebula';

const StarlightBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('diamond');
  const [showConstellations, setShowConstellations] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Animation & state refs
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const lastShootingStarTimeRef = useRef<number>(Date.now());
  const nextIntervalRef = useRef<number>(5000); // Random interval 4-8s

  // Atmosphere palette colors
  const colorMap = {
    diamond: {
      white: 'rgba(255, 255, 255, ',
      champagne: 'rgba(255, 245, 225, ',
      ice: 'rgba(215, 240, 255, ',
      violet: 'rgba(235, 225, 255, ',
      glow: 'rgba(200, 230, 255, 0.15)',
      meteorHead: '#ffffff',
      meteorTail: 'rgba(220, 240, 255, ',
    },
    champagne: {
      white: 'rgba(255, 250, 240, ',
      champagne: 'rgba(255, 228, 180, ',
      ice: 'rgba(255, 238, 204, ',
      violet: 'rgba(245, 215, 175, ',
      glow: 'rgba(255, 220, 150, 0.15)',
      meteorHead: '#fff8ea',
      meteorTail: 'rgba(255, 225, 170, ',
    },
    nebula: {
      white: 'rgba(255, 255, 255, ',
      champagne: 'rgba(240, 220, 255, ',
      ice: 'rgba(180, 225, 255, ',
      violet: 'rgba(215, 175, 255, ',
      glow: 'rgba(168, 85, 247, 0.18)',
      meteorHead: '#f3e8ff',
      meteorTail: 'rgba(192, 132, 252, ',
    },
  }[atmosphere];

  // Trigger a shooting star with realistic Rolls-Royce streak
  const triggerShootingStar = useCallback((startX?: number, startY?: number, customAngle?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    // Angle: standard Rolls-Royce angle is 25° - 38° downwards from left to right
    const angle = customAngle !== undefined ? customAngle : (Math.PI / 180) * (26 + Math.random() * 14);
    const speed = 12 + Math.random() * 10;
    const length = 140 + Math.random() * 160;

    // Spawn from upper or left area if not specified
    const x = startX !== undefined ? startX : Math.random() * (w * 0.75);
    const y = startY !== undefined ? startY : Math.random() * (h * 0.45);

    const maxLife = 50 + Math.floor(Math.random() * 30);

    shootingStarsRef.current.push({
      x,
      y,
      length,
      speed,
      angle,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      opacity: 0,
      maxOpacity: 0.85 + Math.random() * 0.15,
      life: 0,
      maxLife,
      width: 1.6 + Math.random() * 1.2,
      color: colorMap.meteorHead,
      tailColor: colorMap.meteorTail,
    });
  }, [colorMap]);

  // Handle window clicks to create interactive shooting stars
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't trigger if clicking interactive buttons or links
      const target = e.target as HTMLElement | null;
      if (target?.closest('button') || target?.closest('a') || target?.closest('.crypto-tool-container')) {
        return;
      }
      setHasInteracted(true);
      // Spawn shooting star aimed across from near click point
      const angle = (Math.PI / 180) * (22 + Math.random() * 20);
      triggerShootingStar(Math.max(20, e.clientX - 100), Math.max(20, e.clientY - 40), angle);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [triggerShootingStar]);

  // Initialize and run the Canvas Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Calculate star count (Rolls-Royce headliners feature ~800 to 1,600 fibers)
    const starCount = Math.min(850, Math.max(380, Math.floor((width * height) / 2800)));

    // Generate fiber optic stars
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      // Fiber diameter distribution: 80% micro-fine, 15% medium, 5% focal brilliance
      const rand = Math.random();
      let size = 0.65;
      let hasGlint = false;
      let glintSize = 0;

      if (rand > 0.95) {
        size = 1.8 + Math.random() * 0.9; // Large focal star
        hasGlint = true;
        glintSize = 3.5 + Math.random() * 4;
      } else if (rand > 0.8) {
        size = 1.1 + Math.random() * 0.5; // Medium star
        hasGlint = Math.random() > 0.7;
        glintSize = 2 + Math.random() * 2;
      } else {
        size = 0.55 + Math.random() * 0.45; // Micro-fine fiber star
      }

      // Color distribution
      const colorRand = Math.random();
      let colorType: Star['colorType'] = 'white';
      if (colorRand > 0.75) colorType = 'champagne';
      else if (colorRand > 0.5) colorType = 'ice';
      else if (colorRand > 0.35) colorType = 'violet';

      newStars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size,
        colorType,
        baseAlpha: 0.25 + Math.random() * 0.65,
        alpha: 0.5,
        twinkleSpeed: 0.008 + Math.random() * 0.022,
        twinklePhase: Math.random() * Math.PI * 2,
        depth: 0.2 + Math.random() * 0.8,
        hasGlint,
        glintSize,
      });
    }
    starsRef.current = newStars;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Re-anchor star base coordinates proportionally
      starsRef.current.forEach((star) => {
        star.baseX = Math.random() * width;
        star.baseY = Math.random() * height;
        star.x = star.baseX;
        star.y = star.baseY;
      });
    };

    window.addEventListener('resize', handleResize);

    // Track mouse with smooth parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 35;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 35;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const render = () => {

      // Smooth parallax interpolation
      currentParallaxX += (mouseRef.current.targetX - currentParallaxX) * 0.04;
      currentParallaxY += (mouseRef.current.targetY - currentParallaxY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle Rolls-Royce deep cabin atmosphere vignette
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, 'rgba(12, 14, 26, 0.35)');
      bgGrad.addColorStop(0.5, 'rgba(8, 9, 16, 0.65)');
      bgGrad.addColorStop(1, 'rgba(4, 4, 7, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Constellations (if enabled)
      if (showConstellations) {
        ctx.save();
        CONSTELLATIONS.forEach((constellation) => {
          const points = constellation.points.map((p) => ({
            x: p.xPct * width + currentParallaxX * 0.4,
            y: p.yPct * height + currentParallaxY * 0.4,
          }));

          // Constellation lines
          ctx.strokeStyle = atmosphere === 'nebula'
            ? 'rgba(192, 132, 252, 0.12)'
            : 'rgba(215, 235, 255, 0.12)';
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 4]);

          constellation.edges.forEach(([i, j]) => {
            const p1 = points[i];
            const p2 = points[j];
            if (p1 && p2) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
          ctx.setLineDash([]);

          // Constellation nodes (fiber-optic joint nodes)
          points.forEach((pt) => {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fill();

            // Soft node aura
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = atmosphere === 'nebula' ? 'rgba(192, 132, 252, 0.25)' : 'rgba(215, 240, 255, 0.22)';
            ctx.fill();
          });
        });
        ctx.restore();
      }

      // 3. Render Stars
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isHovering = mouseRef.current.isHovering;

      starsRef.current.forEach((star) => {
        // Calculate twinkle with smooth sine wave
        star.twinklePhase += star.twinkleSpeed;
        const sineVal = Math.sin(star.twinklePhase);
        let alpha = star.baseAlpha + sineVal * 0.35;
        alpha = Math.max(0.08, Math.min(1.0, alpha));

        // Parallax offset applied according to fiber optic depth
        const x = star.baseX + currentParallaxX * star.depth;
        const y = star.baseY + currentParallaxY * star.depth;

        // Proximity glow near cursor
        if (isHovering) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18000) {
            // within ~134px
            const boost = (1 - Math.sqrt(distSq) / 134) * 0.45;
            alpha = Math.min(1.0, alpha + boost);
          }
        }

        const colorPrefix = colorMap[star.colorType];

        // Draw outer fiber optic glow
        if (star.size > 1.2 || alpha > 0.7) {
          const glowRadius = star.size * 3.2;
          const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
          glowGrad.addColorStop(0, `${colorPrefix}${alpha * 0.45})`);
          glowGrad.addColorStop(1, `${colorPrefix}0)`);
          ctx.beginPath();
          ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // Draw fiber star core
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix}${alpha})`;
        ctx.fill();

        // Draw 4-point optical diffraction glint for luxury focal stars
        if (star.hasGlint && alpha > 0.5) {
          const glintLen = star.glintSize * (0.6 + sineVal * 0.4);
          const glintAlpha = alpha * 0.65;

          ctx.save();
          ctx.strokeStyle = `${colorPrefix}${glintAlpha})`;
          ctx.lineWidth = 0.65;

          // Horizontal spike
          ctx.beginPath();
          ctx.moveTo(x - glintLen, y);
          ctx.lineTo(x + glintLen, y);
          ctx.stroke();

          // Vertical spike
          ctx.beginPath();
          ctx.moveTo(x, y - glintLen);
          ctx.lineTo(x, y + glintLen);
          ctx.stroke();

          ctx.restore();
        }
      });

      // 4. Update and render Shooting Stars (Rolls-Royce Starlight Meteor System)
      const now = Date.now();
      if (now - lastShootingStarTimeRef.current > nextIntervalRef.current) {
        triggerShootingStar();
        lastShootingStarTimeRef.current = now;
        nextIntervalRef.current = 4500 + Math.random() * 4500; // Next in 4.5 - 9 seconds
      }

      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const meteor = shootingStarsRef.current[i];
        meteor.life++;
        meteor.x += meteor.dx;
        meteor.y += meteor.dy;

        // Fade in rapidly, then fade out gracefully
        const progress = meteor.life / meteor.maxLife;
        if (progress < 0.15) {
          meteor.opacity = (progress / 0.15) * meteor.maxOpacity;
        } else {
          meteor.opacity = (1 - (progress - 0.15) / 0.85) * meteor.maxOpacity;
        }

        // Draw shooting star tail
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const tailGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        tailGrad.addColorStop(0, `${meteor.tailColor}${meteor.opacity})`);
        tailGrad.addColorStop(0.3, `${meteor.tailColor}${meteor.opacity * 0.6})`);
        tailGrad.addColorStop(1, `${meteor.tailColor}0)`);

        ctx.save();
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = meteor.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Glowing radiant head of shooting star
        const headGlow = ctx.createRadialGradient(
          meteor.x,
          meteor.y,
          0,
          meteor.x,
          meteor.y,
          meteor.width * 4
        );
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        headGlow.addColorStop(0.5, `${meteor.tailColor}${meteor.opacity * 0.7})`);
        headGlow.addColorStop(1, `${meteor.tailColor}0)`);

        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.width * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();

        ctx.restore();

        // Remove expired meteor
        if (meteor.life >= meteor.maxLife || meteor.x > width + 200 || meteor.y > height + 200) {
          shootingStarsRef.current.splice(i, 1);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    // Pause animation when tab is not visible to save CPU/battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      } else {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [atmosphere, showConstellations, colorMap, triggerShootingStar]);

  return (
    <>
      {/* Rolls-Royce Starlight Canvas */}
      <canvas
        ref={canvasRef}
        className="starlight-canvas"
        aria-hidden="true"
      />

      {/* Luxury Perforated Leather Subtle Vignette & Grain */}
      <div className="starlight-overlay" aria-hidden="true" />

      {/* Bespoke Rolls-Royce Starlight Headliner Control HUD */}
      <div className={`starlight-hud ${isControlsOpen ? 'open' : ''}`}>
        {!isControlsOpen ? (
          <button
            className="starlight-hud-badge"
            onClick={() => setIsControlsOpen(true)}
            title="Rolls-Royce Bespoke Starlight System"
            aria-label="Toggle Starlight Controls"
          >
            <span className="starlight-hud-icon">✦</span>
            <span className="starlight-hud-title">Starlight Headliner</span>
            <span className="starlight-hud-dot" />
          </button>
        ) : (
          <div className="starlight-hud-panel glass-card">
            <div className="starlight-hud-header">
              <div className="starlight-hud-branding">
                <span className="starlight-rr-mark">RR</span>
                <div>
                  <h4>Starlight Headliner</h4>
                  <p>Bespoke Fiber Optic Ceiling</p>
                </div>
              </div>
              <button
                className="starlight-hud-close"
                onClick={() => setIsControlsOpen(false)}
                aria-label="Close Starlight HUD"
              >
                ✕
              </button>
            </div>

            {/* Atmosphere selector */}
            <div className="starlight-hud-section">
              <label>Celestial Atmosphere</label>
              <div className="starlight-theme-buttons">
                <button
                  className={`theme-btn ${atmosphere === 'diamond' ? 'active' : ''}`}
                  onClick={() => setAtmosphere('diamond')}
                >
                  <span className="color-swatch diamond" />
                  Diamond Pure
                </button>
                <button
                  className={`theme-btn ${atmosphere === 'champagne' ? 'active' : ''}`}
                  onClick={() => setAtmosphere('champagne')}
                >
                  <span className="color-swatch champagne" />
                  Champagne
                </button>
                <button
                  className={`theme-btn ${atmosphere === 'nebula' ? 'active' : ''}`}
                  onClick={() => setAtmosphere('nebula')}
                >
                  <span className="color-swatch nebula" />
                  Amethyst
                </button>
              </div>
            </div>

            {/* Interactive controls */}
            <div className="starlight-hud-actions">
              <button
                className="btn btn-outline btn-hud-action"
                onClick={() => setShowConstellations(!showConstellations)}
              >
                {showConstellations ? 'Hide Constellations' : 'Show Constellations'}
              </button>

              <button
                className="btn btn-primary btn-hud-action"
                onClick={() => triggerShootingStar()}
              >
                ☄️ Release Shooting Star
              </button>
            </div>

            <p className="starlight-hud-hint">
              {hasInteracted ? 'Click anywhere on empty sky to shoot a star!' : '✦ Tip: Click anywhere to streak a shooting star across the sky'}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default StarlightBackground;
