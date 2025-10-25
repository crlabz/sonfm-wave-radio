import { useState, useEffect, useRef, useMemo } from 'react';
import { MessageCircle, Send, Users, Smile, Heart, MoreHorizontal, Flag, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

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
  highlighted?: boolean;
  badges?: string[];
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    username: 'DJ_Luna',
    message: '¡Bienvenidos a la transmisión en vivo! 🎵',
    timestamp: new Date(Date.now() - 300000),
    isModerator: true,
    isSubscriber: true,
    isVip: true,
    reactions: [],
    country: '🇪🇸',
    highlighted: true,
    badges: ['Host']
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
    country: '🇲🇽',
    badges: ['Suscriptor Pro']
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
    reactions: [
      { emoji: '❤️', count: 5 },
      { emoji: '🎶', count: 2 }
    ],
    country: '🇺🇸',
    badges: ['VIP Legend']
  }
];

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'moderators' | 'vip' | 'subscribers' | 'highlights'>('all');
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(
    initialMessages.find((msg) => msg.highlighted) ?? null
  );
  const [slowMode, setSlowMode] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
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
        'MusicFan',
        'RadioLover',
        'SoundWave',
        'BeatMaster',
        'AudioGeek',
        'TuneIn',
        'MelodyMaker',
        'RhythmKing',
        'VibeMaster',
        'SoundExplorer'
      ];

      const countries = ['🇪🇸', '🇲🇽', '🇦🇷', '🇨🇴', '🇺🇸', '🇨🇦', '🇧🇷', '🇨🇱'];

      if (Math.random() > 0.55) {
        setIsTyping(true);
        const typingDelay = 1800 + Math.random() * 1500;

        setTimeout(() => {
          const newMsg: ChatMessage = {
            id: Date.now().toString(),
            username: usernames[Math.floor(Math.random() * usernames.length)],
            message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
            timestamp: new Date(),
            isModerator: Math.random() > 0.9,
            isSubscriber: Math.random() > 0.6,
            isVip: Math.random() > 0.8,
            reactions: [],
            country: countries[Math.floor(Math.random() * countries.length)],
            highlighted: Math.random() > 0.95
          };

          setMessages((prev) => {
            const updated = [...prev.slice(-24), newMsg];
            if (newMsg.highlighted) {
              setPinnedMessage(newMsg);
            }
            return updated;
          });
          setIsTyping(false);
        }, typingDelay);
      }

      setOnlineUsers((prev) => {
        const fluctuation = Math.floor(Math.random() * 30) - 10;
        const updated = prev + fluctuation;
        return Math.max(950, Math.min(updated, 1800));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const connectionInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 4000);
      }
    }, 20000);

    return () => clearInterval(connectionInterval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (slowMode && lastSentAt) {
      const elapsed = Date.now() - lastSentAt;
      if (elapsed < 5000) {
        setErrorMessage('Modo lento activo: espera unos segundos antes de enviar otro mensaje.');
        return;
      }
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: 'Tú',
      message: newMessage,
      timestamp: new Date(),
      isModerator: false,
      isSubscriber: true,
      isVip: false,
      reactions: [],
      country: '🇪🇸',
      highlighted: newMessage.toLowerCase().includes('sonfm') || newMessage.toLowerCase().includes('saludos')
    };

    setMessages((prev) => [...prev, message]);
    if (message.highlighted) {
      setPinnedMessage(message);
    }
    setNewMessage('');
    setLastSentAt(Date.now());
    setErrorMessage(null);
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count + 1 } : r
              )
            };
          }

          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1 }]
          };
        }
        return msg;
      })
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = useMemo(() => {
    switch (activeFilter) {
      case 'moderators':
        return messages.filter((msg) => msg.isModerator);
      case 'vip':
        return messages.filter((msg) => msg.isVip);
      case 'subscribers':
        return messages.filter((msg) => msg.isSubscriber);
      case 'highlights':
        return messages.filter((msg) => msg.highlighted);
      default:
        return messages;
    }
  }, [activeFilter, messages]);

  const trendingReactions = useMemo(() => {
    const reactionMap = new Map<string, number>();
    messages.forEach((msg) => {
      msg.reactions.forEach((reaction) => {
        reactionMap.set(
          reaction.emoji,
          (reactionMap.get(reaction.emoji) ?? 0) + reaction.count
        );
      });
    });

    return Array.from(reactionMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [messages]);

  const participationLevel = useMemo(() => {
    const capped = Math.min(messages.length * 4, 100);
    return Math.max(30, capped);
  }, [messages.length]);

  const quickReplies = [
    '¡Saludos a todos los oyentes! 👋',
    '¿Cuál es el track ID de esta canción?',
    '¡Gran mezcla, DJ! 🔥',
    '¿Desde dónde nos escuchan? 🌎'
  ];

  const handleQuickReply = (reply: string) => {
    setNewMessage((prev) => (prev ? `${prev} ${reply}` : reply));
  };

  return (
    <TooltipProvider delayDuration={150}>
      <section className="bg-dark-main py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 flex items-center justify-center gap-3 text-5xl font-black text-dark-text-primary">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <MessageCircle className="h-12 w-12 text-dark-red" />
              </motion.div>
              Chat en Vivo
            </h2>
            <p className="text-lg text-dark-text-secondary">
              Conecta con otros oyentes en tiempo real
            </p>
          </motion.div>

          <motion.div
            className="mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="hover-lift bg-dark-card shadow-xl duration-200 rounded-2xl border border-dark-border transition-transform overflow-hidden">
              <motion.div
                className="border-b border-dark-border bg-dark-elevated p-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`h-4 w-4 rounded-full ${isConnected ? 'bg-dark-red' : 'bg-dark-text-tertiary'}`}
                        animate={{
                          scale: isConnected ? [1, 1.2, 1] : 1,
                          opacity: isConnected ? [0.8, 1, 0.8] : 0.5
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-bold text-dark-text-primary">
                        {isConnected ? 'Conectado' : 'Reconectando...'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
                      <Users className="h-4 w-4" />
                      <span>{onlineUsers.toLocaleString()} oyentes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="border-dark-border text-xs text-dark-text-secondary">
                            Interacción {Math.round(participationLevel)}%
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="border border-dark-border bg-dark-elevated text-dark-text-secondary">
                          Nivel de actividad basado en los últimos mensajes.
                        </TooltipContent>
                      </Tooltip>
                      <div className="w-32">
                        <Progress value={participationLevel} className="h-2 bg-dark-surface" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-dark-text-tertiary">
                      <span>Modo lento</span>
                      <Switch
                        checked={slowMode}
                        onCheckedChange={setSlowMode}
                        className="data-[state=checked]:bg-dark-red"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge className="bg-gradient-red-power text-white shadow-red-glow">ON AIR</Badge>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="sm" className="text-dark-text-secondary hover:text-dark-red">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {pinnedMessage && (
                  <motion.div
                    className="mt-6 rounded-xl border border-dark-border bg-dark-card/70 p-4 shadow-inner"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3 text-sm text-dark-text-secondary">
                      <Badge className="bg-dark-red text-white">Mensaje destacado</Badge>
                      <span className="font-semibold text-dark-text-primary">{pinnedMessage.username}</span>
                      <span className="text-xs text-dark-text-tertiary">{formatTime(pinnedMessage.timestamp)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-dark-text-secondary">
                      {pinnedMessage.message}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-dark-text-tertiary">
                      <span>
                        {pinnedMessage.isModerator
                          ? 'Moderador oficial'
                          : 'Mensaje seleccionado por la cabina'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPinnedMessage(null)}
                        className="h-8 px-3 text-xs text-dark-text-tertiary hover:text-dark-red"
                      >
                        Ocultar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <div className="border-b border-dark-border bg-dark-surface/40 px-6 py-4">
                <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as typeof activeFilter)}>
                  <TabsList className="bg-dark-card text-dark-text-tertiary">
                    <TabsTrigger value="all" className="data-[state=active]:bg-dark-red data-[state=active]:text-white">
                      Todos
                    </TabsTrigger>
                    <TabsTrigger value="highlights" className="data-[state=active]:bg-dark-red data-[state=active]:text-white">
                      Destacados
                    </TabsTrigger>
                    <TabsTrigger value="moderators" className="data-[state=active]:bg-dark-red data-[state=active]:text-white">
                      Moderación
                    </TabsTrigger>
                    <TabsTrigger value="vip" className="data-[state=active]:bg-dark-red data-[state=active]:text-white">
                      VIP
                    </TabsTrigger>
                    <TabsTrigger value="subscribers" className="data-[state=active]:bg-dark-red data-[state=active]:text-white">
                      Suscriptores
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div
                ref={messagesContainerRef}
                className="h-[28rem] space-y-4 overflow-y-auto bg-dark-surface/50 p-6"
              >
                <AnimatePresence>
                  {filteredMessages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 100 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      className={`group flex gap-4 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-dark-red/40 hover:bg-dark-elevated/50 ${msg.highlighted ? 'border border-dark-red/60 bg-dark-red/10 shadow-inner' : ''}`}
                    >
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-red-power text-xs text-white shadow-red-glow">
                            {msg.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-sm font-bold text-dark-text-primary">{msg.username}</span>
                          {msg.isModerator && (
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Badge className="shadow-red-glow flex items-center gap-1 bg-gradient-red-power px-2 py-1 text-xs text-white">
                                <Crown className="h-3 w-3" />
                                MOD
                              </Badge>
                            </motion.div>
                          )}
                          {msg.isVip && (
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Badge variant="outline" className="border-dark-red bg-dark-red/10 px-2 py-1 text-xs text-dark-red">
                                ⭐ VIP
                              </Badge>
                            </motion.div>
                          )}
                          {msg.isSubscriber && !msg.isVip && (
                            <Badge variant="outline" className="border-dark-border px-2 py-1 text-xs text-dark-text-secondary">
                              ⭐
                            </Badge>
                          )}
                          {msg.country && <span className="text-sm">{msg.country}</span>}
                          {msg.badges?.map((badge) => (
                            <Badge
                              key={badge}
                              variant="outline"
                              className="border-dark-border px-2 py-1 text-xs text-dark-text-secondary"
                            >
                              {badge}
                            </Badge>
                          ))}
                          <span className="text-xs text-dark-text-tertiary">{formatTime(msg.timestamp)}</span>
                        </div>

                        <p className="break-words text-sm leading-relaxed text-dark-text-secondary">{msg.message}</p>

                        {msg.reactions.length > 0 && (
                          <motion.div
                            className="mt-3 flex gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {msg.reactions.map((reaction, reactionIndex) => (
                              <motion.button
                                key={reactionIndex}
                                onClick={() => addReaction(msg.id, reaction.emoji)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="hover-border flex items-center gap-1 rounded-full border border-dark-border bg-dark-elevated px-3 py-1 text-xs transition-all duration-300 hover:bg-dark-red/20"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-dark-text-primary">{reaction.count}</span>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      <motion.div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              onClick={() => addReaction(msg.id, '❤️')}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              className="rounded-lg p-2 text-dark-text-tertiary transition-colors hover:bg-dark-red/20 hover:text-dark-red"
                            >
                              <Heart className="h-4 w-4" />
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent className="border border-dark-border bg-dark-elevated text-xs text-dark-text-secondary">
                            Enviar amor
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              onClick={() => addReaction(msg.id, '😊')}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              className="rounded-lg p-2 text-dark-text-tertiary transition-colors hover:bg-dark-red/20 hover:text-dark-red"
                            >
                              <Smile className="h-4 w-4" />
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent className="border border-dark-border bg-dark-elevated text-xs text-dark-text-secondary">
                            Buen rollo
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              onClick={() => addReaction(msg.id, '🔥')}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              className="rounded-lg p-2 text-dark-text-tertiary transition-colors hover:bg-dark-red/20 hover:text-dark-red"
                            >
                              🔥
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent className="border border-dark-border bg-dark-elevated text-xs text-dark-text-secondary">
                            Fueguito instantáneo
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="rounded-lg p-2 text-dark-text-tertiary transition-colors hover:bg-dark-red/20 hover:text-dark-red"
                            >
                              <Flag className="h-4 w-4" />
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent className="border border-dark-border bg-dark-elevated text-xs text-dark-text-secondary">
                            Reportar mensaje
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                className="border-t border-dark-border bg-dark-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 pb-4">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="h-8 border-dark-border bg-dark-surface px-3 text-xs text-dark-text-secondary hover:border-dark-red hover:text-dark-red"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex flex-col gap-4 md:flex-row">
                  <motion.div className="flex-1" whileFocus={{ scale: 1.02 }}>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 border-dark-border bg-dark-elevated text-dark-text-primary placeholder:text-dark-text-tertiary focus:border-dark-red focus:ring-1 focus:ring-dark-red/20"
                      maxLength={200}
                    />
                  </motion.div>
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!newMessage.trim()}
                        className="border-0 bg-gradient-red-power text-white transition-transform duration-150 hover:scale-105 disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </form>
                <div className="mt-4 flex flex-col gap-2 text-xs text-dark-text-tertiary md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <span>{newMessage.length}/200 caracteres</span>
                    {slowMode && (
                      <Badge variant="outline" className="border-dark-border text-dark-text-secondary">
                        Modo lento: 5s
                      </Badge>
                    )}
                  </div>
                  {errorMessage && (
                    <motion.p className="text-dark-red" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                      {errorMessage}
                    </motion.p>
                  )}
                  {isTyping && (
                    <motion.p
                      className="text-dark-text-tertiary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Alguien está escribiendo...
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div className="grid gap-4 border-t border-dark-border bg-dark-surface/40 p-6 text-sm text-dark-text-secondary md:grid-cols-2">
                <div className="rounded-xl border border-dark-border bg-dark-card/40 p-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark-text-tertiary">
                    Tendencias del chat
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingReactions.length > 0 ? (
                      trendingReactions.map(([emoji, count]) => (
                        <Badge key={emoji} className="bg-dark-red/20 text-dark-text-primary">
                          {emoji} x{count}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-xs text-dark-text-tertiary">Aún no hay reacciones destacadas.</p>
                    )}
                  </div>
                </div>
                <div className="rounded-xl border border-dark-border bg-dark-card/40 p-4">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark-text-tertiary">
                    Sugerencias de etiqueta
                  </h3>
                  <ul className="space-y-1 text-xs text-dark-text-tertiary">
                    <li>• Evita escribir en mayúsculas prolongadas.</li>
                    <li>• Usa reacciones para apoyar a otros oyentes.</li>
                    <li>• Sé respetuoso con la comunidad.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default LiveChat;
