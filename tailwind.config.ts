import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Dark Power Theme Colors
        'dark-bg': '#0a0a0a',
        'dark-surface': '#111111',
        'dark-elevated': '#1a1a1a',
        'dark-border': '#222222',
        'dark-border-hover': '#333333',
        'dark-text-primary': '#ffffff',
        'dark-text-secondary': '#888888',
        'dark-text-tertiary': '#666666',
        'dark-red': '#ff0000',
        'dark-red-hover': '#cc0000',
        'dark-red-overlay': 'rgba(255, 0, 0, 0.1)',
        
        // Legacy shadcn colors (keeping for compatibility)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: "hsl(var(--accent-blue))",
          purple: "hsl(var(--accent-purple))",
          pink: "hsl(var(--accent-pink))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-fade': 'var(--gradient-fade)',
        'gradient-radial': 'var(--gradient-radial)',
        'gradient-dark-power': 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
        'gradient-red-power': 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
        'gradient-red-glow': 'linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(204, 0, 0, 0.05) 100%)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'red-glow': '0 0 20px rgba(255, 0, 0, 0.3)',
        'red-glow-lg': '0 0 40px rgba(255, 0, 0, 0.4)',
        'dark-glow': '0 0 20px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-red": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        "glow-red": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(255, 0, 0, 0.6)",
          },
        },
        "slide-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "wave-animation": {
          "0%, 100%": {
            transform: "translateX(0) scaleY(1)",
          },
          "50%": {
            transform: "translateX(10px) scaleY(1.1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-red": "pulse-red 2s ease-in-out infinite",
        "glow-red": "glow-red 2s ease-in-out infinite",
        "slide-in-up": "slide-in-up 0.6s ease-out",
        "fade-in-scale": "fade-in-scale 0.5s ease-out",
        "wave-animation": "wave-animation 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
