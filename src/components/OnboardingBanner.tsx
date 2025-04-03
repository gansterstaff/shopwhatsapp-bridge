
"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const OnboardingBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Comprueba si el usuario ya ha visto el onboarding
  useEffect(() => {
    const onboardingSeen = localStorage.getItem('onboardingSeen');
    setHasSeenOnboarding(!!onboardingSeen);
    
    // Si es un nuevo usuario y no ha visto el onboarding, mostrarlo automáticamente
    if (!onboardingSeen) {
      setIsOpen(true);
    }
  }, []);

  const stepContent = [
    {
      title: "¡Bienvenido a ShopWhats!",
      description: "Descubre una experiencia de compra innovadora que te permitirá encontrar tus productos favoritos de manera fácil y divertida.",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "Compra con facilidad",
      description: "Explora nuestras categorías, encuentra ofertas exclusivas y disfruta de una navegación intuitiva diseñada para ti.",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "Comunícate por WhatsApp",
      description: "Nuestro servicio integrado con WhatsApp te permite realizar consultas y compras directamente desde tu aplicación favorita.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "¡Estás listo para comenzar!",
      description: "Explora nuestra tienda y descubre por qué nuestros clientes nos prefieren. ¡Te esperamos!",
      image: "https://images.unsplash.com/photo-1607083209225-94c28c85d36b?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Guardar en localStorage que el usuario ha visto el onboarding
    localStorage.setItem('onboardingSeen', 'true');
  };

  const triggerOnboarding = () => {
    setStep(1);
    setIsOpen(true);
  };

  return (
    <>
      {/* Botón flotante para abrir el onboarding (visible si el usuario ya lo ha visto) */}
      {hasSeenOnboarding && (
        <div className="fixed bottom-20 right-4 z-50 animate-bounce">
          <RainbowButton onClick={triggerOnboarding}>
            Descubre ShopWhats
          </RainbowButton>
        </div>
      )}

      {/* Dialog de onboarding */}
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) handleClose();
        setIsOpen(open);
      }}>
        <DialogContent className="gap-0 p-0 sm:max-w-[500px] [&>button:last-child]:text-white">
          <div className="p-2">
            <img
              className="w-full h-[200px] object-cover rounded-lg"
              src={stepContent[step - 1].image}
              alt="Onboarding ShopWhats"
            />
          </div>
          <div className="space-y-6 px-6 pb-6 pt-3">
            <DialogHeader>
              <DialogTitle className="text-xl">{stepContent[step - 1].title}</DialogTitle>
              <DialogDescription className="pt-2">{stepContent[step - 1].description}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex justify-center space-x-1.5 max-sm:order-1">
                {[...Array(totalSteps)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${index + 1 === step ? "bg-primary" : "bg-primary/20"}`}
                  />
                ))}
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Saltar
                </Button>
                {step < totalSteps ? (
                  <Button className="group" type="button" onClick={handleContinue}>
                    Siguiente
                    <ArrowRight
                      className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button type="button" onClick={handleClose}>
                    Comenzar
                  </Button>
                )}
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingBanner;
