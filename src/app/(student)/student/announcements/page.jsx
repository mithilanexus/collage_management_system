"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Megaphone, 
  Search, 
  Calendar,
  Clock,
  Pin,
  Eye,
  BookOpen,
  AlertCircle,
  Info,
  CheckCircle,
  Star
} from "lucide-react";

const mockAnnouncements = [
  {
    id: 1,
    title: "Spring 2025 Registration Opens December 18th",
    content: "Registration for Spring 2025 semester will begin on December 18th at 8:00 AM. Students are advised to meet with their academic advisors before registration. Priority registration will be given to senior students.",
    author: "Academic Office",
    date: "2024-12-10",
    time: "10:00 AM",
    category: "Academic",
    priority: "High",
    isPinned: true,
    isRead: false,
    tags: ["Registration", "Spring 2025", "Important"],
    views: 245
  },
  {
    id: 2,
    title: "Library Extended Hours During Finals Week",
    content: "The college library will extend its operating hours during finals week (December 16-22). The library will be open from 6:00 AM to 12:00 AM to accommodate students' study needs.",
    author: "Library Services",
    date: "2024-12-08",
    time: "2:30 PM",
    category: "Library",
    priority: "Medium",
    isPinned: false,
    isRead: true,
    tags: ["Library", "Finals", "Study Hours"],
    views: 189
  },
  {
    id: 3,
    title: "Career Fair - December 15th",
    content: "Annual Career Fair will be held on December 15th from 10:00 AM to 4:00 PM at the Student Center. Over 50 companies will be participating. Students are encouraged to bring multiple copies of their resumes.",
    author: "Career Services",
    date: "2024-12-05",
    time: "11:15 AM",
    category: "Career",
    priority: "Medium",
    isPinned: true,
    isRead: false,
    tags: ["Career Fair", "Jobs", "Networking"],
    views: 312
  },
  {
    id: 4,
    title: "Winter Break Schedule",
    content: "Winter break will begin on December 23rd and classes will resume on January 15th, 2025. The college administrative offices will be closed from December 24th to January 2nd.",
    author: "Administration",
    date: "2024-12-03",
    time: "9:45 AM",
    category: "General",
    priority: "Low",
    isPinned: false,
    isRead: true,
    tags: ["Winter Break", "Schedule", "Holidays"],
    views: 156
  },
  {
    id: 5,
    title: "New COVID-19 Guidelines",
    content: "Updated COVID-19 safety guidelines are now in effect. Masks are recommended in crowded areas. Students feeling unwell should stay home and contact the health center.",
    author: "Health Services",
    date: "2024-12-01",
    time: "3:20 PM",
    category: "Health",
    priority: "High",
    isPinned: false,
    isRead: true,
    tags: ["Health", "COVID-19", "Safety"],
    views: 203
  },
  {
    id: 6,
    title: "Student Parking Permit Renewal",
    content: "Student parking permits for Spring 2025 semester must be renewed by January 10th. Renewal can be done online through the student portal or at the campus security office.",
    author: "Campus Security",
    date: "2024-11-28",
    time: "1:10 PM",
    category: "Campus",
    priority: "Medium",
    isPinned: false,
    isRead: true,
    tags: ["Parking", "Permits", "Renewal"],
    views: 98
  }
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "all" || 
                         (filter === "unread" && !announcement.isRead) ||
                         (filter === "pinned" && announcement.isPinned) ||
                         (filter === "high" && announcement.priority === "High") ||
                         announcement.category.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const markAsRead = (announcementId) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === announcementId ? { ...ann, isRead: true } : ann
    ));
  };

  const togglePin = (announcementId) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === announcementId ? { ...ann, isPinned: !ann.isPinned } : ann
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Academic": return <BookOpen className="w-4 h-4" />;
      case "Health": return <AlertCircle className="w-4 h-4" />;
      case "Career": return <Star className="w-4 h-4" />;
      case "Library": return <Info className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  const unreadCount = announcements.filter(ann => !ann.isRead).length;
  const pinnedCount = announcements.filter(ann => ann.isPinned).length;
  const highPriorityCount = announcements.filter(ann => ann.priority === "High").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">{unreadCount} unread announcements</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last updated</p>
          <p className="font-medium">Today, 10:00 AM</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{announcements.length}</div>
            <div className="text-sm text-muted-foreground">Total Announcements</div>
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
            <div className="text-2xl font-bold text-yellow-600">{pinnedCount}</div>
            <div className="text-sm text-muted-foreground">Pinned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{highPriorityCount}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
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
            variant={filter === "pinned" ? "default" : "outline"}
            onClick={() => setFilter("pinned")}
          >
            Pinned
          </Button>
          <Button 
            size="sm" 
            variant={filter === "high" ? "default" : "outline"}
            onClick={() => setFilter("high")}
          >
            High Priority
          </Button>
          <Button 
            size="sm" 
            variant={filter === "academic" ? "default" : "outline"}
            onClick={() => setFilter("academic")}
          >
            Academic
          </Button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              !announcement.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
            } ${announcement.isPinned ? 'border-t-2 border-t-yellow-400' : ''}`}
            onClick={() => {
              setSelectedAnnouncement(announcement);
              markAsRead(announcement.id);
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(announcement.category)}
                  <div>
                    <h3 className={`font-semibold text-lg ${!announcement.isRead ? 'text-primary' : ''}`}>
                      {announcement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{announcement.author}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{announcement.date}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{announcement.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {announcement.isPinned && (
                    <Pin className="w-4 h-4 text-yellow-600" />
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                  {!announcement.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {announcement.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {announcement.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="w-3 h-3" />
                  <span>{announcement.views} views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Announcement Details Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {getCategoryIcon(selectedAnnouncement.category)}
                    {selectedAnnouncement.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>By {selectedAnnouncement.author}</span>
                    <span>•</span>
                    <span>{selectedAnnouncement.date} at {selectedAnnouncement.time}</span>
                    <span>•</span>
                    <span>{selectedAnnouncement.views} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(selectedAnnouncement.id);
                    }}
                  >
                    <Pin className={`w-4 h-4 ${selectedAnnouncement.isPinned ? 'text-yellow-600' : ''}`} />
                  </Button>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedAnnouncement.priority)}`}>
                    {selectedAnnouncement.priority}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p>{selectedAnnouncement.content}</p>
              </div>
              
              <div className="flex gap-2">
                {selectedAnnouncement.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedAnnouncement(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
