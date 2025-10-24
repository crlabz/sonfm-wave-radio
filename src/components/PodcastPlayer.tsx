import { Play, SkipBack, SkipForward, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const podcasts = [
  {
    id: 1,
    title: 'El Futuro de la Web3',
    host: 'Tech Talks',
    duration: '45:30',
    image: '🎙️',
  },
  {
    id: 2,
    title: 'Música Electrónica Hoy',
    host: 'Sound Waves',
    duration: '32:15',
    image: '🎧',
  },
  {
    id: 3,
    title: 'Entrevista con DJ Luna',
    host: 'Behind the Mix',
    duration: '58:42',
    image: '🎵',
  },
];

const PodcastPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);

  const currentPodcast = podcasts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % podcasts.length);
    setProgress([0]);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length);
    setProgress([0]);
  };

  return (
    <section id="podcasts" className="py-20 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Podcasts & Programas
            </h2>
            <p className="text-muted-foreground">
              Escucha cuando quieras los mejores episodios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Player */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="aspect-square mb-6 rounded-xl bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center text-6xl">
                {currentPodcast.image}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{currentPodcast.title}</h3>
                <p className="text-sm text-muted-foreground">{currentPodcast.host}</p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0:00</span>
                  <span>{currentPodcast.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handlePrevious}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-14 w-14 rounded-full"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" fill="currentColor" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleNext}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Playlist */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4">Lista de Reproducción</h3>
              {podcasts.map((podcast, index) => (
                <button
                  key={podcast.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setProgress([0]);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-colors ${
                    index === currentIndex
                      ? 'bg-accent border border-border'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center text-2xl shrink-0">
                      {podcast.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{podcast.title}</h4>
                      <p className="text-sm text-muted-foreground">{podcast.host}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {podcast.duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastPlayer;
