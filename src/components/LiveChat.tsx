import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Users, Smile, Heart, MoreHorizontal, Flag, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isModerator: boolean;
  isSubscriber: boolean;
  isVip: boolean;
  reactions: { emoji: string; count: number }[];
  country?: string;
}

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'DJ_Luna',
      message: '¡Bienvenidos a la transmisión en vivo! 🎵',
      timestamp: new Date(Date.now() - 300000),
      isModerator: true,
      isSubscriber: true,
      isVip: true,
      reactions: [],
      country: '🇪🇸'
    },
    {
      id: '2',
      username: 'MusicLover23',
      message: '¡Increíble música! 🔥',
      timestamp: new Date(Date.now() - 240000),
      isModerator: false,
      isSubscriber: true,
      isVip: false,
      reactions: [{ emoji: '🔥', count: 3 }],
      country: '🇲🇽'
    },
    {
      id: '3',
      username: 'RadioFan',
      message: '¿Cuál es la próxima canción?',
      timestamp: new Date(Date.now() - 180000),
      isModerator: false,
      isSubscriber: false,
      isVip: false,
      reactions: [],
      country: '🇦🇷'
    },
    {
      id: '4',
      username: 'SoundWave',
      message: '¡Esta canción es épica! 🎶',
      timestamp: new Date(Date.now() - 120000),
      isModerator: false,
      isSubscriber: true,
      isVip: true,
      reactions: [{ emoji: '❤️', count: 5 }, { emoji: '🎶', count: 2 }],
      country: '🇺🇸'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate new messages
    const interval = setInterval(() => {
      const sampleMessages = [
        '¡Increíble! 🎵',
        '¿Pueden poner más música electrónica?',
        '¡Esta canción me encanta! ❤️',
        '¿Cuándo es el próximo show?',
        '¡Saludos desde Colombia! 🇨🇴',
        'La calidad del audio es perfecta',
        '¡Más música como esta! 🔥',
        '¿Tienen playlist en Spotify?',
        '¡Excelente transmisión! 👏',
        '¿Pueden saludar a María?'
      ];

      const usernames = [
        'MusicFan', 'RadioLover', 'SoundWave', 'BeatMaster', 
        'AudioGeek', 'TuneIn', 'MelodyMaker', 'RhythmKing',
        'VibeMaster', 'SoundExplorer'
      ];

      const countries = ['🇪🇸', '🇲🇽', '🇦🇷', '🇨🇴', '🇺🇸', '🇨🇦', '🇧🇷', '🇨🇱'];

      if (Math.random() > 0.7) {
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          username: usernames[Math.floor(Math.random() * usernames.length)],
          message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
          timestamp: new Date(),
          isModerator: Math.random() > 0.9,
          isSubscriber: Math.random() > 0.6,
          isVip: Math.random() > 0.8,
          reactions: [],
          country: countries[Math.floor(Math.random() * countries.length)]
        };
        setMessages(prev => [...prev.slice(-19), newMsg]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: 'Tú',
      message: newMessage,
      timestamp: new Date(),
      isModerator: false,
      isSubscriber: true,
      isVip: false,
      reactions: [],
      country: '🇪🇸'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="py-20 bg-dark-main">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black mb-4 flex items-center justify-center gap-3 text-dark-text-primary">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <MessageCircle className="w-12 h-12 text-dark-red" />
            </motion.div>
            Chat en Vivo
          </h2>
          <p className="text-dark-text-secondary text-lg">Conecta con otros oyentes en tiempo real</p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-lg hover-lift transition-all duration-300">
            {/* Chat Header */}
            <motion.div 
              className="bg-dark-elevated border-b border-dark-border p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`w-4 h-4 rounded-full ${isConnected ? 'bg-dark-red' : 'bg-dark-text-tertiary'}`}
                      animate={{ 
                        scale: isConnected ? [1, 1.2, 1] : 1,
                        opacity: isConnected ? [0.8, 1, 0.8] : 0.6
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: isConnected ? Infinity : 0 
                      }}
                    />
                    <span className="text-sm font-bold text-dark-text-primary">
                      {isConnected ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>{onlineUsers.toLocaleString()} oyentes</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="bg-gradient-red-power text-white shadow-red-glow">
                      ON AIR
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="text-dark-text-secondary hover:text-dark-red">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-dark-surface/50">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                    className="group flex gap-4 hover:bg-dark-elevated/50 p-3 rounded-xl transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-xs bg-gradient-red-power text-white shadow-red-glow">
                          {msg.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm text-dark-text-primary">{msg.username}</span>
                        {msg.isModerator && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge className="bg-gradient-red-power text-white text-xs px-2 py-1 shadow-red-glow">
                              <Crown className="w-3 h-3 mr-1" />
                              MOD
                            </Badge>
                          </motion.div>
                        )}
                        {msg.isVip && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="outline" className="text-xs px-2 py-1 border-dark-red text-dark-red bg-dark-red/10">
                              ⭐ VIP
                            </Badge>
                          </motion.div>
                        )}
                        {msg.isSubscriber && !msg.isVip && (
                          <Badge variant="outline" className="text-xs px-2 py-1 border-dark-border text-dark-text-secondary">
                            ⭐
                          </Badge>
                        )}
                        {msg.country && (
                          <span className="text-sm">{msg.country}</span>
                        )}
                        <span className="text-xs text-dark-text-tertiary">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-dark-text-secondary break-words leading-relaxed">{msg.message}</p>
                      
                      {/* Reactions */}
                      {msg.reactions.length > 0 && (
                        <motion.div 
                          className="flex gap-2 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {msg.reactions.map((reaction, index) => (
                            <motion.button
                              key={index}
                              onClick={() => addReaction(msg.id, reaction.emoji)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center gap-1 text-xs bg-dark-elevated hover:bg-dark-red/20 px-3 py-1 rounded-full transition-all duration-300 border border-dark-border hover-border"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-dark-text-primary">{reaction.count}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Quick reactions */}
                    <motion.div 
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        onClick={() => addReaction(msg.id, '❤️')}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        className="p-2 hover:bg-dark-red/20 rounded-lg transition-colors text-dark-text-tertiary hover:text-dark-red"
                      >
                        <Heart className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => addReaction(msg.id, '😊')}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        className="p-2 hover:bg-dark-red/20 rounded-lg transition-colors text-dark-text-tertiary hover:text-dark-red"
                      >
                        <Smile className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => addReaction(msg.id, '🔥')}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        className="p-2 hover:bg-dark-red/20 rounded-lg transition-colors text-dark-text-tertiary hover:text-dark-red"
                      >
                        🔥
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <motion.div 
              className="border-t border-dark-border p-6 bg-dark-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <motion.div 
                  className="flex-1"
                  whileFocus={{ scale: 1.02 }}
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-dark-elevated border-dark-border text-dark-text-primary placeholder:text-dark-text-tertiary focus:border-dark-red focus:ring-1 focus:ring-dark-red/20"
                    maxLength={200}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    size="sm" 
                    disabled={!newMessage.trim()}
                    className="bg-gradient-red-power text-white border-0 disabled:opacity-50 hover-scale"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-dark-text-tertiary">
                  {newMessage.length}/200 caracteres
                </p>
                {isTyping && (
                  <motion.p 
                    className="text-xs text-dark-text-tertiary"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Alguien está escribiendo...
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveChat;