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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAnnouncements } from "@/hooks/admin/management";



export default function AnnouncementsManagement() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useAnnouncements(
    { page, pageSize, search: searchTerm },
    { keepPreviousData: true, staleTime: 60_000 }
  );

  const items = data?.items ?? data?.data ?? data ?? [];
  const total = data?.total ?? items?.length ?? 0;

  const handleView = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleEdit = (announcementId) => {
    router.push(`/admin/communications/announcements/${announcementId}/edit`);
  };

  const handleDelete = async (announcementId) => {
    try {
      const response = await fetch(`/api/admin/communications/announcements/${announcementId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        // Best-effort refresh
        await qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error(error.message);
    }
  };

  // Pin toggle can be implemented via a mutation hitting an endpoint if needed

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

  const totalAnnouncements = items.length;
  const publishedAnnouncements = items.filter(a => a.status === "Published").length;
  const pinnedAnnouncements = items.filter(a => a.isPinned).length;
  const totalViews = items.reduce((sum, a) => sum + (Number(a.views) || 0), 0);

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
        {isFetching && <span className="text-xs text-muted-foreground self-center">Updating…</span>}
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full">Loading…</div>
        ) : isError ? (
          <div className="col-span-full text-destructive">{String(error?.message || "Failed to load")}</div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-muted-foreground">No announcements found.</div>
        ) : (
          items.map((announcement) => (
          <Card key={announcement._id} className="hover:shadow-lg transition-shadow">
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
                  onClick={() => handleEdit(announcement._id)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(announcement._id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          ))
        )}
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
                <Button onClick={() => handleEdit(selectedAnnouncement._id)}>
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
