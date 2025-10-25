import { Play, Pause, Volume2, VolumeX, Clock, Calendar, User, Star, Download, Share2, Heart, MoreHorizontal, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const podcasts = [
  {
    id: 1,
    title: 'El Futuro de la Web3',
    host: 'Tech Talks',
    duration: '45:30',
    image: '🎙️',
    description: 'Explorando las últimas tendencias en tecnología blockchain y Web3',
    category: 'Tecnología',
    date: '2024-01-15',
    rating: 4.8,
    downloads: '12.5K',
    isNew: true,
    isFeatured: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Música Electrónica Hoy',
    host: 'Sound Waves',
    duration: '32:15',
    image: '🎧',
    description: 'Los mejores tracks de música electrónica y sus creadores',
    category: 'Música',
    date: '2024-01-14',
    rating: 4.6,
    downloads: '8.2K',
    isNew: false,
    isFeatured: false,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Entrevista con DJ Luna',
    host: 'Behind the Mix',
    duration: '58:42',
    image: '🎵',
    description: 'Conversación íntima con uno de los DJs más influyentes del momento',
    category: 'Entrevista',
    date: '2024-01-13',
    rating: 4.9,
    downloads: '15.3K',
    isNew: false,
    isFeatured: true,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    title: 'Historia del Synthwave',
    host: 'Retro Vibes',
    duration: '41:20',
    image: '🌆',
    description: 'Un viaje por la evolución del synthwave desde los 80s hasta hoy',
    category: 'Historia',
    date: '2024-01-12',
    rating: 4.7,
    downloads: '6.8K',
    isNew: true,
    isFeatured: false,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Producción Musical Digital',
    host: 'Studio Sessions',
    duration: '52:10',
    image: '🎛️',
    description: 'Técnicas avanzadas de producción musical con software moderno',
    category: 'Educación',
    date: '2024-01-11',
    rating: 4.5,
    downloads: '9.1K',
    isNew: false,
    isFeatured: false,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Psychedelic Journey',
    host: 'Cosmic Sounds',
    duration: '38:45',
    image: '🌌',
    description: 'Un viaje sonoro a través de los géneros más experimentales',
    category: 'Experimental',
    date: '2024-01-10',
    rating: 4.4,
    downloads: '5.2K',
    isNew: true,
    isFeatured: false,
    color: 'from-violet-500 to-purple-500'
  }
];

const PodcastPlayer = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [likedPodcasts, setLikedPodcasts] = useState<number[]>([]);

  const categories = ['Todos', ...Array.from(new Set(podcasts.map(p => p.category)))];

  const filteredPodcasts = selectedCategory === 'Todos' 
    ? podcasts 
    : podcasts.filter(p => p.category === selectedCategory);

  const handlePlay = (id: number) => {
    if (playingId === id && isPlaying) {
      setIsPlaying(false);
    } else {
      setPlayingId(id);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const toggleLike = (id: number) => {
    setLikedPodcasts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  // Simulate progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playingId) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            setIsPlaying(false);
            setPlayingId(null);
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playingId]);

  return (
    <section id="podcasts" className="py-20 bg-dark-main">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-black mb-4 text-dark-text-primary">
              Podcasts & Programas
            </h2>
            <p className="text-dark-text-secondary text-lg">
              Descubre contenido exclusivo y entrevistas
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-dark-text-secondary" />
              <span className="text-sm text-dark-text-secondary">Filtrar por:</span>
            </div>
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-gradient-red-power text-white border-0 hover-scale' 
                      : 'bg-dark-elevated border-dark-border hover-border text-dark-text-primary'
                  }`}
              >
                {category}
              </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Podcast Gallery */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            layout
          >
            <AnimatePresence>
              {filteredPodcasts.map((podcast, index) => (
                <motion.div
                key={podcast.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.15 }
                  }}
                  className="group relative bg-dark-card rounded-2xl shadow-lg border border-dark-border overflow-hidden hover-lift transition-transform duration-200"
              >
                  {/* Image/Icon */}
                  <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${podcast.color} flex items-center justify-center text-4xl sm:text-6xl overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/40" />
                  <span className="relative z-10">{podcast.image}</span>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {podcast.isNew && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Badge className="bg-dark-red text-white shadow-red-glow">
                        Nuevo
                      </Badge>
                        </motion.div>
                    )}
                    {podcast.isFeatured && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <Badge variant="outline" className="bg-dark-red/20 border-dark-red/50 text-dark-red">
                        ⭐ Destacado
                      </Badge>
                        </motion.div>
                    )}
                  </div>

                  {/* Play Button Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="lg"
                          onClick={() => handlePlay(podcast.id)}
                          className="h-16 w-16 rounded-full bg-gradient-red-power text-white border-0 backdrop-blur-sm transition-transform duration-150 hover:scale-105"
                        >
                          <AnimatePresence mode="wait">
                      {playingId === podcast.id && isPlaying ? (
                              <motion.div
                                key="pause"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                        <Pause className="w-6 h-6" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="play"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                        <Play className="w-6 h-6" fill="currentColor" />
                              </motion.div>
                      )}
                          </AnimatePresence>
                    </Button>
                      </motion.div>
                    </motion.div>

                  {/* Progress Bar */}
                  {playingId === podcast.id && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="h-full bg-gradient-red-power transition-all duration-100"
                        style={{ width: `${progress}%` }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                      />
                      </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-dark-text-primary mb-2 line-clamp-2">
                        {podcast.title}
                      </h3>
                        <p className="text-sm text-dark-text-secondary mb-3">
                        {podcast.host}
                      </p>
                    </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleLike(podcast.id)}
                          className={`p-2 transition-colors duration-300 ${
                            likedPodcasts.includes(podcast.id) 
                              ? 'text-dark-red hover:text-dark-red-hover' 
                              : 'text-dark-text-tertiary hover:text-dark-red'
                          }`}
                        >
                          <Heart className={`w-4 h-4 transition-all duration-300 ${
                            likedPodcasts.includes(podcast.id) ? 'fill-current' : ''
                          }`} />
                    </Button>
                      </motion.div>
                  </div>

                    <p className="text-sm text-dark-text-secondary mb-4 line-clamp-2">
                    {podcast.description}
                  </p>

                  {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-dark-text-tertiary mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{podcast.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-dark-red" />
                      <span>{podcast.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{podcast.downloads}</span>
                    </div>
                  </div>

                  {/* Category and Actions */}
                  <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className="text-xs border-dark-border text-dark-text-secondary hover:border-dark-red hover:text-dark-red transition-colors duration-300"
                      >
                      {podcast.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" variant="ghost" className="p-2 text-dark-text-tertiary hover:text-dark-red hover-scale">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" variant="ghost" className="p-2 text-dark-text-tertiary hover:text-dark-red hover-scale">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 bg-dark-elevated border-dark-border text-dark-text-primary hover-border transition-all duration-300"
              >
              Cargar Más Podcasts
            </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PodcastPlayer;