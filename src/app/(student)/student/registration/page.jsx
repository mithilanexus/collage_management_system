"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Minus,
  Clock,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
  Calendar
} from "lucide-react";

const mockAvailableCourses = [
  {
    id: 1,
    code: "CS-401",
    name: "Software Engineering",
    instructor: "Dr. Amit Sharma",
    credits: 4,
    schedule: "Mon, Wed, Fri 9:00-10:30 AM",
    room: "Room 301",
    capacity: 30,
    enrolled: 25,
    prerequisites: ["CS-301", "CS-250"],
    description: "Principles and practices of software engineering including project management.",
    status: "available"
  },
  {
    id: 2,
    code: "CS-450",
    name: "Machine Learning",
    instructor: "Prof. Sunita Rai",
    credits: 3,
    schedule: "Tue, Thu 2:00-3:30 PM",
    room: "Lab 205",
    capacity: 25,
    enrolled: 24,
    prerequisites: ["MATH-250", "CS-301"],
    description: "Introduction to machine learning algorithms and applications.",
    status: "almost_full"
  },
  {
    id: 3,
    code: "CS-420",
    name: "Computer Graphics",
    instructor: "Dr. Prakash Kc",
    credits: 3,
    schedule: "Mon, Wed 2:00-3:30 PM",
    room: "Lab 301",
    capacity: 20,
    enrolled: 20,
    prerequisites: ["MATH-201", "CS-201"],
    description: "Fundamentals of computer graphics and visualization.",
    status: "full"
  },
  {
    id: 4,
    code: "MATH-301",
    name: "Linear Algebra",
    instructor: "Dr. Gita Poudel",
    credits: 3,
    schedule: "Tue, Thu 10:00-11:30 AM",
    room: "Room 205",
    capacity: 35,
    enrolled: 18,
    prerequisites: ["MATH-201"],
    description: "Vector spaces, matrices, and linear transformations.",
    status: "available"
  }
];

export default function CourseRegistrationPage() {
  const [availableCourses, setAvailableCourses] = useState(mockAvailableCourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "available" && course.status === "available") ||
                         (filter === "almost_full" && course.status === "almost_full");
    
    return matchesSearch && matchesFilter;
  });

  const addCourse = (course) => {
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId));
  };

  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
  const maxCredits = 18;

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "almost_full": return "bg-yellow-100 text-yellow-800";
      case "full": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available": return "Available";
      case "almost_full": return "Almost Full";
      case "full": return "Full";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Course Registration</h1>
          <p className="text-muted-foreground">Spring 2025 Semester</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Registration Period</p>
          <p className="font-medium">Dec 15, 2024 - Jan 15, 2025</p>
        </div>
      </div>

      {/* Registration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{selectedCourses.length}</div>
            <div className="text-sm text-muted-foreground">Selected Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${totalCredits > maxCredits ? 'text-red-600' : 'text-green-600'}`}>
              {totalCredits}
            </div>
            <div className="text-sm text-muted-foreground">Total Credits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{maxCredits}</div>
            <div className="text-sm text-muted-foreground">Max Credits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{availableCourses.filter(c => c.status === 'available').length}</div>
            <div className="text-sm text-muted-foreground">Available Courses</div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Warning */}
      {totalCredits > maxCredits && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Credit Limit Exceeded</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              You have selected {totalCredits} credits, which exceeds the maximum limit of {maxCredits} credits.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Courses */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === "available" ? "default" : "outline"}
                    onClick={() => setFilter("available")}
                  >
                    Available
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === "almost_full" ? "default" : "outline"}
                    onClick={() => setFilter("almost_full")}
                  >
                    Almost Full
                  </Button>
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">{course.code} - {course.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                            {getStatusText(course.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{course.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{course.room}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{course.enrolled}/{course.capacity} enrolled</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{course.credits} credits</span>
                          </div>
                        </div>
                        
                        {course.prerequisites.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">
                              Prerequisites: {course.prerequisites.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => addCourse(course)}
                        disabled={course.status === "full" || selectedCourses.find(c => c.id === course.id)}
                        className="ml-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {selectedCourses.find(c => c.id === course.id) ? "Added" : "Add"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Courses */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCourses.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No courses selected</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedCourses.map((course) => (
                    <div key={course.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{course.code}</h4>
                          <p className="text-xs text-muted-foreground">{course.name}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCourse(course.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>{course.credits} credits</p>
                        <p>{course.schedule}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Credits:</span>
                      <span className={totalCredits > maxCredits ? 'text-red-600' : 'text-green-600'}>
                        {totalCredits}/{maxCredits}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    disabled={selectedCourses.length === 0 || totalCredits > maxCredits}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Register for Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
