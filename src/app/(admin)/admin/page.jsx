import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Bell,
  DollarSign,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Faculty Members",
      value: "186",
      change: "+3%",
      changeType: "positive",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Active Courses",
      value: "124",
      change: "+8%",
      changeType: "positive",
      icon: BookOpen,
      color: "text-purple-600"
    },
    {
      title: "Revenue (Monthly)",
      value: "$284,750",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-emerald-600"
    }
  ];

  const recentActivities = [
    {
      type: "enrollment",
      message: "New student enrollment: Sarah Johnson",
      time: "2 minutes ago",
      color: "bg-blue-500"
    },
    {
      type: "payment",
      message: "Fee payment received from John Smith",
      time: "15 minutes ago",
      color: "bg-green-500"
    },
    {
      type: "course",
      message: "New course 'Advanced AI' created by Dr. Wilson",
      time: "1 hour ago",
      color: "bg-purple-500"
    },
    {
      type: "grade",
      message: "Grades submitted for CS-301 by Prof. Davis",
      time: "2 hours ago",
      color: "bg-orange-500"
    },
    {
      type: "announcement",
      message: "Campus event announcement published",
      time: "3 hours ago",
      color: "bg-pink-500"
    }
  ];

  const upcomingEvents = [
    {
      title: "Faculty Meeting",
      date: "Today, 2:00 PM",
      type: "meeting"
    },
    {
      title: "Student Orientation",
      date: "Tomorrow, 9:00 AM",
      type: "event"
    },
    {
      title: "Semester End Exams",
      date: "Dec 15-22, 2024",
      type: "exam"
    },
    {
      title: "Winter Break",
      date: "Dec 23 - Jan 8",
      type: "holiday"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at EduTech College.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Add Student</p>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors">
              <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900 dark:text-green-100">Add Faculty</p>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors">
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">New Course</p>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors">
              <Bell className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Send Notice</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
