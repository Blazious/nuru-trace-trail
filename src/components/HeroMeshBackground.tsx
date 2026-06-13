import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isGold: boolean;
  alpha: number;
  glowRadius: number;
}

export function HeroMeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track pointer state in a ref to keep it out of the React render cycle
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
    currentAlpha: 0,
    targetAlpha: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Config variables that scale responsively
    let particleCount = 70;
    let maxDistance = 120;
    let speedMultiplier = 1.0;
    let maxLinksPerNode = Infinity;
    let attractionRadius = 150;
    let sizeScale = 1.0;
    let isMobileDevice = false;

    // Set interactive variables based on viewport width
    const updateResponsiveSettings = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      isMobileDevice = w < 640;
      if (w < 640) {
        // Mobile
        particleCount = 20;
        maxDistance = 80;
        speedMultiplier = 0.5;
        maxLinksPerNode = 3;
        attractionRadius = 90;
        sizeScale = 0.7;
      } else if (w < 1024) {
        // Tablet
        particleCount = 42;
        maxDistance = 100;
        speedMultiplier = 0.75;
        maxLinksPerNode = 5;
        attractionRadius = 120;
        sizeScale = 0.85;
      } else {
        // Desktop
        particleCount = 75;
        maxDistance = 120;
        speedMultiplier = 1.0;
        maxLinksPerNode = Infinity;
        attractionRadius = 150;
        sizeScale = 1.0;
      }
    };

    updateResponsiveSettings();

    // Check accessibility reduced-motion preference safely
    const reducedMotionQuery = 
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    
    let prefersReducedMotion = reducedMotionQuery ? reducedMotionQuery.matches : false;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      initParticles();
      drawStaticOrStartLoop();
    };

    if (reducedMotionQuery) {
      if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
      } else if (reducedMotionQuery.addListener) {
        // Fallback for older Safari/iOS versions
        reducedMotionQuery.addListener(handleReducedMotionChange);
      }
    }

    // Initialise particles
    const initParticles = () => {
      particles = [];
      if (width === 0 || height === 0) return;
      for (let i = 0; i < particleCount; i++) {
        const isGold = Math.random() < 0.25; // 25% brand gold
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35 * speedMultiplier,
          vy: (Math.random() - 0.5) * 0.35 * speedMultiplier,
          size: (Math.random() * 1.5 + 1.25) * sizeScale,
          isGold,
          alpha: isGold ? 0.75 : 0.35,
          glowRadius: isGold ? (Math.random() * 6 + 6) * sizeScale : 0,
        });
      }
    };

    // Resize/Orientation handler
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      updateResponsiveSettings();

      // Cap resolution scale (devicePixelRatio) on mobile to 1.5x to preserve GPU performance
      const rawDPR = (typeof window !== "undefined" && window.devicePixelRatio) || 1;
      const dpr = isMobileDevice ? Math.min(rawDPR, 1.5) : Math.min(rawDPR, 2.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Reset transform before scaling to avoid cumulative transforms on multiple resize triggers
      if (ctx.setTransform) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else {
        ctx.scale(dpr, dpr);
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles();
      drawStaticOrStartLoop();
    };

    // Setup dimensions and particles
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    handleResize();

    function drawStaticOrStartLoop() {
      if (prefersReducedMotion) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
        draw();
      } else {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(loop);
      }
    }

    // Pointer event handlers listening on window to catch hover anywhere on the Hero section
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || !container) return;
      const rect = container.getBoundingClientRect();
      
      const buffer = 150;
      const inBounds = (
        e.clientY >= rect.top - buffer &&
        e.clientY <= rect.bottom + buffer &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      );

      if (inBounds) {
        pointerRef.current.x = e.clientX - rect.left;
        pointerRef.current.y = e.clientY - rect.top;
        pointerRef.current.targetAlpha = 1;
        pointerRef.current.active = true;
      } else {
        pointerRef.current.targetAlpha = 0;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (prefersReducedMotion || !container) return;
      const rect = container.getBoundingClientRect();
      
      const inBounds = (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      );

      if (inBounds) {
        pointerRef.current.x = e.clientX - rect.left;
        pointerRef.current.y = e.clientY - rect.top;
        pointerRef.current.targetAlpha = 1;
        pointerRef.current.active = true;
      }
    };

    const handlePointerUpOrCancel = () => {
      pointerRef.current.targetAlpha = 0;
    };

    // Use passive: true to ensure scrolling is never blocked by handlers
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });
      window.addEventListener("pointerup", handlePointerUpOrCancel, { passive: true });
      window.addEventListener("pointercancel", handlePointerUpOrCancel, { passive: true });
      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);
    }

    // Frame rate control config
    let lastFrameTime = 0;
    const targetMobileFPS = 30;
    const mobileFrameInterval = 1000 / targetMobileFPS;

    function draw() {
      if (!ctx || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const p = pointerRef.current;
      
      // Smooth interpolation for pointer spotlight alpha transitions
      p.currentAlpha += (p.targetAlpha - p.currentAlpha) * 0.08;
      if (p.currentAlpha < 0.005) {
        p.currentAlpha = 0;
        p.active = false;
      } else {
        p.active = true;
      }

      // 1. Draw pointer spotlight radial glow
      if (p.active && p.currentAlpha > 0) {
        const spotlightRadius = attractionRadius * 2.0;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, spotlightRadius);
        // Brand gold color theme: #F5A623 (rgba(245, 166, 35))
        gradient.addColorStop(0, `rgba(245, 166, 35, ${0.12 * p.currentAlpha})`);
        gradient.addColorStop(0.4, `rgba(245, 166, 35, ${0.03 * p.currentAlpha})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw connections/links between nodes
      const linkCounts = new Array(particles.length).fill(0);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          if (linkCounts[i] >= maxLinksPerNode || linkCounts[j] >= maxLinksPerNode) continue;

          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            linkCounts[i]++;
            linkCounts[j]++;

            const opacity = (1 - dist / maxDistance) * 0.22;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.isGold || p2.isGold) {
              ctx.strokeStyle = `rgba(245, 166, 35, ${opacity * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // 3. Draw links from nodes to cursor/pointer spotlight
        if (p.active && p.currentAlpha > 0) {
          const dx = p1.x - p.x;
          const dy = p1.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < attractionRadius) {
            const opacity = (1 - dist / attractionRadius) * 0.32 * p.currentAlpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(245, 166, 35, ${opacity})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);

        if (p1.isGold) {
          ctx.shadowBlur = p1.glowRadius;
          ctx.shadowColor = "rgba(245, 166, 35, 0.55)";
          ctx.fillStyle = `rgba(245, 166, 35, ${p1.alpha})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255, 255, 255, ${p1.alpha})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset context shadow state
      }
    }

    function update() {
      if (width === 0 || height === 0) return;
      const p = pointerRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off canvas boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Clamp positions to avoid escape
        p1.x = Math.max(0, Math.min(width, p1.x));
        p1.y = Math.max(0, Math.min(height, p1.y));

        // Soft gravity pull toward cursor/spotlight
        if (p.active && p.currentAlpha > 0) {
          const dx = p.x - p1.x;
          const dy = p.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < attractionRadius) {
            const force = ((attractionRadius - dist) / attractionRadius) * 0.06 * p.currentAlpha;
            p1.x += (dx / dist) * force;
            p1.y += (dy / dist) * force;
          }
        }
      }
    }

    function loop(timestamp: number) {
      if (prefersReducedMotion) return;

      const elapsed = timestamp - lastFrameTime;

      if (isMobileDevice) {
        // Throttle frame rate to ~30 FPS on mobile devices
        if (elapsed >= mobileFrameInterval) {
          lastFrameTime = timestamp - (elapsed % mobileFrameInterval);
          update();
          draw();
        }
      } else {
        lastFrameTime = timestamp;
        update();
        draw();
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    // Battery/CPU optimisation observers safely
    let isPageVisible = true;
    let isIntersecting = true;

    const handleVisibilityChange = () => {
      if (typeof document !== "undefined") {
        isPageVisible = !document.hidden;
      }
      manageAnimationState();
    };

    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isIntersecting = entry.isIntersecting;
          }
          manageAnimationState();
        },
        { threshold: 0.01 } // Trigger state transition when at least 1% of section is visible
      );
      observer.observe(container);
    }

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    function manageAnimationState() {
      if (prefersReducedMotion) return;

      if (isPageVisible && isIntersecting) {
        if (!animationFrameId) {
          lastFrameTime = performance.now();
          animationFrameId = requestAnimationFrame(loop);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      }
    }

    // Cleanup all event bindings
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      if (reducedMotionQuery) {
        if (reducedMotionQuery.removeEventListener) {
          reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
        } else if (reducedMotionQuery.removeListener) {
          reducedMotionQuery.removeListener(handleReducedMotionChange);
        }
      }

      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUpOrCancel);
        window.removeEventListener("pointercancel", handlePointerUpOrCancel);
      }

      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }

      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 block h-full w-full opacity-60"
      />
      {/* Overlay gradient blending the background nicely with content layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-900)]/75 via-[var(--navy-900)]/88 to-[var(--navy-900)] pointer-events-none" />
    </div>
  );
}
