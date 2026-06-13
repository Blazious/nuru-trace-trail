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

type MeshVariant = "hero" | "footer" | "chat";

interface HeroMeshBackgroundProps {
  variant?: MeshVariant;
  interactive?: boolean;
  className?: string;
}

const variantStyles: Record<
  MeshVariant,
  {
    className: string;
    canvasClassName: string;
    overlayClassName: string;
    particleScale: number;
    opacityScale: number;
    neutralColor: string;
    neutralLinkColor: string;
  }
> = {
  hero: {
    className: "absolute inset-0 overflow-hidden pointer-events-none",
    canvasClassName: "pointer-events-auto absolute inset-0 block h-full w-full opacity-85",
    overlayClassName:
      "absolute inset-0 bg-gradient-to-b from-[var(--navy-900)]/62 via-[var(--navy-900)]/76 to-[var(--navy-900)]/96 pointer-events-none",
    particleScale: 1,
    opacityScale: 1,
    neutralColor: "255, 255, 255",
    neutralLinkColor: "255, 255, 255",
  },
  footer: {
    className: "absolute inset-0 overflow-hidden pointer-events-none",
    canvasClassName: "absolute inset-0 block h-full w-full opacity-70",
    overlayClassName:
      "absolute inset-0 bg-gradient-to-br from-[var(--navy-900)]/78 via-[var(--navy-900)]/86 to-[var(--navy-900)]/98 pointer-events-none",
    particleScale: 0.8,
    opacityScale: 0.85,
    neutralColor: "255, 255, 255",
    neutralLinkColor: "255, 255, 255",
  },
  chat: {
    className: "absolute inset-0 overflow-hidden pointer-events-none",
    canvasClassName: "absolute inset-0 block h-full w-full opacity-45",
    overlayClassName:
      "absolute inset-0 bg-gradient-to-b from-[var(--cream-50)]/70 via-[var(--cream-50)]/78 to-[var(--cream-50)]/88 pointer-events-none",
    particleScale: 0.55,
    opacityScale: 0.45,
    neutralColor: "10, 22, 40",
    neutralLinkColor: "10, 22, 40",
  },
};

export function HeroMeshBackground({
  variant = "hero",
  interactive = true,
  className = "",
}: HeroMeshBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const styles = variantStyles[variant];
  
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

    // Declare all variables at the very top of useEffect to prevent Temporal Dead Zone (TDZ) ReferenceErrors
    let animationFrameId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let lastFrameTime = 0;

    const targetMobileFPS = 30;
    const mobileFrameInterval = 1000 / targetMobileFPS;

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
          size: (Math.random() * 1.7 + 1.4) * sizeScale * styles.particleScale,
          isGold,
          alpha: (isGold ? 0.9 : 0.5) * styles.opacityScale,
          glowRadius: isGold ? (Math.random() * 8 + 8) * sizeScale * styles.particleScale : 0,
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
      if (!interactive || prefersReducedMotion || !container) return;
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
      if (!interactive || prefersReducedMotion || !container) return;
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

            const opacity = (1 - dist / maxDistance) * 0.34;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.isGold || p2.isGold) {
              ctx.strokeStyle = `rgba(245, 166, 35, ${opacity * 1.7})`;
            } else {
              ctx.strokeStyle = `rgba(${styles.neutralLinkColor}, ${opacity})`;
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
            const opacity = (1 - dist / attractionRadius) * 0.44 * p.currentAlpha;
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
          ctx.shadowColor = "rgba(245, 166, 35, 0.75)";
          ctx.fillStyle = `rgba(245, 166, 35, ${p1.alpha})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(${styles.neutralColor}, ${p1.alpha})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function update() {
      if (width === 0 || height === 0) return;
      const p = pointerRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        p1.x = Math.max(0, Math.min(width, p1.x));
        p1.y = Math.max(0, Math.min(height, p1.y));

        if (p.active && p.currentAlpha > 0) {
          const dx = p.x - p1.x;
          const dy = p.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 0 && dist < attractionRadius) {
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
        { threshold: 0.01 }
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
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    }

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
  }, [
    interactive,
    styles.neutralColor,
    styles.neutralLinkColor,
    styles.opacityScale,
    styles.particleScale,
  ]);

  return (
    <div ref={containerRef} className={`${styles.className} ${className}`}>
      <canvas ref={canvasRef} className={styles.canvasClassName} />
      <div className={styles.overlayClassName} />
    </div>
  );
}
