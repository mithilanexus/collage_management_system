import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function AcademicCalendar() {
  const events = [
    {
      date: "2024-01-15",
      title: "Spring Semester Begins",
      type: "academic",
      description: "Classes commence for Spring 2024 semester"
    },
    {
      date: "2024-02-19",
      title: "Presidents Day Holiday",
      type: "holiday",
      description: "No classes - College closed"
    },
    {
      date: "2024-03-11",
      title: "Spring Break Begins",
      type: "break",
      description: "Spring break week - No classes"
    },
    {
      date: "2024-03-18",
      title: "Classes Resume",
      type: "academic",
      description: "Spring break ends, classes resume"
    },
    {
      date: "2024-04-15",
      title: "Registration Opens",
      type: "registration",
      description: "Fall 2024 course registration begins"
    },
    {
      date: "2024-05-10",
      title: "Final Exams Begin",
      type: "exam",
      description: "Spring 2024 final examination period"
    },
    {
      date: "2024-05-17",
      title: "Commencement Ceremony",
      type: "ceremony",
      description: "Graduation ceremony for Spring 2024"
    },
    {
      date: "2024-06-01",
      title: "Summer Session Begins",
      type: "academic",
      description: "Summer courses commence"
    }
  ];

  const getEventColor = (type) => {
    switch (type) {
      case "academic": return "bg-blue-100 text-blue-800 border-blue-200";
      case "holiday": return "bg-red-100 text-red-800 border-red-200";
      case "break": return "bg-green-100 text-green-800 border-green-200";
      case "registration": return "bg-purple-100 text-purple-800 border-purple-200";
      case "exam": return "bg-orange-100 text-orange-800 border-orange-200";
      case "ceremony": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Academic Calendar</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with important dates, events, and deadlines throughout the academic year.
          </p>
        </div>

        {/* Current Semester Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Current Semester: Spring 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Weeks Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">May 10</div>
                <div className="text-sm text-muted-foreground">Final Exams Begin</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">May 17</div>
                <div className="text-sm text-muted-foreground">Graduation Day</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events & Important Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Student Portal</h3>
              <p className="text-muted-foreground text-sm">Access your personal academic calendar and schedule</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Campus Events</h3>
              <p className="text-muted-foreground text-sm">Discover upcoming campus activities and events</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Download Calendar</h3>
              <p className="text-muted-foreground text-sm">Export calendar to your preferred calendar app</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
