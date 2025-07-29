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
  Megaphone,
  Calendar,
  Users,
  Bell,
  Pin,
  AlertCircle
} from "lucide-react";

// Mock data for announcements (Nepali college system)
const mockAnnouncements = [
  {
    id: 1,
    title: "First Semester Examination Schedule 2024",
    content: "The first semester examinations for all programs will commence from May 20, 2024. Students are advised to check their exam schedules and prepare accordingly. Admit cards will be distributed from May 15, 2024.",
    category: "Academic",
    priority: "High",
    targetAudience: "All Students",
    publishDate: "2024-01-15",
    expiryDate: "2024-05-25",
    status: "Published",
    author: "Academic Office",
    isPinned: true,
    views: 1250,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "New Library Books Collection Available",
    content: "The college library has received a new collection of 500+ books covering various subjects including literature, science, and business studies. Students can now access these books for reference and borrowing.",
    category: "Library",
    priority: "Medium",
    targetAudience: "All Students",
    publishDate: "2024-01-12",
    expiryDate: "2024-03-12",
    status: "Published",
    author: "Library Department",
    isPinned: false,
    views: 890,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Annual Sports Week 2024",
    content: "The college annual sports week will be held from February 15-20, 2024. Various indoor and outdoor games will be organized. Interested students should register with the sports department by February 10, 2024.",
    category: "Sports",
    priority: "Medium",
    targetAudience: "All Students",
    publishDate: "2024-01-10",
    expiryDate: "2024-02-20",
    status: "Published",
    author: "Sports Department",
    isPinned: true,
    views: 675,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Fee Payment Deadline Extension",
    content: "Due to technical issues with the online payment system, the fee payment deadline has been extended to January 31, 2024. Students can pay fees through bank transfer or visit the accounts office.",
    category: "Finance",
    priority: "High",
    targetAudience: "All Students",
    publishDate: "2024-01-08",
    expiryDate: "2024-02-01",
    status: "Published",
    author: "Accounts Office",
    isPinned: false,
    views: 1100,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Guest Lecture on Digital Marketing",
    content: "A special guest lecture on 'Digital Marketing Trends 2024' will be conducted by Mr. Rajesh Hamal, Marketing Director at ABC Company, on January 25, 2024, at 2:00 PM in the main auditorium.",
    category: "Academic",
    priority: "Medium",
    targetAudience: "BBS Students",
    publishDate: "2024-01-05",
    expiryDate: "2024-01-26",
    status: "Draft",
    author: "Business Department",
    isPinned: false,
    views: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  }
];

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.targetAudience.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleEdit = (announcementId) => {
    window.location.href = `/admin/communications/announcements/${announcementId}/edit`;
  };

  const handleDelete = (announcementId) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter(a => a.id !== announcementId));
    }
  };

  const togglePin = (announcementId) => {
    setAnnouncements(announcements.map(a => 
      a.id === announcementId ? { ...a, isPinned: !a.isPinned } : a
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Draft": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Expired": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
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

  const totalAnnouncements = announcements.length;
  const publishedAnnouncements = announcements.filter(a => a.status === "Published").length;
  const pinnedAnnouncements = announcements.filter(a => a.isPinned).length;
  const totalViews = announcements.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">Manage college announcements and notices</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/communications/announcements/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Announcement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Announcements</p>
                <p className="text-2xl font-bold text-primary">{totalAnnouncements}</p>
              </div>
              <Megaphone className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">{publishedAnnouncements}</p>
              </div>
              <Bell className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pinned</p>
                <p className="text-2xl font-bold text-blue-600">{pinnedAnnouncements}</p>
              </div>
              <Pin className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-orange-600">{totalViews.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by title, category, audience or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img 
                src={announcement.image} 
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {announcement.isPinned && (
                  <div className="bg-blue-600 text-white p-1 rounded-full">
                    <Pin className="w-3 h-3" />
                  </div>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                  {announcement.status}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority}
                </span>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{announcement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{announcement.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">{announcement.content}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-medium">{announcement.targetAudience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published:</span>
                  <span className="font-medium">{announcement.publishDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views:</span>
                  <span className="font-medium">{announcement.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span className="font-medium">{announcement.author}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(announcement)}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePin(announcement.id)}
                  className={announcement.isPinned ? "text-blue-600" : ""}
                >
                  <Pin className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(announcement.id)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(announcement.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
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
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="w-5 h-5" />
                Announcement Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Announcement Image */}
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src={selectedAnnouncement.image} 
                  alt={selectedAnnouncement.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title and Content */}
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedAnnouncement.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{selectedAnnouncement.content}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedAnnouncement.priority)}`}>
                    {selectedAnnouncement.priority}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAnnouncement.status)}`}>
                    {selectedAnnouncement.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium">Target Audience</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.targetAudience}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Author</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.author}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Views</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.views}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Published Date</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.publishDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.expiryDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Pinned</label>
                  <p className="text-sm text-muted-foreground">{selectedAnnouncement.isPinned ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedAnnouncement(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedAnnouncement.id)}>
                  Edit Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
