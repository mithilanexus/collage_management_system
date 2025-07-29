"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Bell,
  Send,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Zap
} from "lucide-react";

// Mock data for notifications (Nepali college system)
const mockNotifications = [
  {
    id: 1,
    title: "Exam Schedule Released",
    message: "The first semester examination schedule has been published. Students can check their exam dates and venues on the college website.",
    type: "Academic",
    priority: "High",
    targetAudience: "All Students",
    deliveryMethod: ["Push", "Email", "SMS"],
    scheduledTime: "2024-01-15 09:00:00",
    status: "Sent",
    sentCount: 1250,
    readCount: 980,
    clickCount: 450,
    createdBy: "Academic Office",
    createdAt: "2024-01-14 16:30:00",
    expiryDate: "2024-05-30",
    isUrgent: true
  },
  {
    id: 2,
    title: "Library New Books Available",
    message: "New collection of 500+ books has arrived in the college library. Students can now borrow these books for their studies.",
    type: "Library",
    priority: "Medium",
    targetAudience: "All Students",
    deliveryMethod: ["Push", "Email"],
    scheduledTime: "2024-01-12 10:00:00",
    status: "Sent",
    sentCount: 1250,
    readCount: 750,
    clickCount: 120,
    createdBy: "Library Department",
    createdAt: "2024-01-11 14:20:00",
    expiryDate: "2024-03-12",
    isUrgent: false
  },
  {
    id: 3,
    title: "Fee Payment Deadline Reminder",
    message: "Reminder: The deadline for first semester fee payment is January 31, 2024. Please complete your payment to avoid late fees.",
    type: "Finance",
    priority: "High",
    targetAudience: "Students with Pending Fees",
    deliveryMethod: ["Push", "Email", "SMS"],
    scheduledTime: "2024-01-20 08:00:00",
    status: "Scheduled",
    sentCount: 0,
    readCount: 0,
    clickCount: 0,
    createdBy: "Accounts Office",
    createdAt: "2024-01-10 11:15:00",
    expiryDate: "2024-02-01",
    isUrgent: true
  },
  {
    id: 4,
    title: "Sports Tournament Registration",
    message: "Registration is now open for the Annual Inter-College Sports Tournament 2024. Register before April 5, 2024.",
    type: "Sports",
    priority: "Medium",
    targetAudience: "All Students",
    deliveryMethod: ["Push", "Email"],
    scheduledTime: "2024-01-11 15:00:00",
    status: "Sent",
    sentCount: 1250,
    readCount: 890,
    clickCount: 320,
    createdBy: "Sports Department",
    createdAt: "2024-01-10 13:45:00",
    expiryDate: "2024-04-05",
    isUrgent: false
  },
  {
    id: 5,
    title: "Class Schedule Change",
    message: "Tomorrow's English Literature class has been rescheduled from 9:00 AM to 2:00 PM due to faculty meeting.",
    type: "Academic",
    priority: "High",
    targetAudience: "Grade 12 Section A",
    deliveryMethod: ["Push", "SMS"],
    scheduledTime: "2024-01-12 18:00:00",
    status: "Sent",
    sentCount: 45,
    readCount: 42,
    clickCount: 15,
    createdBy: "Dr. Ram Prasad Sharma",
    createdAt: "2024-01-12 17:30:00",
    expiryDate: "2024-01-16",
    isUrgent: true
  },
  {
    id: 6,
    title: "System Maintenance Notice",
    message: "The college management system will be under maintenance on January 25, 2024, from 2:00 AM to 6:00 AM. Services may be temporarily unavailable.",
    type: "System",
    priority: "Medium",
    targetAudience: "All Users",
    deliveryMethod: ["Push", "Email"],
    scheduledTime: "2024-01-23 10:00:00",
    status: "Draft",
    sentCount: 0,
    readCount: 0,
    clickCount: 0,
    createdBy: "IT Department",
    createdAt: "2024-01-08 09:20:00",
    expiryDate: "2024-01-26",
    isUrgent: false
  }
];

