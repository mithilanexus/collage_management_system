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
  MessageSquare,
  Send,
  Inbox,
  Archive,
  Star,
  Reply,
  Forward
} from "lucide-react";

// Mock data for messages (Nepali college system)
const mockMessages = [
  {
    id: 1,
    subject: "Grade Inquiry - First Semester Results",
    sender: "Anil Shrestha",
    senderType: "Student",
    senderEmail: "anil.shrestha@student.edu.np",
    recipient: "Academic Office",
    recipientType: "Department",
    message: "Dear Academic Office, I would like to inquire about my first semester results. I have not received my grade report yet, and the results were supposed to be published last week. Could you please provide an update on when I can expect to receive my grades? My student ID is STU2024001. Thank you for your assistance.",
    timestamp: "2024-01-15 14:30:00",
    status: "Unread",
    priority: "Medium",
    category: "Academic",
    isStarred: false,
    hasAttachment: false,
    threadId: "THR001"
  },
  {
    id: 2,
    subject: "Fee Payment Confirmation Required",
    sender: "Accounts Office",
    senderType: "Department",
    senderEmail: "accounts@college.edu.np",
    recipient: "Priya Poudel",
    recipientType: "Student",
    message: "Dear Priya, We have received your fee payment of Rs. 22,500 for the first semester. However, we need you to submit the original bank receipt for our records. Please visit the accounts office at your earliest convenience with the receipt. Your payment reference number is PAY2024002.",
    timestamp: "2024-01-14 11:15:00",
    status: "Read",
    priority: "High",
    category: "Finance",
    isStarred: true,
    hasAttachment: false,
    threadId: "THR002"
  },
  {
    id: 3,
    subject: "Library Book Return Reminder",
    sender: "Library Department",
    senderType: "Department",
    senderEmail: "library@college.edu.np",
    recipient: "Rajesh Gurung",
    recipientType: "Student",
    message: "Dear Rajesh, This is a friendly reminder that you have 2 books that are overdue. Please return the following books by January 20, 2024: 1) 'Advanced Mathematics' by Dr. K.C. Sharma 2) 'Physics Fundamentals' by Prof. R.P. Adhikari. Late fees of Rs. 10 per day per book will be charged after the due date.",
    timestamp: "2024-01-13 09:45:00",
    status: "Read",
    priority: "Low",
    category: "Library",
    isStarred: false,
    hasAttachment: false,
    threadId: "THR003"
  },
  {
    id: 4,
    subject: "Class Schedule Change Notification",
    sender: "Dr. Ram Prasad Sharma",
    senderType: "Teacher",
    senderEmail: "ram.sharma@college.edu.np",
    recipient: "Grade 12 Section A",
    recipientType: "Class",
    message: "Dear Students, Due to a faculty meeting, tomorrow's English Literature class (January 16, 2024) has been rescheduled from 9:00 AM to 2:00 PM. The class will be held in Room 101 as usual. Please make note of this change and inform your classmates. We will cover Chapter 5: Modern Poetry in this session.",
    timestamp: "2024-01-12 16:20:00",
    status: "Read",
    priority: "Medium",
    category: "Academic",
    isStarred: false,
    hasAttachment: false,
    threadId: "THR004"
  },
  {
    id: 5,
    subject: "Sports Tournament Registration Open",
    sender: "Sports Department",
    senderType: "Department",
    senderEmail: "sports@college.edu.np",
    recipient: "All Students",
    recipientType: "Broadcast",
    message: "Dear Students, Registration is now open for the Annual Inter-College Sports Tournament 2024. Events include Football, Basketball, Volleyball, Badminton, and Athletics. Registration deadline: April 5, 2024. Entry fee: Rs. 100 per participant. Prizes worth Rs. 50,000 for winners. Contact the sports department for more details.",
    timestamp: "2024-01-11 10:30:00",
    status: "Read",
    priority: "Medium",
    category: "Sports",
    isStarred: true,
    hasAttachment: true,
    threadId: "THR005"
  }
];

export default function MessagesManagement() {
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "unread" && message.status === "Unread") ||
                         (filter === "starred" && message.isStarred) ||
                         (filter === "sent" && message.senderType === "Department");
    
    return matchesSearch && matchesFilter;
  });

  const handleView = (message) => {
    setSelectedMessage(message);
    // Mark as read when viewed
    setMessages(messages.map(m => 
      m.id === message.id ? { ...m, status: "Read" } : m
    ));
  };

  const handleReply = (messageId) => {
    window.location.href = `/admin/communications/messages/${messageId}/reply`;
  };

  const handleDelete = (messageId) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(m => m.id !== messageId));
    }
  };

  const toggleStar = (messageId) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, isStarred: !m.isStarred } : m
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Unread": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "Read": return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
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

  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => m.status === "Unread").length;
  const starredMessages = messages.filter(m => m.isStarred).length;
  const sentMessages = messages.filter(m => m.senderType === "Department").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Manage internal communications and messages</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/communications/messages/compose'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Compose Message
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold text-primary">{totalMessages}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-blue-600">{unreadMessages}</p>
              </div>
              <Inbox className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Starred</p>
                <p className="text-2xl font-bold text-yellow-600">{starredMessages}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold text-green-600">{sentMessages}</p>
              </div>
              <Send className="w-8 h-8 text-green-600" />
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
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
          >
            Unread
          </Button>
          <Button 
            size="sm" 
            variant={filter === "starred" ? "default" : "outline"}
            onClick={() => setFilter("starred")}
          >
            Starred
          </Button>
          <Button 
            size="sm" 
            variant={filter === "sent" ? "default" : "outline"}
            onClick={() => setFilter("sent")}
          >
            Sent
          </Button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search messages by subject, sender, recipient or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                  message.status === "Unread" ? "bg-blue-50 dark:bg-blue-950/20" : ""
                }`}
                onClick={() => handleView(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-medium truncate ${
                        message.status === "Unread" ? "font-bold" : ""
                      }`}>
                        {message.subject}
                      </h3>
                      {message.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {message.hasAttachment && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="font-medium">{message.sender}</span>
                      <span>→</span>
                      <span>{message.recipient}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {message.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp} • {message.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(message.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Star className={`w-3 h-3 ${message.isStarred ? "text-yellow-500 fill-current" : ""}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReply(message.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Reply className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Message Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Message Header */}
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold mb-2">{selectedMessage.subject}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="font-medium">From:</label>
                    <p className="text-muted-foreground">{selectedMessage.sender} ({selectedMessage.senderType})</p>
                    <p className="text-muted-foreground">{selectedMessage.senderEmail}</p>
                  </div>
                  <div>
                    <label className="font-medium">To:</label>
                    <p className="text-muted-foreground">{selectedMessage.recipient} ({selectedMessage.recipientType})</p>
                  </div>
                  <div>
                    <label className="font-medium">Date:</label>
                    <p className="text-muted-foreground">{selectedMessage.timestamp}</p>
                  </div>
                  <div>
                    <label className="font-medium">Category:</label>
                    <p className="text-muted-foreground">{selectedMessage.category}</p>
                  </div>
                  <div>
                    <label className="font-medium">Priority:</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority}
                    </span>
                  </div>
                  <div>
                    <label className="font-medium">Status:</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h3 className="font-medium mb-3">Message</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleReply(selectedMessage.id)}>
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline">
                    <Forward className="w-4 h-4 mr-2" />
                    Forward
                  </Button>
                  <Button variant="outline">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
