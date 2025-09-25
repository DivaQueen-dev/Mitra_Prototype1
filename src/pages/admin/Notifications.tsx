import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp, 
  Send,
  Filter,
  Check,
  X,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/services/notificationService';

interface Notification {
  id: string;
  type: 'risk_alert' | 'forum_flag' | 'resource_spike' | 'system' | 'broadcast';
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  metadata?: {
    studentId?: string;
    postId?: string;
    resourceId?: string;
  };
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [broadcastMessage, setBroadcastMessage] = useState({
    title: '',
    message: '',
    type: 'general' as 'general' | 'event' | 'tip'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const loadedNotifications = notificationService.getAdminNotifications();
    setNotifications(loadedNotifications);
  };

  const markAsRead = (id: string) => {
    notificationService.markAsRead(id);
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    notificationService.deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed.",
    });
  };

  const sendBroadcast = () => {
    if (!broadcastMessage.title || !broadcastMessage.message) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and message for the broadcast.",
        variant: "destructive",
      });
      return;
    }

    notificationService.sendBroadcast(
      broadcastMessage.title,
      broadcastMessage.message,
      broadcastMessage.type
    );

    toast({
      title: "Broadcast Sent",
      description: "Your message has been sent to all students.",
    });

    setBroadcastMessage({ title: '', message: '', type: 'general' });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'risk_alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'forum_flag':
        return <MessageSquare className="w-5 h-5 text-orange-500" />;
      case 'resource_spike':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => 
        filter === 'unread' ? !n.isRead : n.type === filter
      );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Notifications Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor alerts and send broadcasts to students
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {unreadCount} Unread
          </Badge>
        )}
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="inbox">Notification Inbox</TabsTrigger>
          <TabsTrigger value="broadcast">Send Broadcast</TabsTrigger>
        </TabsList>

        {/* Notification Inbox */}
        <TabsContent value="inbox" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter notifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="risk_alert">Risk Alerts</SelectItem>
                    <SelectItem value="forum_flag">Forum Flags</SelectItem>
                    <SelectItem value="resource_spike">Resource Spikes</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    notifications.forEach(n => {
                      if (!n.isRead) markAsRead(n.id);
                    });
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No notifications to display
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                                {notification.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <Badge 
                                  variant={
                                    notification.severity === 'high' ? 'destructive' : 
                                    notification.severity === 'medium' ? 'default' : 'secondary'
                                  }
                                >
                                  {notification.severity}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(notification.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Send Broadcast */}
        <TabsContent value="broadcast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Broadcast Message</CardTitle>
              <CardDescription>
                Send important announcements, tips, or event reminders to all students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message Type
                </label>
                <Select 
                  value={broadcastMessage.type} 
                  onValueChange={(value: 'general' | 'event' | 'tip') => 
                    setBroadcastMessage(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Announcement</SelectItem>
                    <SelectItem value="event">Event Reminder</SelectItem>
                    <SelectItem value="tip">Wellness Tip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message Title
                </label>
                <Input
                  placeholder="Enter broadcast title..."
                  value={broadcastMessage.title}
                  onChange={(e) => setBroadcastMessage(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message Content
                </label>
                <Textarea
                  placeholder="Enter your message here..."
                  value={broadcastMessage.message}
                  onChange={(e) => setBroadcastMessage(prev => ({ ...prev, message: e.target.value }))}
                  className="mt-2 min-h-32"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={sendBroadcast}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Broadcast
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Broadcasts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Broadcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter(n => n.type === 'broadcast')
                  .slice(0, 5)
                  .map(broadcast => (
                    <div key={broadcast.id} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <h4 className="font-medium text-slate-800 dark:text-slate-100">
                        {broadcast.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {broadcast.message}
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
                        Sent: {new Date(broadcast.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;