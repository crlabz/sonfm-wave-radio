import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-pulse-glow animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent text-glow">
              Radio Web3
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              La radio del futuro. Música, talk shows y más en vivo 24/7.
            </p>
          </div>

          {/* Live Badge */}
          <div className="flex items-center justify-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            <div className="flex items-center gap-2 glass px-6 py-3 rounded-full glow-primary">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-sm font-medium">EN VIVO AHORA</span>
            </div>
          </div>

          {/* Play Button */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            <Button
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative h-24 w-24 rounded-full bg-gradient-primary hover:scale-110 transition-all duration-300 glow-primary group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              {isPlaying ? (
                <Pause className="w-10 h-10 relative z-10" />
              ) : (
                <Play className="w-10 h-10 relative z-10 ml-1" />
              )}
            </Button>
          </div>

          {/* Now Playing */}
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
            <p className="text-sm text-muted-foreground mb-2">SONANDO AHORA</p>
            <h3 className="text-2xl font-bold mb-1">The Midnight Drive</h3>
            <p className="text-muted-foreground">con DJ Luna • Electrónica & Synthwave</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
