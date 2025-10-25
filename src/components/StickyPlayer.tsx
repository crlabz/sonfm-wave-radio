import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';

const StickyPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Radio stream URL
  const streamUrl = 'https://stream-177.zeno.fm/is5vsx5ezpmvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJpczV2c3g1ZXpwbXZ2IiwiaG9zdCI6InN0cmVhbS0xNzcuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjhLWk1GMC1aUkdpYzU1d3ZIRWJqRGciLCJpYXQiOjE3NjEzNTgyMTMsImV4cCI6MTc2MTM1ODI3M30.FxBV2Z06XkO_K6k3nDf1YCRSBKmu3BYo06KCH1yf5H8';

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
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
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
      console.error('Audio error:', err);
    }
  };

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Handle mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-dark-border bg-dark-main/95 backdrop-blur-xl shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left side - Play button and status */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                onClick={togglePlay}
                disabled={isLoading}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-red-power text-white shadow-lg disabled:opacity-50 transition-all duration-300 hover-scale"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      key="loading"
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    />
                  ) : isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Pause className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-dark-red rounded-full"
                  animate={{ 
                    scale: isPlaying ? [1, 1.2, 1] : 1,
                    opacity: isPlaying ? [0.8, 1, 0.8] : 0.6
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isPlaying ? Infinity : 0 
                  }}
                />
                <span className="text-xs sm:text-sm font-medium text-dark-text-primary">
                  {isPlaying ? 'ON AIR' : 'Radio Web3'}
                </span>
              </motion.div>
              
              {/* Live listeners count */}
              <motion.div 
                className="hidden sm:flex items-center gap-1 text-xs text-dark-text-secondary"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Users className="w-3 h-3" />
                <span>1,247</span>
              </motion.div>
            </div>
          </div>

          {/* Center - Now Playing Info (hidden on mobile) */}
          <motion.div 
            className="hidden md:flex items-center gap-3 flex-1 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="w-8 h-8 rounded-lg bg-gradient-red-power flex items-center justify-center shadow-red-glow"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Radio className="w-4 h-4 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-text-primary truncate">
                The Midnight Drive
              </p>
              <p className="text-xs text-dark-text-secondary truncate">
                DJ Luna • Electrónica & Synthwave
              </p>
            </div>
          </motion.div>

          {/* Right side - Volume control */}
          <motion.div 
            className="hidden sm:flex items-center gap-3 w-24 sm:w-32"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8 p-0 bg-dark-elevated border border-dark-border hover:border-dark-red hover:shadow-red-glow"
              >
                {isMuted || volume[0] === 0 ? (
                  <VolumeX className="w-4 h-4 text-dark-text-primary" />
                ) : (
                  <Volume2 className="w-4 h-4 text-dark-text-primary" />
                )}
              </Button>
            </motion.div>
            <div className="flex-1">
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1 [&_.slider-track]:bg-dark-border [&_.slider-range]:bg-gradient-red-power [&_.slider-thumb]:bg-dark-red [&_.slider-thumb]:border-dark-red"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyPlayer;