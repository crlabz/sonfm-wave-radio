import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installSource, setInstallSource] = useState<'browser' | 'manual'>('browser');

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } else {
      // Fallback for manual installation instructions
      setInstallSource('manual');
      setShowInstallPrompt(true);
    }
  };

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Download className="w-5 h-5" />
              ¡App Instalada!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-green-700">
              Radio Web3 está instalada y lista para usar. Disfruta de la mejor experiencia de radio.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Instalar App
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissInstallPrompt}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>
            {installSource === 'browser' 
              ? 'Instala Radio Web3 para una experiencia completa con notificaciones y acceso offline.'
              : 'Instala Radio Web3 para una mejor experiencia de radio.'
            }
          </CardDescription>
          
          {installSource === 'manual' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <span><strong>Móvil:</strong> Toca el menú del navegador y selecciona "Agregar a pantalla de inicio"</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Monitor className="w-4 h-4 text-muted-foreground" />
                <span><strong>Desktop:</strong> Busca el ícono de instalación en la barra de direcciones</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleInstallClick} className="flex-1">
              {installSource === 'browser' ? 'Instalar Ahora' : 'Entendido'}
            </Button>
            <Button variant="outline" onClick={dismissInstallPrompt}>
              Más tarde
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstall;
