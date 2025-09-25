interface Notification {
  id: string;
  type: 'risk_alert' | 'forum_flag' | 'resource_spike' | 'system' | 'broadcast';
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  recipient?: 'admin' | 'student' | 'all';
  metadata?: {
    studentId?: string;
    postId?: string;
    resourceId?: string;
  };
}

class NotificationService {
  private readonly STORAGE_KEY = 'mitra-notifications';

  constructor() {
    this.initializeNotifications();
  }

  private initializeNotifications() {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      const initialNotifications: Notification[] = [
        {
          id: '1',
          type: 'risk_alert',
          title: 'High Risk Student Alert',
          message: 'Student ID #2847 has shown consistently high stress scores this week',
          severity: 'high',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          recipient: 'admin',
          metadata: { studentId: '2847' }
        },
        {
          id: '2',
          type: 'forum_flag',
          title: 'Post Flagged for Review',
          message: 'A community post has been flagged for containing potentially harmful content',
          severity: 'medium',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          recipient: 'admin',
          metadata: { postId: 'post-123' }
        },
        {
          id: '3',
          type: 'resource_spike',
          title: 'Resource Usage Spike',
          message: 'The "Managing Exam Stress" guide has been accessed 150 times today',
          severity: 'low',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          recipient: 'admin',
          metadata: { resourceId: 'res-456' }
        }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialNotifications));
    }
  }

  getAdminNotifications(): Notification[] {
    const notifications = this.getAllNotifications();
    return notifications
      .filter(n => n.recipient === 'admin' || n.recipient === 'all')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getStudentNotifications(): Notification[] {
    const notifications = this.getAllNotifications();
    return notifications
      .filter(n => n.recipient === 'student' || n.recipient === 'all' || n.type === 'broadcast')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  private getAllNotifications(): Notification[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const notifications = this.getAllNotifications();
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    notifications.push(newNotification);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
  }

  markAsRead(id: string): void {
    const notifications = this.getAllNotifications();
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index].isRead = true;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
    }
  }

  deleteNotification(id: string): void {
    const notifications = this.getAllNotifications();
    const filtered = notifications.filter(n => n.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  sendBroadcast(title: string, message: string, type: 'general' | 'event' | 'tip'): void {
    const broadcastNotification: Omit<Notification, 'id' | 'timestamp'> = {
      type: 'broadcast',
      title,
      message,
      severity: 'low',
      isRead: false,
      recipient: 'all'
    };
    this.addNotification(broadcastNotification);
  }

  // Generate risk alert when student scores are high
  generateRiskAlert(studentId: string, studentName: string, score: number): void {
    if (score > 15) { // PHQ-9 score > 15 indicates severe
      this.addNotification({
        type: 'risk_alert',
        title: 'High Risk Student Detected',
        message: `${studentName} (ID: ${studentId}) has a PHQ-9 score of ${score}, indicating severe symptoms`,
        severity: 'high',
        isRead: false,
        recipient: 'admin',
        metadata: { studentId }
      });
    }
  }

  // Generate forum flag notification
  flagForumPost(postId: string, reason: string): void {
    this.addNotification({
      type: 'forum_flag',
      title: 'Forum Post Flagged',
      message: `Post has been flagged: ${reason}`,
      severity: 'medium',
      isRead: false,
      recipient: 'admin',
      metadata: { postId }
    });
  }

  // Generate resource spike notification
  notifyResourceSpike(resourceId: string, resourceName: string, accessCount: number): void {
    this.addNotification({
      type: 'resource_spike',
      title: 'High Resource Usage',
      message: `"${resourceName}" has been accessed ${accessCount} times in the last hour`,
      severity: 'low',
      isRead: false,
      recipient: 'admin',
      metadata: { resourceId }
    });
  }
}

export const notificationService = new NotificationService();