"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Search, 
  Plus,
  Send,
  Paperclip,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  User,
  Clock
} from "lucide-react";

const mockMessages = [
  {
    id: 1,
    sender: "Dr. Rajesh Sharma",
    subject: "Assignment Submission Reminder",
    preview: "Please remember to submit your database project by Friday...",
    timestamp: "2024-01-15 10:30 AM",
    isRead: false,
    isStarred: false,
    type: "faculty"
  },
  {
    id: 2,
    sender: "Academic Office",
    subject: "Semester Registration Open",
    preview: "Registration for Spring 2025 semester is now open...",
    timestamp: "2024-01-14 2:15 PM",
    isRead: true,
    isStarred: true,
    type: "admin"
  },
  {
    id: 3,
    sender: "Prof. Sita Poudel",
    subject: "Lab Session Rescheduled",
    preview: "Tomorrow's web development lab has been moved to 3:00 PM...",
    timestamp: "2024-01-14 11:45 AM",
    isRead: true,
    isStarred: false,
    type: "faculty"
  },
  {
    id: 4,
    sender: "Library Services",
    subject: "Book Return Reminder",
    preview: "You have 2 books due for return by January 20th...",
    timestamp: "2024-01-13 9:00 AM",
    isRead: false,
    isStarred: false,
    type: "service"
  }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    body: ""
  });

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "unread" && !message.isRead) ||
                         (filter === "starred" && message.isStarred) ||
                         (filter === "faculty" && message.type === "faculty");
    
    return matchesSearch && matchesFilter;
  });

  const toggleStar = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const markAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const sendMessage = () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.body) {
      alert("Please fill in all fields");
      return;
    }
    alert("Message sent successfully!");
    setNewMessage({ to: "", subject: "", body: "" });
    setShowCompose(false);
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const starredCount = messages.filter(msg => msg.isStarred).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">{unreadCount} unread messages</p>
        </div>
        <Button onClick={() => setShowCompose(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Compose
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{messages.length}</div>
            <div className="text-sm text-muted-foreground">Total Messages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{starredCount}</div>
            <div className="text-sm text-muted-foreground">Starred</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {messages.filter(msg => msg.type === "faculty").length}
            </div>
            <div className="text-sm text-muted-foreground">From Faculty</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
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
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message.id);
                    }}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-muted/50' : ''
                    } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className={`text-sm ${!message.isRead ? 'font-semibold' : 'font-medium'}`}>
                          {message.sender}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(message.id);
                          }}
                          className="p-1"
                        >
                          <Star className={`w-3 h-3 ${message.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                        </Button>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <h4 className={`text-sm mb-1 ${!message.isRead ? 'font-semibold' : 'font-medium'}`}>
                      {message.subject}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {message.preview}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {selectedMessage.sender} • {selectedMessage.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => toggleStar(selectedMessage.id)}>
                      <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteMessage(selectedMessage.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p>Dear Student,</p>
                  <p>{selectedMessage.preview}</p>
                  <p>Please let me know if you have any questions or concerns.</p>
                  <p>Best regards,<br />{selectedMessage.sender}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a message to read</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">To</label>
                <Input
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                  placeholder="Enter recipient email or name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={newMessage.body}
                  onChange={(e) => setNewMessage({...newMessage, body: e.target.value})}
                  placeholder="Type your message here..."
                  rows={8}
                />
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Attach File
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowCompose(false)}>
                    Cancel
                  </Button>
                  <Button onClick={sendMessage} className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send
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
