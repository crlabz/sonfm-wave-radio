import { useState } from 'react';
import { Menu, X, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'En Vivo', href: 'hero' },
    { label: 'Podcasts', href: 'podcasts' },
    { label: 'Programación', href: 'schedule' },
    { label: 'Locutores', href: 'hosts' },
    { label: 'Contacto', href: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    smoothScrollTo(href);
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-main/90 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Red Accent */}
          <motion.a 
            href="#hero" 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-red-power flex items-center justify-center shadow-red-glow"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Radio className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-dark-text-primary">
                Radio Web3
              </span>
              <span className="text-xs text-dark-text-secondary -mt-1">
                ON AIR
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm text-dark-text-secondary hover:text-dark-text-primary transition-all duration-300 rounded-lg hover:bg-dark-elevated hover:border-dark-red/30 border border-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, color: "#ff0000" }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-dark-elevated border border-dark-border hover:border-dark-red hover:shadow-red-glow"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-dark-text-primary" /> : <Menu className="w-5 h-5 text-dark-text-primary" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden border-t border-dark-border bg-dark-card"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? "auto" : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="px-4 py-3 text-sm text-dark-text-secondary hover:text-dark-text-primary transition-all duration-300 rounded-lg hover:bg-dark-elevated hover:border-dark-red/30 border border-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
