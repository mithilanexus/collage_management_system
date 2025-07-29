"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  BookOpen,
  Clock,
  Users,
  GraduationCap,
  Calendar,
  Award
} from "lucide-react";

// Mock data for courses (Nepali college system)
const mockCourses = [
  {
    id: 1,
    courseCode: "ENG101",
    courseName: "English Language and Literature",
    program: "Bachelor of Arts (BA)",
    level: "Bachelor",
    semester: "First Semester",
    credits: 3,
    duration: "4 months",
    instructor: "Dr. Ram Prasad Sharma",
    enrolledStudents: 45,
    maxCapacity: 50,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    classroom: "Room 101, Arts Building",
    description: "Comprehensive study of English language, grammar, and literature including Nepali and international authors.",
    prerequisites: "SLC/SEE Pass",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-05-15",
    examDate: "2024-05-20",
    passingMarks: 40,
    fullMarks: 100
  },
  {
    id: 2,
    courseCode: "MTH201",
    courseName: "Mathematics II",
    program: "Bachelor of Science (BSc)",
    level: "Bachelor",
    semester: "Second Semester",
    credits: 4,
    duration: "4 months",
    instructor: "Mrs. Gita Poudel",
    enrolledStudents: 38,
    maxCapacity: 40,
    schedule: "Tue, Thu, Sat - 10:00 AM",
    classroom: "Room 205, Science Building",
    description: "Advanced mathematics including calculus, algebra, and statistical analysis for science students.",
    prerequisites: "Mathematics I",
    status: "Active",
    startDate: "2024-02-01",
    endDate: "2024-06-01",
    examDate: "2024-06-05",
    passingMarks: 40,
    fullMarks: 100
  },
  {
    id: 3,
    courseCode: "NEP101",
    courseName: "Nepali Language and Literature",
    program: "Bachelor of Arts (BA)",
    level: "Bachelor",
    semester: "First Semester",
    credits: 3,
    duration: "4 months",
    instructor: "Hari Bahadur Tamang",
    enrolledStudents: 42,
    maxCapacity: 45,
    schedule: "Mon, Wed, Fri - 11:00 AM",
    classroom: "Room 102, Arts Building",
    description: "Study of Nepali language, grammar, poetry, and prose literature from classical to modern periods.",
    prerequisites: "SLC/SEE Pass",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-05-15",
    examDate: "2024-05-22",
    passingMarks: 40,
    fullMarks: 100
  },
  {
    id: 4,
    courseCode: "PHY301",
    courseName: "Physics III",
    program: "Bachelor of Science (BSc)",
    level: "Bachelor",
    semester: "Third Semester",
    credits: 4,
    duration: "4 months",
    instructor: "Dr. Sunita Rai",
    enrolledStudents: 25,
    maxCapacity: 30,
    schedule: "Mon, Wed, Fri - 2:00 PM",
    classroom: "Physics Lab, Science Building",
    description: "Advanced physics concepts including quantum mechanics, thermodynamics, and modern physics.",
    prerequisites: "Physics I, Physics II",
    status: "Active",
    startDate: "2024-01-20",
    endDate: "2024-05-20",
    examDate: "2024-05-25",
    passingMarks: 40,
    fullMarks: 100
  }
];

export default function CoursesManagement() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (course) => {
    setSelectedCourse(course);
  };

  const handleEdit = (courseId) => {
    window.location.href = `/admin/courses/${courseId}/edit`;
  };

  const handleDelete = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Courses Management</h1>
          <p className="text-muted-foreground">Manage academic courses and programs</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/courses/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Course
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by course name, code, program or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(c => c.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Courses</div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Courses List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Course</th>
                  <th className="text-left p-4">Program</th>
                  <th className="text-left p-4">Instructor</th>
                  <th className="text-left p-4">Enrollment</th>
                  <th className="text-left p-4">Schedule</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{course.courseName}</div>
                        <div className="text-sm text-muted-foreground">{course.courseCode} • {course.credits} Credits</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{course.program}</div>
                        <div className="text-sm text-muted-foreground">{course.semester}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{course.instructor}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-medium">{course.enrolledStudents}/{course.maxCapacity}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-sm font-medium">{course.schedule}</div>
                        <div className="text-sm text-muted-foreground">{course.classroom}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(course)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(course.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(course.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Course Name</label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.courseName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Course Code</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedCourse.courseCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Credits</label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.credits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Program</label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Semester</label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.semester}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.duration}</p>
                </div>
              </div>

              {/* Schedule & Location */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Schedule & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Schedule</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.schedule}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Classroom</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.classroom}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Enrollment & Assessment */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Enrollment & Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Enrolled Students</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.enrolledStudents} / {selectedCourse.maxCapacity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Instructor</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Marks</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.fullMarks}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Passing Marks</label>
                    <p className="text-sm text-muted-foreground">{selectedCourse.passingMarks}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Course Description</h3>
                <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedCourse.id)}>
                  Edit Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
