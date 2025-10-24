import { useEffect, useRef } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Animation variables
    const bars = 50;
    const barHeights = Array(bars).fill(0).map(() => Math.random());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bars;
      const centerY = canvas.height / 2;

      for (let i = 0; i < bars; i++) {
        // Simulate audio data
        barHeights[i] = Math.max(0.1, barHeights[i] + (Math.random() - 0.5) * 0.1);
        
        const barHeight = barHeights[i] * centerY * 0.8;
        const x = i * barWidth;

        // Create gradient
        const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)'); // primary
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.8)'); // secondary
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)'); // accent

        // Draw bar (top half)
        ctx.fillStyle = gradient;
        ctx.fillRect(x + barWidth * 0.2, centerY - barHeight, barWidth * 0.6, barHeight);

        // Draw bar (bottom half - mirror)
        ctx.fillRect(x + barWidth * 0.2, centerY, barWidth * 0.6, barHeight);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default AudioVisualizer;
