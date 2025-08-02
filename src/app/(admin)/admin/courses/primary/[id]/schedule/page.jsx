"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Save,
  School,
  Clock,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ClassScheduleManagement() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [editingPeriod, setEditingPeriod] = useState(null);

  // Mock data
  const mockClassData = {
    1: { 
      grade: "Grade 1", 
      nepaliName: "कक्षा १",
      subjects: ["Nepali", "English", "Mathematics", "Science", "Social Studies", "Health & Physical Education"]
    }
  };

  const mockSchedule = {
    Sunday: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "HPE"],
    Monday: ["Math", "Nepali", "English", "Science", "Break", "Social Studies", "HPE"],
    Tuesday: ["English", "Math", "Nepali", "Science", "Break", "Social Studies", "Art"],
    Wednesday: ["Science", "Math", "English", "Nepali", "Break", "Social Studies", "HPE"],
    Thursday: ["Nepali", "English", "Math", "Science", "Break", "Social Studies", "Music"],
    Friday: ["Math", "Nepali", "English", "Science", "Break", "Social Studies", "HPE"]
  };

  const timeSlots = [
    "10:00-10:45", "10:45-11:30", "11:30-12:15", "12:15-1:00", 
    "1:00-1:45", "1:45-2:30", "2:30-3:15"
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  useEffect(() => {
    setTimeout(() => {
      const data = mockClassData[params.id];
      if (data) {
        setClassData(data);
        setSchedule(mockSchedule);
      }
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handlePeriodChange = (day, periodIndex, newSubject) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].map((period, index) => 
        index === periodIndex ? newSubject : period
      )
    }));
  };

  const addPeriod = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], "Free Period"]
    }));
  };

  const removePeriod = (day, periodIndex) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== periodIndex)
    }));
  };

  const saveSchedule = () => {
    console.log("Saving schedule:", schedule);
    toast.success("Schedule saved successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <School className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Class Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested class could not be found.</p>
          <Link href="/admin/courses/primary">
            <Button>Back to Primary Level</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/courses/primary/${params.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {classData.grade}
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              Schedule Management
            </h1>
            <p className="text-muted-foreground">
              Manage weekly schedule for {classData.grade} ({classData.nepaliName})
            </p>
          </div>
        </div>
        <Button onClick={saveSchedule} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Schedule
        </Button>
      </div>

      {/* Time Slots Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                Period {index + 1}: {slot}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted font-medium text-left min-w-[100px]">Day</th>
                  {timeSlots.map((slot, index) => (
                    <th key={index} className="border p-2 bg-muted font-medium text-center min-w-[120px]">
                      <div className="text-xs">Period {index + 1}</div>
                      <div className="text-xs text-muted-foreground">{slot}</div>
                    </th>
                  ))}
                  <th className="border p-2 bg-muted font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border p-2 font-medium bg-muted/50">{day}</td>
                    {schedule[day]?.map((period, periodIndex) => (
                      <td key={periodIndex} className="border p-1">
                        <Select
                          value={period}
                          onValueChange={(value) => handlePeriodChange(day, periodIndex, value)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Break">Break</SelectItem>
                            <SelectItem value="Free Period">Free Period</SelectItem>
                            {classData.subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    )) || <td className="border p-2 text-center text-muted-foreground" colSpan={timeSlots.length}>No schedule set</td>}
                    <td className="border p-1">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addPeriod(day)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        {schedule[day]?.length > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removePeriod(day, schedule[day].length - 1)}
                            className="h-6 w-6 p-0 text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {Object.values(schedule).reduce((total, daySchedule) => total + daySchedule.length, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Periods/Week</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {Object.values(schedule).reduce((total, daySchedule) => 
                  total + daySchedule.filter(period => classData.subjects.includes(period)).length, 0
                )}
              </p>
              <p className="text-sm text-muted-foreground">Subject Periods</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {Object.values(schedule).reduce((total, daySchedule) => 
                  total + daySchedule.filter(period => period === "Break").length, 0
                )}
              </p>
              <p className="text-sm text-muted-foreground">Break Periods</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Copy Schedule</p>
                <p className="text-sm text-muted-foreground">Copy from another class</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Edit className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Bulk Edit</p>
                <p className="text-sm text-muted-foreground">Edit multiple periods</p>
              </div>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Print Schedule</p>
                <p className="text-sm text-muted-foreground">Generate printable version</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
