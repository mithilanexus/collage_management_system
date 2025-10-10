"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEvents } from "@/hooks/admin/management";
import { useDeleteEvent } from "@/hooks/admin/campus/events";

// Mock data for cam 
export default function EventsManagement() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useEvents(
    { page, pageSize, search: searchTerm },
    { keepPreviousData: true, staleTime: 60_000 }
  );

  const items = data?.items ?? data?.data ?? data ?? [];
  const total = data?.total ?? items?.length ?? 0;

  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const handleEdit = (eventId) => {
    router.push(`/admin/campus/events/${eventId}/edit`);
  };

  const { mutateAsync: deleteEvent } = useDeleteEvent({
    onSuccess: async (data) => {
      const success = data?.success !== false;
      toast.success((success && (data?.message || "Event deleted")) || "Event deleted");
      await qc.invalidateQueries({ queryKey: ["admin", "events", {}] });
    },
    onError: (e) => toast.error(e?.message || "Failed to delete"),
  });

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "Ongoing": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Completed": return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
      case "Cancelled": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
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

  const totalEvents = items.length;
  const upcomingEvents = items.filter(e => e.status === "Upcoming").length;
  const ongoingEvents = items.filter(e => e.status === "Ongoing").length;
  const totalAttendees = items.reduce((sum, e) => sum + (Number(e.registeredAttendees) || 0), 0);

  return (
    <>
      {isLoading ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-64 bg-muted/70 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-3">
                  <div className="h-5 w-28 bg-muted rounded animate-pulse" />
                  <div className="h-7 w-20 bg-muted/70 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted animate-pulse" />
                <CardHeader>
                  <div className="h-5 w-40 bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 4 }).map((__, j) => (
                    <div key={j} className="h-4 w-full bg-muted/70 rounded animate-pulse" />
                  ))}
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-9 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-9 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="space-y-6">
          <div className="text-destructive">{String(error?.message || "Failed to load events")}</div>
        </div>
      ) : (

        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Campus Events</h1>
              <p className="text-muted-foreground">Manage college events and activities</p>
            </div>
            <Button onClick={() => window.location.href = '/admin/campus/events/add'} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                    <p className="text-2xl font-bold text-primary">{totalEvents}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-600">{upcomingEvents}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ongoing</p>
                    <p className="text-2xl font-bold text-green-600">{ongoingEvents}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                    <p className="text-2xl font-bold text-orange-600">{totalAttendees.toLocaleString()}</p>
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
                placeholder="Search by event name, type, organizer or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.length === 0 ? (
              <div className="col-span-full text-muted-foreground">No events found.</div>
            ) : (
              items.map((event) => (
                <Card key={event._id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={event.image}
                      alt={event.eventName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg line-clamp-2">{event.eventName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{event.eventType}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{event.startDate} - {event.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{event.registeredAttendees}/{event.expectedAttendees} attendees</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Entry Fee:</span>
                      <span className="text-sm font-bold text-primary">
                        {event.entryFee === 0 ? "Free" : `Rs. ${event.entryFee}`}
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(event.registeredAttendees / event.expectedAttendees) * 100}%`
                        }}
                      ></div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(event)}
                        className="flex-1"
                      >
                        <Eye className="w-3 h-3 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event._id)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmDeleteId(event._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )))
            }
          </div>

          {/* Event Details Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Event Details - {selectedEvent.eventName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Event Image */}
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.eventName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Event Name</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.eventName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.eventType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEvent.status)}`}>
                        {selectedEvent.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Start Date</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.startDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Date</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.endDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Time</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Venue</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.venue}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Organizer</label>
                      <p className="text-sm text-muted-foreground">{selectedEvent.organizer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Entry Fee</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.entryFee === 0 ? "Free" : `Rs. ${selectedEvent.entryFee}`}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-medium mb-3">Description</h3>
                    <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                  </div>

                  {/* Attendance & Registration */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Attendance & Registration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Expected Attendees</label>
                        <p className="text-sm text-muted-foreground">{selectedEvent.expectedAttendees}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Registered Attendees</label>
                        <p className="text-sm text-muted-foreground">{selectedEvent.registeredAttendees}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Registration Required</label>
                        <p className="text-sm text-muted-foreground">{selectedEvent.registrationRequired ? "Yes" : "No"}</p>
                      </div>
                      {selectedEvent.registrationDeadline && (
                        <div>
                          <label className="text-sm font-medium">Registration Deadline</label>
                          <p className="text-sm text-muted-foreground">{selectedEvent.registrationDeadline}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact & Budget */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Contact & Budget</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Contact</label>
                        <p className="text-sm text-muted-foreground">{selectedEvent.contact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{selectedEvent.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Budget</label>
                        <p className="text-sm text-muted-foreground">Rs. {selectedEvent.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Sponsors</label>
                        <p className="text-sm text-muted-foreground">{selectedEvent.sponsors.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                      Close
                    </Button>
                    <Button onClick={() => handleEdit(selectedEvent._id)}>
                      Edit Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Delete Confirmation */}
          <AlertDialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete event?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the event and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
                  if (confirmDeleteId) {
                    handleDelete(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }
                }}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* Pagination */}
          <div className="flex gap-2 items-center justify-end">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
            <span className="text-sm">Page {page}</span>
            <Button size="sm" variant="outline" disabled={items.length < pageSize || page * pageSize >= total} onClick={() => setPage((p) => p + 1)}>Next</Button>
            {isFetching && <span className="text-xs text-muted-foreground ml-2">Updating…</span>}
          </div>

        </div>
      )}
    </>
  );
}
