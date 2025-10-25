import { useState, useEffect } from 'react';
import { Users, Radio, TrendingUp, Clock, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveStats = () => {
  const [listeners, setListeners] = useState(1247);
  const [uptime, setUptime] = useState('2d 14h 32m');
  const [peakListeners, setPeakListeners] = useState(2156);
  const [countries, setCountries] = useState(47);

  useEffect(() => {
    // Simulate real-time listener count changes
    const interval = setInterval(() => {
      setListeners(prev => {
        const change = Math.floor(Math.random() * 20) - 10; // Random change between -10 and +10
        return Math.max(100, prev + change); // Minimum 100 listeners
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      label: 'Oyentes en Vivo',
      value: listeners.toLocaleString(),
      change: '+12%',
      color: 'text-dark-red',
      bgColor: 'bg-dark-red/10',
      borderColor: 'border-dark-red/30',
      gradient: 'from-dark-red to-dark-red-hover'
    },
    {
      icon: Clock,
      label: 'Tiempo al Aire',
      value: uptime,
      change: '24/7',
      color: 'text-dark-red',
      bgColor: 'bg-dark-red/10',
      borderColor: 'border-dark-red/30',
      gradient: 'from-dark-red to-dark-red-hover'
    },
    {
      icon: TrendingUp,
      label: 'Pico de Oyentes',
      value: peakListeners.toLocaleString(),
      change: 'Hoy',
      color: 'text-dark-red',
      bgColor: 'bg-dark-red/10',
      borderColor: 'border-dark-red/30',
      gradient: 'from-dark-red to-dark-red-hover'
    },
    {
      icon: Globe,
      label: 'Países',
      value: countries,
      change: 'Global',
      color: 'text-dark-red',
      bgColor: 'bg-dark-red/10',
      borderColor: 'border-dark-red/30',
      gradient: 'from-dark-red to-dark-red-hover'
    }
  ];

  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black mb-4 text-dark-text-primary">
            Estadísticas en Vivo
          </h2>
          <p className="text-dark-text-secondary text-lg">
            Conecta con nuestra comunidad global
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.15 }
              }}
              className={`group relative p-8 rounded-2xl bg-dark-card border border-dark-border hover-lift transition-transform duration-200`}
            >
              {/* Background glow effect */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                whileHover={{ opacity: 0.1 }}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <motion.div 
                    className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-red-glow`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className={`w-6 h-6 text-white`} />
                  </motion.div>
                  <motion.span 
                    className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${stat.gradient} text-white shadow-red-glow`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.change}
                  </motion.span>
                </div>
                
                <div className="space-y-3">
                  <motion.h3 
                    className="text-4xl font-black text-dark-text-primary"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-sm text-dark-text-secondary font-medium">
                    {stat.label}
                  </p>
                </div>
                
                {/* Animated progress bar for listeners */}
                {index === 0 && (
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <div className="w-full bg-dark-border rounded-full h-2 bg-dark-elevated">
                      <motion.div 
                        className="bg-gradient-to-r from-dark-red to-dark-red-hover h-2 rounded-full shadow-red-glow"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (listeners / peakListeners) * 100)}%` }}
                        transition={{ duration: 1.5, delay: 1 }}
                      />
                    </div>
                    <p className="text-xs text-dark-text-tertiary mt-2">
                      {Math.round((listeners / peakListeners) * 100)}% del pico máximo
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-dark-elevated border border-dark-border hover-border transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-3 h-3 bg-dark-red rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            />
            <span className="text-sm font-medium text-dark-text-primary">
              Datos actualizados en tiempo real
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;