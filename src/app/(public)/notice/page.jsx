import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Download, Pin, AlertCircle, Info } from "lucide-react";

export default function Notice() {
  const notices = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule Released",
      content:
        "The examination schedule for mid-semester exams has been published. Students are advised to check their respective department notice boards.",
      date: "March 20, 2024",
      type: "urgent",
      pinned: true,
      downloadable: true,
    },
    {
      id: 2,
      title: "Library Timing Changes During Exam Period",
      content:
        "The library will remain open 24/7 during the examination period from April 1-15, 2024.",
      date: "March 18, 2024",
      type: "info",
      pinned: true,
    },
    {
      id: 3,
      title: "Annual Sports Day Registration Open",
      content:
        "Registration for Annual Sports Day 2024 is now open. Interested students can register at the sports office.",
      date: "March 15, 2024",
      type: "event",
      downloadable: true,
    },
    {
      id: 4,
      title: "Scholarship Application Deadline Extended",
      content:
        "The deadline for merit scholarship applications has been extended to March 30, 2024.",
      date: "March 12, 2024",
      type: "important",
    },
    {
      id: 5,
      title: "Guest Lecture on AI and Future Technologies",
      content:
        "Dr. Sarah Wilson will deliver a guest lecture on 'AI and Future Technologies' on March 25, 2024, at 2:00 PM in the main auditorium.",
      date: "March 10, 2024",
      type: "event",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "important":
        return <Bell className="h-4 w-4 text-orange-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-green-500" />;
    }
  };

  const getTypeBadge = (type) => {
    const styles = {
      urgent: "bg-red-100 text-red-800 border-red-200",
      important: "bg-orange-100 text-orange-800 border-orange-200",
      event: "bg-blue-100 text-blue-800 border-blue-200",
      info: "bg-green-100 text-green-800 border-green-200",
    };
    return styles[type] || styles.info;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Notice Board</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest announcements, important dates, and
              updates from EduTech College administration and departments.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Bell,
                label: "Active Notices",
                value: "12",
                color: "text-blue-500",
              },
              {
                icon: Pin,
                label: "Pinned",
                value: "3",
                color: "text-green-500",
              },
              {
                icon: AlertCircle,
                label: "Urgent",
                value: "2",
                color: "text-red-500",
              },
              {
                icon: Calendar,
                label: "Events",
                value: "5",
                color: "text-purple-500",
              },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-2">
                  <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {notices.map((notice) => (
              <Card
                key={notice.id}
                className={`hover:shadow-lg transition-shadow ${
                  notice.pinned ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {notice.pinned && (
                          <Pin className="h-4 w-4 text-primary" />
                        )}
                        {getTypeIcon(notice.type)}
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getTypeBadge(
                            notice.type
                          )}`}
                        >
                          {notice.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {notice.date}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-muted-foreground">{notice.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {notice.downloadable && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                      <Button size="sm" variant="ghost">
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Looking for Older Notices?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Access our complete archive of notices and announcements
          </p>
          <Button size="lg" variant="outline" className="rounded-xl">
            View Archive
          </Button>
        </div>
      </section>
    </div>
  );
}
