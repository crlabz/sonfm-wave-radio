import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import AudioVisualizer from './AudioVisualizer';

const StickyPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      {/* Audio Visualizer Background */}
      <div className="absolute inset-0 opacity-20">
        <AudioVisualizer />
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Now Playing Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 glow-primary">
              <span className="text-2xl font-bold">W3</span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold truncate">The Midnight Drive</h4>
              <p className="text-sm text-muted-foreground truncate">DJ Luna • En vivo</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12 rounded-full bg-gradient-primary hover:scale-110 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-3 w-32">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
              className="shrink-0"
            >
              {isMuted || volume[0] === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium">EN VIVO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyPlayer;
