import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Pause, Play, User, Volume2, VolumeX } from 'lucide-react';

type Episode = {
  id: number;
  title: string;
  show: string;
  host: string;
  duration: number;
  publishedAt: string;
  summary: string;
  audioUrl: string;
  tags: string[];
};

const episodes: Episode[] = [
  {
    id: 1,
    title: 'Panorama Synthwave 2024',
    show: 'SonFM After Hours',
    host: 'DJ Vega',
    duration: 1820,
    publishedAt: '2024-01-15',
    summary:
      'Un repaso por los lanzamientos más destacados del synthwave contemporáneo acompañado de datos curiosos de la escena.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    tags: ['Synthwave', 'Novedades']
  },
  {
    id: 2,
    title: 'Entrevista a Club Prisma',
    show: 'Circuito Local',
    host: 'Marina L.',
    duration: 2142,
    publishedAt: '2024-01-11',
    summary:
      'Conversación con los productores de Club Prisma sobre la escena electrónica latinoamericana y sus próximos eventos.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    tags: ['Entrevista', 'Escena Local']
  },
  {
    id: 3,
    title: 'Guía de sintetizadores portátiles',
    show: 'Laboratorio Sonoro',
    host: 'Nuria FX',
    duration: 1965,
    publishedAt: '2024-01-05',
    summary:
      'Análisis de los modelos compactos más versátiles para crear música sobre la marcha, con recomendaciones para principiantes.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    tags: ['Equipamiento', 'Tutorial']
  }
];

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const PodcastPlayer = () => {
  const [currentEpisodeId, setCurrentEpisodeId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentEpisodeId(null);
      setCurrentTime(0);
      setDuration(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('ended', handleEnded);
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const currentEpisode = useMemo(
    () => episodes.find(episode => episode.id === currentEpisodeId) || null,
    [currentEpisodeId]
  );

  const handlePlay = (episode: Episode) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    // If the same episode is selected toggle playback
    if (currentEpisodeId === episode.id) {
      if (audio.paused) {
        audio.play().catch(() => null);
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
      return;
    }

    audio.src = episode.audioUrl;
    audio.currentTime = 0;
    audio.play().then(() => {
      setCurrentEpisodeId(episode.id);
      setIsPlaying(true);
    }).catch(() => {
      setCurrentEpisodeId(null);
      setIsPlaying(false);
    });
  };

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = Math.min(Math.max(clickPosition / rect.width, 0), 1);
    audio.currentTime = duration * percentage;
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
    setIsMuted(false);
  };

  return (
    <section id="podcasts" className="py-20 bg-dark-main">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-black mb-4 text-dark-text-primary">
              Podcasts & Programas
            </h2>
            <p className="text-dark-text-secondary text-lg max-w-2xl mx-auto">
              Escucha los episodios más recientes de la programación de SonFM, con entrevistas, sesiones en vivo y cápsulas informativas.
            </p>
          </motion.div>

          <div className="space-y-6">
            {episodes.map((episode, index) => {
              const isCurrent = currentEpisodeId === episode.id;
              const progress = isCurrent && duration ? (currentTime / duration) * 100 : 0;

              return (
                <motion.article
                  key={episode.id}
                  className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-red-power text-white shrink-0">
                        <span className="text-3xl font-semibold">{episode.show.slice(0, 2).toUpperCase()}</span>
                      </div>

                      <div className="flex-1 space-y-4">
                        <header className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="text-2xl font-bold text-dark-text-primary">
                              {episode.title}
                            </h3>
                            <Badge className="w-fit bg-dark-red text-white">
                              {episode.show}
                            </Badge>
                          </div>
                          <p className="text-sm text-dark-text-secondary leading-relaxed">
                            {episode.summary}
                          </p>
                        </header>

                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-dark-text-secondary">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <div>
                              <dt className="uppercase text-xs tracking-wide text-dark-text-tertiary">Duración</dt>
                              <dd className="font-medium text-dark-text-primary">{formatDuration(episode.duration)}</dd>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <div>
                              <dt className="uppercase text-xs tracking-wide text-dark-text-tertiary">Emisión</dt>
                              <dd className="font-medium text-dark-text-primary">{new Date(episode.publishedAt).toLocaleDateString('es-ES')}</dd>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <div>
                              <dt className="uppercase text-xs tracking-wide text-dark-text-tertiary">Conduce</dt>
                              <dd className="font-medium text-dark-text-primary">{episode.host}</dd>
                            </div>
                          </div>
                        </dl>

                        <div className="flex flex-wrap gap-2">
                          {episode.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="border-dark-border text-dark-text-secondary">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div
                        className="h-2 w-full rounded-full bg-dark-elevated cursor-pointer"
                        role="presentation"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-red-power transition-all duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Button
                            size="lg"
                            className="rounded-full h-14 w-14 p-0 bg-dark-text-primary text-dark-main hover:bg-dark-text-secondary"
                            onClick={() => handlePlay(episode)}
                          >
                            {isCurrent && isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </Button>
                          <div className="text-sm text-dark-text-secondary">
                            <p className="font-semibold text-dark-text-primary">{isCurrent ? 'Reproduciendo ahora' : 'Listo para reproducir'}</p>
                            <p>
                              {isCurrent
                                ? `${formatDuration(currentTime)} / ${formatDuration(duration || episode.duration)}`
                                : `Duración total ${formatDuration(episode.duration)}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dark-text-secondary hover:text-dark-text-primary"
                            onClick={toggleMute}
                          >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </Button>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-full sm:w-48 accent-dark-red"
                            aria-label="Control de volumen"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastPlayer;