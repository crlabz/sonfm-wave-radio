import { useState, useEffect, useRef } from 'react';
import { Sliders, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface EqualizerBand {
  frequency: string;
  value: number;
  min: number;
  max: number;
}

const VisualEqualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [bands, setBands] = useState<EqualizerBand[]>([
    { frequency: '60Hz', value: 0, min: -12, max: 12 },
    { frequency: '170Hz', value: 0, min: -12, max: 12 },
    { frequency: '310Hz', value: 0, min: -12, max: 12 },
    { frequency: '600Hz', value: 0, min: -12, max: 12 },
    { frequency: '1kHz', value: 0, min: -12, max: 12 },
    { frequency: '3kHz', value: 0, min: -12, max: 12 },
    { frequency: '6kHz', value: 0, min: -12, max: 12 },
    { frequency: '12kHz', value: 0, min: -12, max: 12 },
    { frequency: '14kHz', value: 0, min: -12, max: 12 },
    { frequency: '16kHz', value: 0, min: -12, max: 12 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const updateBand = (index: number, value: number) => {
    setBands(prev => prev.map((band, i) => 
      i === index ? { ...band, value } : band
    ));
  };

  const resetEqualizer = () => {
    setBands(prev => prev.map(band => ({ ...band, value: 0 })));
  };

  const applyPreset = (preset: 'flat' | 'vocal' | 'bass' | 'treble') => {
    const presets = {
      flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      vocal: [0, 0, 0, 2, 4, 2, 0, -2, -2, -2],
      bass: [6, 4, 2, 0, -2, -4, -6, -8, -8, -8],
      treble: [-8, -6, -4, -2, 0, 2, 4, 6, 8, 8]
    };

    setBands(prev => prev.map((band, i) => ({ ...band, value: presets[preset][i] })));
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (!isPlaying) return;

    // Create animated bars based on equalizer settings
    const barWidth = width / bands.length;
    
    bands.forEach((band, index) => {
      const x = index * barWidth;
      const barHeight = Math.max(10, (Math.abs(band.value) + 1) * 20 + Math.random() * 30);
      const normalizedValue = (band.value + 12) / 24; // Normalize to 0-1
      
      // Create gradient based on frequency and value
      const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
      
      if (index < 3) {
        // Bass frequencies - red to orange
        gradient.addColorStop(0, `rgba(239, 68, 68, ${normalizedValue})`);
        gradient.addColorStop(1, `rgba(251, 146, 60, ${normalizedValue})`);
      } else if (index < 6) {
        // Mid frequencies - yellow to green
        gradient.addColorStop(0, `rgba(251, 191, 36, ${normalizedValue})`);
        gradient.addColorStop(1, `rgba(34, 197, 94, ${normalizedValue})`);
      } else {
        // Treble frequencies - blue to purple
        gradient.addColorStop(0, `rgba(59, 130, 246, ${normalizedValue})`);
        gradient.addColorStop(1, `rgba(147, 51, 234, ${normalizedValue})`);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, height - barHeight, barWidth - 4, barHeight);
    });
  };

  useEffect(() => {
    const animate = () => {
      drawVisualizer();
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, bands]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ecualizador Visual</h2>
          <p className="text-muted-foreground">Personaliza tu experiencia de audio</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Visualizer Canvas */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Visualizador de Audio</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={isPlaying ? 'bg-red-500 hover:bg-red-600' : ''}
                >
                  {isPlaying ? 'Pausar' : 'Reproducir'}
                </Button>
              </div>
            </div>
            
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full h-48 bg-muted rounded-lg"
            />
          </div>

          {/* Equalizer Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Frequency Bands */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sliders className="w-5 h-5" />
                    Bandas de Frecuencia
                  </h3>
                  <Button variant="outline" size="sm" onClick={resetEqualizer}>
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                  {bands.map((band, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2">
                        <Slider
                          value={[band.value]}
                          onValueChange={([value]) => updateBand(index, value)}
                          min={band.min}
                          max={band.max}
                          step={1}
                          orientation="vertical"
                          className="h-32 mx-auto"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {band.value > 0 ? `+${band.value}` : band.value}dB
                      </div>
                      <div className="text-xs font-medium">{band.frequency}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Presets and Controls */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Presets</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Plano', preset: 'flat' as const },
                    { name: 'Vocal', preset: 'vocal' as const },
                    { name: 'Bass', preset: 'bass' as const },
                    { name: 'Treble', preset: 'treble' as const },
                  ].map(({ name, preset }) => (
                    <Button
                      key={preset}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => applyPreset(preset)}
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Controles</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Volumen Master</label>
                    <Slider
                      value={[isMuted ? 0 : 75]}
                      onValueChange={([value]) => setIsMuted(value === 0)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Silenciado</span>
                    <span>Máximo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualEqualizer;