export default function NotificationsManagement() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "sent" && notification.status === "Sent") ||
                         (filter === "scheduled" && notification.status === "Scheduled") ||
                         (filter === "draft" && notification.status === "Draft") ||
                         (filter === "urgent" && notification.isUrgent);
    
    return matchesSearch && matchesFilter;
  });

  const handleView = (notification) => {
    setSelectedNotification(notification);
  };

  const handleEdit = (notificationId) => {
    window.location.href = `/admin/communications/notifications/${notificationId}/edit`;
  };

  const handleDelete = (notificationId) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      setNotifications(notifications.filter(n => n.id !== notificationId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sent": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "Draft": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Academic": return <Bell className="w-4 h-4" />;
      case "Finance": return <AlertCircle className="w-4 h-4" />;
      case "Sports": return <Zap className="w-4 h-4" />;
      case "Library": return <Info className="w-4 h-4" />;
      case "System": return <Clock className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const totalNotifications = notifications.length;
  const sentNotifications = notifications.filter(n => n.status === "Sent").length;
  const scheduledNotifications = notifications.filter(n => n.status === "Scheduled").length;
  const totalSent = notifications.reduce((sum, n) => sum + n.sentCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Manage push notifications and alerts</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/communications/notifications/create'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Notification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
                <p className="text-2xl font-bold text-primary">{totalNotifications}</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold text-green-600">{sentNotifications}</p>
              </div>
              <Send className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledNotifications}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold text-orange-600">{totalSent.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={filter === "sent" ? "default" : "outline"}
            onClick={() => setFilter("sent")}
          >
            Sent
          </Button>
          <Button 
            size="sm" 
            variant={filter === "scheduled" ? "default" : "outline"}
            onClick={() => setFilter("scheduled")}
          >
            Scheduled
          </Button>
          <Button 
            size="sm" 
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
          >
            Draft
          </Button>
          <Button 
            size="sm" 
            variant={filter === "urgent" ? "default" : "outline"}
            onClick={() => setFilter("urgent")}
          >
            Urgent
          </Button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search notifications by title, message, type or audience..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleView(notification)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(notification.type)}
                      <h3 className="font-medium truncate">{notification.title}</h3>
                      {notification.isUrgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Urgent
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>Target: {notification.targetAudience}</span>
                        <span>Methods: {notification.deliveryMethod.join(", ")}</span>
                        <span>By: {notification.createdBy}</span>
                      </div>
                      <span>{notification.scheduledTime}</span>
                    </div>
                    {notification.status === "Sent" && (
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Sent: {notification.sentCount}</span>
                        <span>Read: {notification.readCount}</span>
                        <span>Clicked: {notification.clickCount}</span>
                        <span>Read Rate: {((notification.readCount / notification.sentCount) * 100).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(notification);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(notification.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Details Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Header */}
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(selectedNotification.type)}
                  <h2 className="text-xl font-bold">{selectedNotification.title}</h2>
                  {selectedNotification.isUrgent && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Urgent
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium">Type:</label>
                    <p className="text-muted-foreground">{selectedNotification.type}</p>
                  </div>
                  <div>
                    <label className="font-medium">Priority:</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedNotification.priority)}`}>
                      {selectedNotification.priority}
                    </span>
                  </div>
                  <div>
                    <label className="font-medium">Status:</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedNotification.status)}`}>
                      {selectedNotification.status}
                    </span>
                  </div>
                  <div>
                    <label className="font-medium">Target Audience:</label>
                    <p className="text-muted-foreground">{selectedNotification.targetAudience}</p>
                  </div>
                  <div>
                    <label className="font-medium">Delivery Methods:</label>
                    <p className="text-muted-foreground">{selectedNotification.deliveryMethod.join(", ")}</p>
                  </div>
                  <div>
                    <label className="font-medium">Scheduled Time:</label>
                    <p className="text-muted-foreground">{selectedNotification.scheduledTime}</p>
                  </div>
                  <div>
                    <label className="font-medium">Created By:</label>
                    <p className="text-muted-foreground">{selectedNotification.createdBy}</p>
                  </div>
                  <div>
                    <label className="font-medium">Expiry Date:</label>
                    <p className="text-muted-foreground">{selectedNotification.expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="font-medium mb-3">Message</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedNotification.message}</p>
                </div>
              </div>

              {/* Analytics */}
              {selectedNotification.status === "Sent" && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{selectedNotification.sentCount}</div>
                        <div className="text-sm text-muted-foreground">Sent</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedNotification.readCount}</div>
                        <div className="text-sm text-muted-foreground">Read</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedNotification.clickCount}</div>
                        <div className="text-sm text-muted-foreground">Clicked</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {((selectedNotification.readCount / selectedNotification.sentCount) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Read Rate</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedNotification(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedNotification.id)}>
                  Edit Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
