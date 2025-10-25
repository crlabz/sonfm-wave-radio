import { Play, Pause, Radio, Users, Clock, Zap, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Radio stream URL
  const streamUrl = 'https://stream-177.zeno.fm/is5vsx5ezpmvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJpczV2c3g1ZXpwbXZ2IiwiaG9zdCI6InN0cmVhbS0xNzcuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjhLWk1GMC1aUkdpYzU1d3ZIRWJqRGciLCJpYXQiOjE3NjEzNTgyMTMsImV4cCI6MTc2MTM1ODI3M30.FxBV2Z06XkO_K6k3nDf1YCRSBKmu3BYo06KCH1yf5H8';

  // Mouse tracking for subtle gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.preload = 'none';
    }

    const audio = audioRef.current;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setError('Error al cargar la transmisión');
      setIsLoading(false);
      setIsPlaying(false);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Handle play/pause
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = streamUrl;
        await audioRef.current.play();
      }
    } catch (err) {
      setError('Error al reproducir la transmisión');
      console.error('Audio error:', err);
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-main"
    >
      {/* Dark Power Background with Dynamic Red Glow */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 0, 0, 0.1) 0%, 
              rgba(204, 0, 0, 0.05) 30%, 
              transparent 60%
            )
          `,
        }}
      />

      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-dark-red rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* ON AIR Badge with Red Glow */}
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-dark-red/10 border border-dark-red/30 mb-8 shadow-red-glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative flex h-3 w-3">
                  <motion.div 
                    className="absolute inline-flex h-full w-full rounded-full bg-dark-red opacity-75"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative inline-flex rounded-full h-3 w-3 bg-dark-red animate-pulse" />
                </div>
                <span className="text-sm font-bold text-dark-red tracking-wider">ON AIR</span>
              </motion.div>

              {/* Main Title with Red Accent */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="text-dark-text-primary">Radio</span>
                <br />
                <span className="bg-gradient-red-power bg-clip-text text-transparent">
                  Web3
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-dark-text-secondary mb-8 font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                La plataforma de radio digital más avanzada. 
                <br className="hidden sm:block" />
                Música, podcasts y contenido en vivo 24/7.
              </motion.p>

              {/* Error Message */}
              {error && (
                <motion.div 
                  className="mb-6 p-4 rounded-xl bg-dark-red/10 border border-dark-red/30 text-dark-red text-sm text-center max-w-md mx-auto lg:mx-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="group relative h-14 sm:h-16 px-6 sm:px-8 bg-gradient-red-power text-white border-0 rounded-xl font-bold text-base sm:text-lg transition-transform duration-200 disabled:opacity-50 w-full sm:w-auto"
                  >
                    <div className="flex items-center gap-3">
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" fill="currentColor" />
                      )}
                      <span>
                        {isLoading ? 'Conectando...' : isPlaying ? 'Pausar' : 'Escuchar Ahora'}
                      </span>
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 sm:h-16 px-6 sm:px-8 bg-dark-elevated border-dark-border text-dark-text-primary hover:text-dark-text-primary transition-transform duration-200 rounded-xl w-full sm:w-auto"
                  >
                    Ver Programación
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Live Stats & Info */}
            <motion.div 
              className="animate-slide-up"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="bg-dark-card backdrop-blur-sm border border-dark-border rounded-2xl p-8 shadow-lg">
                {/* Now Playing */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-gradient-red-power flex items-center justify-center shrink-0 shadow-red-glow"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Radio className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-dark-text-secondary mb-1 font-medium">SONANDO AHORA</p>
                    <h3 className="text-xl font-bold text-dark-text-primary mb-1">The Midnight Drive</h3>
                    <p className="text-sm text-dark-text-secondary">DJ Luna • Electrónica & Synthwave</p>
                  </div>
                </div>

                {/* Live Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-dark-red mr-2" />
                      <span className="text-2xl font-bold text-dark-text-primary">1,247</span>
                    </div>
                    <p className="text-xs text-dark-text-secondary">Oyentes en vivo</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-dark-red mr-2" />
                      <span className="text-2xl font-bold text-dark-text-primary">24/7</span>
                    </div>
                    <p className="text-xs text-dark-text-secondary">Transmisión</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-5 h-5 text-dark-red mr-2" />
                      <span className="text-2xl font-bold text-dark-text-primary">HD</span>
                    </div>
                    <p className="text-xs text-dark-text-secondary">Calidad</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-main to-transparent" />
    </section>
  );
};

export default Hero;