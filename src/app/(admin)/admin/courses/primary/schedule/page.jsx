"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Eye,
  School,
  Download,
  Printer,
  Settings,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";

export default function PrimaryScheduleView() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [activeTab, setActiveTab] = useState("daily");
  const [expandedClasses, setExpandedClasses] = useState({});

  const primaryClasses = [
    "PG", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timeSlots = [
    { time: "9:00-9:45", period: 1 },
    { time: "9:45-10:30", period: 2 },
    { time: "10:30-10:45", period: "Break", isBreak: true },
    { time: "10:45-11:30", period: 3 },
    { time: "11:30-12:15", period: 4 },
    { time: "12:15-1:00", period: 5 },
    { time: "1:00-1:45", period: 6 }
  ];

  const weeklyRoutine = {
    "PG": {
      Monday: ["English", "Nepali", "Break", "Math", "Drawing", "Play Time"],
      Tuesday: ["Math", "English", "Break", "Nepali", "Art", "Story Time"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Drawing", "Free Play"],
      Thursday: ["English", "Drawing", "Break", "Math", "Nepali", "Music"],
      Friday: ["Math", "Nepali", "Break", "English", "Games", "Assembly"]
    },
    "Nursery": {
      Monday: ["English", "Nepali", "Break", "Math", "Drawing", "Play Time"],
      Tuesday: ["Math", "English", "Break", "Nepali", "Art", "Story Time"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Drawing", "Free Play"],
      Thursday: ["English", "Drawing", "Break", "Math", "Nepali", "Music"],
      Friday: ["Math", "Nepali", "Break", "English", "Games", "Assembly"]
    },
    "LKG": {
      Monday: ["English", "Nepali", "Break", "Math", "Drawing", "GK"],
      Tuesday: ["Math", "English", "Break", "Nepali", "Art", "Story Time"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Drawing", "Free Play"],
      Thursday: ["English", "GK", "Break", "Math", "Nepali", "Music"],
      Friday: ["Math", "Nepali", "Break", "English", "Games", "Assembly"]
    },
    "UKG": {
      Monday: ["English", "Nepali", "Break", "Math", "Drawing", "GK"],
      Tuesday: ["Math", "English", "Break", "Nepali", "Art", "Story Time"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Drawing", "Free Play"],
      Thursday: ["English", "GK", "Break", "Math", "Nepali", "Music"],
      Friday: ["Math", "Nepali", "Break", "English", "Games", "Assembly"]
    },
    "Class 1": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "PE"],
      Tuesday: ["Math", "English", "Break", "Social", "Nepali", "Art"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Science", "PE"],
      Thursday: ["English", "Social", "Break", "Math", "Nepali", "Computer"],
      Friday: ["Math", "Nepali", "Break", "English", "PE", "Assembly"]
    },
    "Class 2": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "PE"],
      Tuesday: ["Math", "English", "Break", "Social", "Nepali", "Art"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Science", "PE"],
      Thursday: ["English", "Social", "Break", "Math", "Nepali", "Computer"],
      Friday: ["Math", "Nepali", "Break", "English", "PE", "Assembly"]
    },
    "Class 3": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "Social", "PE"],
      Tuesday: ["Math", "English", "Break", "Science", "Nepali", "Computer"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Social", "Science", "PE"],
      Thursday: ["English", "Science", "Break", "Math", "Nepali", "Computer"],
      Friday: ["Math", "Nepali", "Break", "English", "Social", "PE", "Assembly"]
    },
    "Class 4": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "Social", "PE"],
      Tuesday: ["Math", "English", "Break", "Science", "Nepali", "Computer"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Social", "Science", "PE"],
      Thursday: ["English", "Science", "Break", "Math", "Nepali", "Computer"],
      Friday: ["Math", "Nepali", "Break", "English", "Social", "PE", "Assembly"]
    },
    "Class 5": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "Social", "PE"],
      Tuesday: ["Math", "English", "Break", "Science", "Nepali", "Computer", "Moral"],
      Wednesday: ["Nepali", "Math", "Break", "English", "Social", "Science", "PE"],
      Thursday: ["English", "Science", "Break", "Math", "Nepali", "Computer", "Moral"],
      Friday: ["Math", "Nepali", "Break", "English", "Social", "PE", "Assembly"]
    },
    "Class 6": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "Social", "PE"],
      Tuesday: ["Math", "English", "Break", "Science", "Nepali", "Computer", "Moral"],
      Wednesday: ["Nepali", "Opt Math", "Break", "English", "Social", "Science", "PE"],
      Thursday: ["English", "Science", "Break", "Math", "Nepali", "Computer", "Moral"],
      Friday: ["Math", "Nepali", "Break", "English", "Social", "PE", "Assembly"]
    },
    "Class 7": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "Social", "PE"],
      Tuesday: ["Math", "English", "Break", "Science", "Nepali", "Computer", "Moral"],
      Wednesday: ["Nepali", "Opt Math", "Break", "English", "Social", "Science", "PE"],
      Thursday: ["English", "Science", "Break", "Math", "Nepali", "Computer", "Moral"],
      Friday: ["Math", "Nepali", "Break", "English", "Social", "PE", "Assembly"]
    },
    "Class 8": {
      Monday: ["English", "Nepali", "Break", "Math", "Science", "Social", "PE"],
      Tuesday: ["Math", "English", "Break", "Science", "Nepali", "Computer", "Accounts"],
      Wednesday: ["Nepali", "Opt Math", "Break", "English", "Social", "Science", "PE"],
      Thursday: ["English", "Science", "Break", "Math", "Nepali", "Computer", "Moral"],
      Friday: ["Math", "Nepali", "Break", "English", "Social", "PE", "Assembly"]
    }
  };

  const toggleClassExpansion = (className) => {
    setExpandedClasses(prev => ({
      ...prev,
      [className]: !prev[className]
    }));
  };

  const getSubjectColor = (subject) => {
    const colors = {
      "English": "bg-blue-100 text-blue-800",
      "Nepali": "bg-green-100 text-green-800",
      "Math": "bg-purple-100 text-purple-800",
      "Science": "bg-orange-100 text-orange-800",
      "Social": "bg-cyan-100 text-cyan-800",
      "PE": "bg-red-100 text-red-800",
      "Computer": "bg-gray-100 text-gray-800",
      "Break": "bg-yellow-100 text-yellow-800",
      "Assembly": "bg-indigo-100 text-indigo-800",
      "Drawing": "bg-pink-100 text-pink-800",
      "Art": "bg-rose-100 text-rose-800",
      "GK": "bg-teal-100 text-teal-800",
      "Moral": "bg-violet-100 text-violet-800",
      "Opt Math": "bg-amber-100 text-amber-800",
      "Accounts": "bg-emerald-100 text-emerald-800",
      "Play Time": "bg-lime-100 text-lime-800",
      "Story Time": "bg-sky-100 text-sky-800",
      "Free Play": "bg-fuchsia-100 text-fuchsia-800",
      "Music": "bg-stone-100 text-stone-800",
      "Games": "bg-zinc-100 text-zinc-800"
    };
    return colors[subject] || "bg-slate-100 text-slate-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/primary">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Primary Level
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              Primary Schedule Overview
            </h1>
            <p className="text-muted-foreground">
              Complete schedule view for all primary classes (PG - Class 8)
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Link href="/admin/courses/primary/schedule/manage">
            <Button className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Manage Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <School className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{primaryClasses.length}</p>
            <p className="text-sm text-muted-foreground">Total Classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">School Days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">Time Slots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">420</p>
            <p className="text-sm text-muted-foreground">Total Periods</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Day Selection */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Select Day:</span>
                </div>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="ml-auto">
                  {selectedDay} Schedule
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Daily Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedDay} - All Classes Schedule</span>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Day
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-3 bg-muted font-medium text-left sticky left-0 z-10">Time</th>
                      {primaryClasses.map((className) => (
                        <th key={className} className="border p-3 bg-muted font-medium text-center min-w-[120px]">
                          {className}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot, index) => (
                      <tr key={slot.time}>
                        <td className="border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">{slot.time}</span>
                            {slot.isBreak && (
                              <Badge variant="secondary" className="text-xs mt-1 w-fit">
                                Break Time
                              </Badge>
                            )}
                          </div>
                        </td>
                        {primaryClasses.map((className) => {
                          const routine = weeklyRoutine[className];
                          const subject = routine[selectedDay]?.[index] || "-";
                          return (
                            <td key={className} className="border p-3 text-center">
                              <Badge
                                variant="outline"
                                className={`text-xs ${getSubjectColor(subject)}`}
                              >
                                {subject}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          {/* Weekly Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {primaryClasses.map((className) => (
              <Card key={className} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{className}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleClassExpansion(className)}
                      >
                        {expandedClasses[className] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      <Link href={`/admin/courses/primary/classes/${className.toLowerCase().replace(' ', '')}/routine`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {expandedClasses[className] ? (
                    // Expanded view - show full weekly schedule
                    <div className="space-y-3">
                      {days.map((day) => (
                        <div key={day} className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2 text-sm">{day}</h4>
                          <div className="grid grid-cols-3 gap-1">
                            {weeklyRoutine[className][day]?.map((subject, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className={`text-xs ${getSubjectColor(subject)}`}
                              >
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Collapsed view - show summary
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Periods:</span>
                          <span className="font-medium ml-2">
                            {weeklyRoutine[className].Monday?.length * 5 || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Daily Periods:</span>
                          <span className="font-medium ml-2">
                            {weeklyRoutine[className].Monday?.length || 0}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Common Subjects:</p>
                        <div className="flex flex-wrap gap-1">
                          {[...new Set(
                            Object.values(weeklyRoutine[className] || {})
                              .flat()
                              .filter(subject => subject !== "Break")
                          )].slice(0, 4).map((subject, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/admin/courses/primary/classes/${className.toLowerCase().replace(' ', '')}`}>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit Schedule
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {days.map((day) => (
                  <div key={day} className="text-center p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">{day}</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {primaryClasses.length * (timeSlots.length - 1)}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Periods</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">
                          {primaryClasses.length}
                        </p>
                        <p className="text-xs text-muted-foreground">Classes Active</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
