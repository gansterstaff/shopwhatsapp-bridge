
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setIsProcessing(true);
        const { error, data } = await supabase.auth.getSession();
        
        if (error) {
          setError(error.message);
          toast({
            title: "Error de autenticación",
            description: error.message,
            variant: "destructive",
          });
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        // Check if user needs to confirm email
        if (data.session?.user && !data.session.user.email_confirmed_at) {
          toast({
            title: "Verifica tu correo electrónico",
            description: "Por favor revisa tu bandeja de entrada para confirmar tu cuenta.",
            duration: 6000,
          });
          navigate('/login');
          return;
        }

        toast({
          title: "Inicio de sesión exitoso",
          description: "Has iniciado sesión correctamente.",
        });
        navigate('/');
      } catch (err) {
        console.error("Error in auth callback:", err);
        setError("Ocurrió un error durante la autenticación. Por favor, intenta nuevamente.");
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {isProcessing ? (
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Procesando tu solicitud...</p>
        </div>
      ) : error ? (
        <div className="w-full max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/login')} className="w-full">
            Volver a Iniciar Sesión
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AuthCallback;
