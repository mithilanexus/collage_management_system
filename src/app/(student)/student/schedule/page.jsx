"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Bell
} from "lucide-react";

const mockSchedule = {
  "Monday": [
    { time: "9:00-10:30", course: "MATH-250", name: "Statistics", instructor: "Dr. Krishna Adhikari", room: "Room 301", type: "Lecture" },
    { time: "10:00-11:00", course: "CS-301", name: "Database Systems", instructor: "Dr. Rajesh Sharma", room: "Room 205", type: "Lecture" },
    { time: "2:00-4:00", course: "CS-350", name: "Web Development Lab", instructor: "Prof. Sita Poudel", room: "Lab 101", type: "Lab" }
  ],
  "Tuesday": [
    { time: "2:00-4:00", course: "CS-350", name: "Web Development", instructor: "Prof. Sita Poudel", room: "Lab 101", type: "Lecture" },
    { time: "4:00-5:00", course: "ENG-201", name: "Technical Writing", instructor: "Prof. Maya Gurung", room: "Room 105", type: "Tutorial" }
  ],
  "Wednesday": [
    { time: "9:00-10:30", course: "MATH-250", name: "Statistics", instructor: "Dr. Krishna Adhikari", room: "Room 301", type: "Lecture" },
    { time: "10:00-11:00", course: "CS-301", name: "Database Systems", instructor: "Dr. Rajesh Sharma", room: "Room 205", type: "Lecture" },
    { time: "11:00-12:00", course: "CS-301", name: "Database Lab", instructor: "Dr. Rajesh Sharma", room: "Lab 205", type: "Lab" }
  ],
  "Thursday": [
    { time: "1:00-3:00", course: "ENG-201", name: "Technical Writing", instructor: "Prof. Maya Gurung", room: "Room 105", type: "Lecture" },
    { time: "2:00-4:00", course: "CS-350", name: "Web Development", instructor: "Prof. Sita Poudel", room: "Lab 101", type: "Lecture" }
  ],
  "Friday": [
    { time: "10:00-11:00", course: "CS-301", name: "Database Systems", instructor: "Dr. Rajesh Sharma", room: "Room 205", type: "Lecture" },
    { time: "11:00-12:00", course: "MATH-250", name: "Statistics Tutorial", instructor: "Dr. Krishna Adhikari", room: "Room 301", type: "Tutorial" }
  ],
  "Saturday": [],
  "Sunday": []
};

const timeSlots = [
  "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ClassSchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [viewMode, setViewMode] = useState("week"); // week or day
  const [selectedDay, setSelectedDay] = useState("Monday");

  const getTypeColor = (type) => {
    switch (type) {
      case "Lecture": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Lab": return "bg-green-100 text-green-800 border-green-200";
      case "Tutorial": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1 + (currentWeek * 7));
    
    return days.map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();
  const todayClasses = mockSchedule[days[new Date().getDay() - 1]] || [];
  const totalClassesToday = todayClasses.length;
  const totalClassesWeek = Object.values(mockSchedule).flat().length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Class Schedule</h1>
          <p className="text-muted-foreground">Fall 2024 Semester</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Schedule
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Set Reminders
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalClassesToday}</div>
            <div className="text-sm text-muted-foreground">Classes Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalClassesWeek}</div>
            <div className="text-sm text-muted-foreground">Classes This Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-muted-foreground">Active Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">18</div>
            <div className="text-sm text-muted-foreground">Hours/Week</div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle and Week Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => setViewMode("week")}
          >
            Week View
          </Button>
          <Button 
            size="sm" 
            variant={viewMode === "day" ? "default" : "outline"}
            onClick={() => setViewMode("day")}
          >
            Day View
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setCurrentWeek(currentWeek - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-4">
            {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
          </span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setCurrentWeek(currentWeek + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Week View */}
      {viewMode === "week" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
                  {days.map((day, index) => (
                    <div key={day} className="p-2 text-center">
                      <div className="text-sm font-medium">{day}</div>
                      <div className="text-xs text-muted-foreground">
                        {weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Schedule Grid */}
                <div className="space-y-2">
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-2">
                      <div className="p-2 text-sm text-muted-foreground font-medium">
                        {time}:00
                      </div>
                      {days.map((day) => {
                        const dayClasses = mockSchedule[day] || [];
                        const classAtTime = dayClasses.find(cls => 
                          cls.time.startsWith(time) || 
                          (parseInt(cls.time.split(':')[0]) <= parseInt(time) && 
                           parseInt(cls.time.split('-')[1].split(':')[0]) > parseInt(time))
                        );
                        
                        return (
                          <div key={`${day}-${time}`} className="min-h-[60px] p-1">
                            {classAtTime && (
                              <div className={`p-2 rounded-lg border text-xs ${getTypeColor(classAtTime.type)}`}>
                                <div className="font-medium">{classAtTime.course}</div>
                                <div className="truncate">{classAtTime.name}</div>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate">{classAtTime.room}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day View */}
      {viewMode === "day" && (
        <div className="space-y-4">
          {/* Day Selection */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((day, index) => (
              <Button
                key={day}
                size="sm"
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
                className="whitespace-nowrap"
              >
                {day}
                <span className="ml-2 text-xs">
                  {weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </Button>
            ))}
          </div>

          {/* Day Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {selectedDay} Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockSchedule[selectedDay].length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No classes scheduled for {selectedDay}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockSchedule[selectedDay].map((classItem, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">{classItem.course} - {classItem.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                              {classItem.type}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{classItem.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{classItem.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{classItem.room}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Today's Classes (if today is in current week) */}
      {currentWeek === 0 && todayClasses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayClasses.map((classItem, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{classItem.course}</h4>
                    <span className="text-sm text-muted-foreground">{classItem.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{classItem.name}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>{classItem.instructor}</span>
                    <span>{classItem.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
