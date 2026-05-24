import { useRef, useEffect, useMemo } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const cachedParticlesRef = useRef(null);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 6,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 10,
      color: ['#00d4ff', '#a855f7'][i % 2],
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const cacheParticles = () => {
      if (cachedParticlesRef.current) return;

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 50;
      offscreenCanvas.height = 50;
      const offCtx = offscreenCanvas.getContext('2d');

      const cached = {};
      particles.forEach((particle) => {
        if (!cached[particle.color]) {
          offCtx.clearRect(0, 0, 50, 50);
          const gradient = offCtx.createRadialGradient(25, 25, 0, 25, 25, 25);
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');
          offCtx.fillStyle = gradient;
          offCtx.beginPath();
          offCtx.arc(25, 25, 25, 0, Math.PI * 2);
          offCtx.fill();
          cached[particle.color] = new Image();
          cached[particle.color].src = offscreenCanvas.toDataURL();
        }
      });
      cachedParticlesRef.current = cached;
    };

    cacheParticles();

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      const gradient1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.5,
        0,
        width * 0.2,
        height * 0.5,
        width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(0, 212, 255, 0.08)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.5,
        0,
        width * 0.8,
        height * 0.5,
        width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      if (cachedParticlesRef.current) {
        particles.forEach((particle) => {
          const progress = ((timestamp / 1000 + particle.delay) % particle.duration) / particle.duration;
          const offsetY = Math.sin(progress * Math.PI * 2) * 20;
          const offsetX = Math.cos(progress * Math.PI * 2) * 10;

          const x = (particle.x / 100) * width + offsetX;
          const y = (particle.y / 100) * height + offsetY;
          const size = particle.size;

          const cachedImage = cachedParticlesRef.current[particle.color];
          if (cachedImage) {
            ctx.globalAlpha = 0.3;
            ctx.drawImage(cachedImage, x - size, y - size, size * 2, size * 2);
            ctx.globalAlpha = 1;
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
    />
  );
};

export default ParticleBackground;