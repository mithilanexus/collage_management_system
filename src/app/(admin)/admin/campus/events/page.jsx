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
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data for campus events (Nepali college system)
const mockEvents = [
  {
    id: 1,
    eventName: "Annual Cultural Festival 2024",
    eventType: "Cultural",
    description: "Three-day cultural festival featuring traditional dances, music performances, art exhibitions, and food stalls representing diverse Nepali culture.",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    startTime: "09:00",
    endTime: "18:00",
    venue: "Main Campus Ground",
    organizer: "Cultural Committee",
    expectedAttendees: 2000,
    registeredAttendees: 1250,
    registrationRequired: true,
    registrationDeadline: "2024-03-10",
    entryFee: 0,
    status: "Upcoming",
    priority: "High",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
    contact: "9841234567",
    email: "cultural@college.edu.np",
    budget: 150000,
    sponsors: ["Local Business Association", "Alumni Network"]
  },
  {
    id: 2,
    eventName: "Science Exhibition 2024",
    eventType: "Academic",
    description: "Student science projects exhibition showcasing innovative research and experiments in physics, chemistry, biology, and environmental science.",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    startTime: "10:00",
    endTime: "16:00",
    venue: "Science Building",
    organizer: "Science Department",
    expectedAttendees: 800,
    registeredAttendees: 650,
    registrationRequired: false,
    registrationDeadline: null,
    entryFee: 50,
    status: "Ongoing",
    priority: "Medium",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
    contact: "9841234568",
    email: "science@college.edu.np",
    budget: 75000,
    sponsors: ["Science Foundation Nepal"]
  },
  {
    id: 3,
    eventName: "Inter-College Sports Tournament",
    eventType: "Sports",
    description: "Annual inter-college sports tournament featuring football, basketball, volleyball, badminton, and athletics competitions.",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    startTime: "08:00",
    endTime: "17:00",
    venue: "Sports Complex",
    organizer: "Sports Department",
    expectedAttendees: 1500,
    registeredAttendees: 0,
    registrationRequired: true,
    registrationDeadline: "2024-04-05",
    entryFee: 100,
    status: "Upcoming",
    priority: "High",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    contact: "9841234569",
    email: "sports@college.edu.np",
    budget: 200000,
    sponsors: ["Sports Authority Nepal", "Local Sports Club"]
  },
  {
    id: 4,
    eventName: "Career Fair 2024",
    eventType: "Career",
    description: "Annual career fair bringing together leading employers, recruitment agencies, and career counselors to help students explore job opportunities.",
    startDate: "2024-05-08",
    endDate: "2024-05-09",
    startTime: "09:00",
    endTime: "17:00",
    venue: "Main Auditorium",
    organizer: "Career Development Center",
    expectedAttendees: 1200,
    registeredAttendees: 0,
    registrationRequired: true,
    registrationDeadline: "2024-05-03",
    entryFee: 0,
    status: "Upcoming",
    priority: "High",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    contact: "9841234570",
    email: "career@college.edu.np",
    budget: 100000,
    sponsors: ["Chamber of Commerce", "IT Association Nepal"]
  },
  {
    id: 5,
    eventName: "Alumni Meet 2024",
    eventType: "Alumni",
    description: "Annual alumni gathering to reconnect former students, share experiences, and strengthen the college community network.",
    startDate: "2024-01-20",
    endDate: "2024-01-20",
    startTime: "14:00",
    endTime: "20:00",
    venue: "College Auditorium",
    organizer: "Alumni Association",
    expectedAttendees: 500,
    registeredAttendees: 450,
    registrationRequired: true,
    registrationDeadline: "2024-01-15",
    entryFee: 500,
    status: "Completed",
    priority: "Medium",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
    contact: "9841234571",
    email: "alumni@college.edu.np",
    budget: 80000,
    sponsors: ["Alumni Network"]
  }
];

export default function EventsManagement() {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const handleEdit = (eventId) => {
    window.location.href = `/admin/campus/events/${eventId}/edit`;
  };

  const handleDelete = (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== eventId));
    }
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

  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === "Upcoming").length;
  const ongoingEvents = events.filter(e => e.status === "Ongoing").length;
  const totalAttendees = events.reduce((sum, e) => sum + e.registeredAttendees, 0);

  return (
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
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
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
                  onClick={() => handleEdit(event.id)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(event.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
                <Button onClick={() => handleEdit(selectedEvent.id)}>
                  Edit Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
