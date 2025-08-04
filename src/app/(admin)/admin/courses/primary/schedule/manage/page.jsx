"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Save,
  School,
  Settings,
  Plus,
  Trash2,
  Copy,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ManageSchedule() {
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const primaryClasses = [
    "PG", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timeSlots = [
    "9:00-9:45", "9:45-10:30", "10:30-10:45", "10:45-11:30", "11:30-12:15", "12:15-1:00", "1:00-1:45"
  ];

  const availableSubjects = [
    "English", "Nepali", "Math", "Science", "Social", "PE", "Computer", "Art", "Music", "Moral", "GK", "Drawing", "Break", "Assembly"
  ];

  const [currentSchedule, setCurrentSchedule] = useState([
    "English", "Nepali", "Break", "Math", "Science", "PE"
  ]);

  const handleSubjectChange = (index, newSubject) => {
    const updated = [...currentSchedule];
    updated[index] = newSubject;
    setCurrentSchedule(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Schedule updated for ${selectedClass} - ${selectedDay}`);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save schedule");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopySchedule = () => {
    toast.success("Schedule copied to clipboard");
  };

  const handleResetSchedule = () => {
    setCurrentSchedule(["English", "Nepali", "Break", "Math", "Science", "PE"]);
    toast.info("Schedule reset to default");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/primary/schedule">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Schedule
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Settings className="w-8 h-8 text-green-600" />
              Manage Primary Schedule
            </h1>
            <p className="text-muted-foreground">
              Edit and manage schedules for all primary classes
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopySchedule}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetSchedule}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class and Day</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="class-select">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {primaryClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="day-select">Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{selectedClass} - {selectedDay} Schedule</span>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Schedule
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSlots.map((timeSlot, index) => (
              <div key={timeSlot} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-24 text-sm font-medium">
                  {timeSlot}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <Select 
                      value={currentSchedule[index] || ""} 
                      onValueChange={(value) => handleSubjectChange(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge 
                      variant="outline" 
                      className={`${getSubjectColor(currentSchedule[index] || "")}`}
                    >
                      {currentSchedule[index] || "Not Set"}
                    </Badge>
                  )}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bulk Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Copy className="w-4 h-4 mr-2" />
              Copy to All Days
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <School className="w-4 h-4 mr-2" />
              Apply to Similar Classes
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Generate Weekly Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Load Kindergarten Template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Load Primary Template
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Load Upper Primary Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">6</p>
              <p className="text-sm text-muted-foreground">Periods Today</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">30</p>
              <p className="text-sm text-muted-foreground">Weekly Periods</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getSubjectColor(subject) {
  const colors = {
    "English": "bg-blue-100 text-blue-800",
    "Nepali": "bg-green-100 text-green-800",
    "Math": "bg-purple-100 text-purple-800",
    "Science": "bg-orange-100 text-orange-800",
    "Social": "bg-cyan-100 text-cyan-800",
    "PE": "bg-red-100 text-red-800",
    "Computer": "bg-gray-100 text-gray-800",
    "Break": "bg-yellow-100 text-yellow-800",
    "Assembly": "bg-indigo-100 text-indigo-800"
  };
  return colors[subject] || "bg-slate-100 text-slate-800";
}
