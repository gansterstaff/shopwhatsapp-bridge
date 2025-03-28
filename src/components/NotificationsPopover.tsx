
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Oferta Especial',
    content: '¡20% de descuento en todos los productos por tiempo limitado!',
    date: '2024-07-10T14:30:00Z',
    read: false,
  },
  {
    id: 2,
    title: 'Nuevos Productos',
    content: 'Echa un vistazo a nuestros nuevos productos recién llegados.',
    date: '2024-07-09T10:15:00Z',
    read: false,
  },
  {
    id: 3,
    title: 'Recordatorio de Carrito',
    content: 'Tienes productos en tu carrito esperando por ti.',
    date: '2024-07-08T18:45:00Z',
    read: true,
  },
];

const NotificationsPopover: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Notificaciones</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todo como leído
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-80">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-secondary transition-colors cursor-pointer ${!notification.read ? 'bg-secondary/50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.content}</p>
                  {!notification.read && (
                    <div className="mt-2 flex justify-end">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  )}
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="text-muted-foreground">No tienes notificaciones</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
