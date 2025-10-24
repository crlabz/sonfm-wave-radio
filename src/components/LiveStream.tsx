import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const LiveStream = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [listeners] = useState(1247);

  return (
    <section id="live" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transmisión en Vivo
            </h2>
            <p className="text-muted-foreground">
              Conecta al stream y disfruta de música 24/7
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border">
            {/* Album Art / Visualizer */}
            <div className="aspect-square max-w-md mx-auto mb-8 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center relative overflow-hidden">
              <Radio className="w-24 h-24 text-white/80" />
              <div className="absolute inset-0 bg-black/20" />
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-end justify-center gap-1 p-4">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/60 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">The Midnight Drive</h3>
              <p className="text-muted-foreground">DJ Luna • Electrónica & Synthwave</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" fill="currentColor" />}
              </Button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-4 max-w-sm mx-auto mb-6">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
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

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
                  </span>
                  <span className="text-sm font-medium">En Vivo</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{listeners.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Oyentes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStream;
