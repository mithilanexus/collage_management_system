"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  GraduationCap,
  Clock,
  Bell,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  DollarSign,
  FileText,
  Users,
  MapPin
} from "lucide-react";

export default function StudentDashboard() {
  const quickStats = [
    {
      title: "Current GPA",
      value: "3.85",
      change: "+0.12",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Credits Earned",
      value: "89/120",
      change: "74%",
      changeType: "neutral",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Current Courses",
      value: "5",
      change: "Active",
      changeType: "positive",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      title: "Account Balance",
      value: "$2,450",
      change: "Due Dec 15",
      changeType: "warning",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    }
  ];

  const upcomingEvents = [
    {
      title: "Database Systems Exam",
      date: "Tomorrow, 2:00 PM",
      location: "Room 301",
      type: "exam",
      color: "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
    },
    {
      title: "Web Development Assignment Due",
      date: "Dec 12, 11:59 PM",
      location: "Online Submission",
      type: "assignment",
      color: "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-300"
    },
    {
      title: "Career Fair",
      date: "Dec 15, 10:00 AM",
      location: "Student Center",
      type: "event",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
    },
    {
      title: "Spring Registration Opens",
      date: "Dec 18, 8:00 AM",
      location: "Online Portal",
      type: "registration",
      color: "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
    }
  ];

  const currentCourses = [
    {
      code: "CS-301",
      name: "Database Systems",
      instructor: "Dr. Smith",
      grade: "A-",
      progress: 85,
      nextClass: "Mon 10:00 AM"
    },
    {
      code: "CS-350",
      name: "Web Development",
      instructor: "Prof. Johnson",
      grade: "B+",
      progress: 78,
      nextClass: "Tue 2:00 PM"
    },
    {
      code: "MATH-250",
      name: "Statistics",
      instructor: "Dr. Wilson",
      grade: "A",
      progress: 92,
      nextClass: "Wed 9:00 AM"
    },
    {
      code: "ENG-201",
      name: "Technical Writing",
      instructor: "Prof. Davis",
      grade: "B",
      progress: 70,
      nextClass: "Thu 1:00 PM"
    }
  ];

  const notifications = [
    {
      type: "urgent",
      icon: AlertCircle,
      message: "Tuition payment due in 3 days",
      time: "2 hours ago",
      color: "text-red-600"
    },
    {
      type: "info",
      icon: Bell,
      message: "New assignment posted in Web Development",
      time: "4 hours ago",
      color: "text-blue-600"
    },
    {
      type: "success",
      icon: CheckCircle,
      message: "Grade posted for Database Systems Quiz",
      time: "1 day ago",
      color: "text-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your studies</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-muted-foreground">Current Semester</p>
          <p className="text-lg font-semibold">Fall 2024</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'warning' ? 'text-orange-600' : 'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Current Courses
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentCourses.map((course, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{course.code} - {course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      </div>
                      <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-0">
                        <div className="text-lg font-bold text-primary">{course.grade}</div>
                        <div className="text-xs text-muted-foreground">{course.nextClass}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Upcoming */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <notification.icon className={`w-4 h-4 mt-0.5 ${notification.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Tuition
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Register for Courses
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View Transcript
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Check Degree Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Events & Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.color}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academic Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Degree Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>74% (89/120 credits)</span>
                </div>
                <Progress value={74} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">3.85</div>
                  <div className="text-xs text-muted-foreground">Cumulative GPA</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">31</div>
                  <div className="text-xs text-muted-foreground">Credits Remaining</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Campus Life
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Computer Science Club</p>
                  <p className="text-sm text-muted-foreground">Active Member</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Dean's List</p>
                  <p className="text-sm text-muted-foreground">Fall 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
