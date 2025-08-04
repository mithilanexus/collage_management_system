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
  Printer
} from "lucide-react";
import Link from "next/link";

export default function PrimaryRoutine() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [activeTab, setActiveTab] = useState("weekly"); 

  const primaryClasses = [
    "PG", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"
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

  const timeSlots = [
    "9:00-9:45", "9:45-10:30", "10:30-10:45", "10:45-11:30", "11:30-12:15", "12:15-1:00", "1:00-1:45"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getRoutineForClass = (className) => {
    return weeklyRoutine[className] || weeklyRoutine["Class 1"];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
              Primary Level Routine
            </h1>
            <p className="text-muted-foreground">
              Weekly schedules for all primary classes (PG, Nursery, LKG, UKG, Class 1-8)
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Routine
          </Button>
        </div>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Select Class:</span>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {primaryClasses.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Routine Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          {selectedClass === "all" ? (
            // Show all classes routine
            <div className="space-y-6">
              {primaryClasses.map((className) => (
                <Card key={className}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{className} Weekly Routine</span>
                      <div className="flex gap-2">
                        <Link href={`/admin/courses/primary/${className.toLowerCase().replace(' ', '')}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border p-2 bg-muted font-medium text-left">Time</th>
                            {days.map((day) => (
                              <th key={day} className="border p-2 bg-muted font-medium text-center">
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {timeSlots.map((time, index) => (
                            <tr key={time}>
                              <td className="border p-2 font-medium bg-muted/50">{time}</td>
                              {days.map((day) => {
                                const routine = getRoutineForClass(className);
                                const subject = routine[day]?.[index] || "-";
                                const isBreak = subject === "Break";
                                return (
                                  <td key={day} className="border p-2 text-center">
                                    <Badge 
                                      variant={isBreak ? "secondary" : "outline"}
                                      className={`text-xs ${isBreak ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}
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
              ))}
            </div>
          ) : (
            // Show specific class routine
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedClass} Weekly Routine</span>
                  <div className="flex gap-2">
                    <Link href={`/admin/courses/primary/${selectedClass.toLowerCase().replace(' ', '')}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Detailed View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Routine
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-3 bg-muted font-medium text-left">Time Slot</th>
                        {days.map((day) => (
                          <th key={day} className="border p-3 bg-muted font-medium text-center">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time, index) => (
                        <tr key={time}>
                          <td className="border p-3 font-medium bg-muted/50">{time}</td>
                          {days.map((day) => {
                            const routine = getRoutineForClass(selectedClass);
                            const subject = routine[day]?.[index] || "-";
                            const isBreak = subject === "Break";
                            return (
                              <td key={day} className="border p-3 text-center">
                                <Badge 
                                  variant={isBreak ? "secondary" : "outline"}
                                  className={`text-sm ${isBreak ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}
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
          )}
        </TabsContent>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map((day) => (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    {day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedClass === "all" ? (
                      // Show all classes for this day
                      primaryClasses.slice(0, 3).map((className) => {
                        const routine = getRoutineForClass(className);
                        return (
                          <div key={className} className="p-3 border rounded-lg">
                            <h4 className="font-medium mb-2">{className}</h4>
                            <div className="space-y-1">
                              {routine[day]?.slice(0, 4).map((subject, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{timeSlots[index]}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {subject}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // Show specific class schedule for this day
                      <div className="space-y-2">
                        {getRoutineForClass(selectedClass)[day]?.map((subject, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border rounded">
                            <span className="font-medium">{timeSlots[index]}</span>
                            <Badge 
                              variant={subject === "Break" ? "secondary" : "outline"}
                              className={subject === "Break" ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}
                            >
                              {subject}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
