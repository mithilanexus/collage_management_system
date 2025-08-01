"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  FileText,
  Video,
  Users
} from "lucide-react";

const mockCourses = [
  {
    id: 1,
    code: "CS-301",
    name: "Database Systems",
    instructor: "Dr. Rajesh Sharma",
    credits: 3,
    semester: "Fall 2024",
    schedule: "Mon, Wed, Fri 10:00-11:00 AM",
    room: "Room 205, IT Block",
    progress: 85,
    grade: "A-",
    status: "In Progress",
    description: "Introduction to database design, SQL, and database management systems.",
    assignments: 8,
    completedAssignments: 7,
    nextClass: "Monday, 10:00 AM",
    materials: ["Lecture Notes", "Lab Manual", "Reference Books"],
    announcements: 3
  },
  {
    id: 2,
    code: "CS-350",
    name: "Web Development",
    instructor: "Prof. Sita Poudel",
    credits: 4,
    semester: "Fall 2024",
    schedule: "Tue, Thu 2:00-4:00 PM",
    room: "Lab 101, IT Block",
    progress: 78,
    grade: "B+",
    status: "In Progress",
    description: "Modern web development using HTML, CSS, JavaScript, and frameworks.",
    assignments: 6,
    completedAssignments: 5,
    nextClass: "Tuesday, 2:00 PM",
    materials: ["Project Guidelines", "Code Examples", "Online Resources"],
    announcements: 2
  },
  {
    id: 3,
    code: "MATH-250",
    name: "Statistics for Computer Science",
    instructor: "Dr. Krishna Adhikari",
    credits: 3,
    semester: "Fall 2024",
    schedule: "Mon, Wed 9:00-10:30 AM",
    room: "Room 301, Science Block",
    progress: 92,
    grade: "A",
    status: "In Progress",
    description: "Statistical methods and probability theory for computer science applications.",
    assignments: 5,
    completedAssignments: 5,
    nextClass: "Wednesday, 9:00 AM",
    materials: ["Statistical Tables", "Problem Sets", "Software Tools"],
    announcements: 1
  },
  {
    id: 4,
    code: "ENG-201",
    name: "Technical Writing",
    instructor: "Prof. Maya Gurung",
    credits: 2,
    semester: "Fall 2024",
    schedule: "Thu 1:00-3:00 PM",
    room: "Room 105, Arts Block",
    progress: 70,
    grade: "B",
    status: "In Progress",
    description: "Professional and technical communication skills for IT professionals.",
    assignments: 4,
    completedAssignments: 3,
    nextClass: "Thursday, 1:00 PM",
    materials: ["Writing Handbook", "Sample Documents", "Style Guide"],
    announcements: 1
  }
];

export default function MyCoursesPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "high-progress" && course.progress >= 80) ||
                         (filter === "needs-attention" && course.progress < 80);
    
    return matchesSearch && matchesFilter;
  });

  const toggleExpanded = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const averageProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">Fall 2024 Semester</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Total Credits: {totalCredits}</span>
          <span>•</span>
          <span>Average Progress: {averageProgress}%</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Enrolled Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalCredits}</div>
            <div className="text-sm text-muted-foreground">Total Credits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{averageProgress}%</div>
            <div className="text-sm text-muted-foreground">Avg Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {courses.reduce((sum, course) => sum + course.completedAssignments, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Assignments Done</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Courses
          </Button>
          <Button 
            size="sm" 
            variant={filter === "high-progress" ? "default" : "outline"}
            onClick={() => setFilter("high-progress")}
          >
            High Progress
          </Button>
          <Button 
            size="sm" 
            variant={filter === "needs-attention" ? "default" : "outline"}
            onClick={() => setFilter("needs-attention")}
          >
            Needs Attention
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

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{course.code} - {course.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.progress >= 80 ? "bg-green-100 text-green-800" : 
                        course.progress >= 60 ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {course.grade}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{course.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-muted-foreground" />
                        <span>{course.credits} Credits</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(course.id)}
                    className="ml-4"
                  >
                    {expandedCourse === course.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Next Class: {course.nextClass}</span>
                  <span>Assignments: {course.completedAssignments}/{course.assignments}</span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedCourse === course.id && (
                <div className="border-t bg-muted/30 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Course Materials
                      </h4>
                      <ul className="space-y-2">
                        {course.materials.map((material, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Class Info
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Semester: {course.semester}</p>
                        <p>Status: {course.status}</p>
                        <p>Announcements: {course.announcements} new</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <Video className="w-4 h-4 mr-2" />
                          Join Virtual Class
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          View Materials
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
