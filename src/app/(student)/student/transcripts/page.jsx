"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Eye,
  GraduationCap,
  Calendar,
  Award,
  TrendingUp,
  Printer
} from "lucide-react";

const mockTranscriptData = {
  studentInfo: {
    name: "Anil Kumar Shrestha",
    studentId: "STU2024001",
    program: "Bachelor of Computer Science",
    admissionDate: "2021-07-15",
    expectedGraduation: "2025-06-30",
    currentSemester: "7th Semester"
  },
  academicSummary: {
    totalCreditsEarned: 89,
    totalCreditsRequired: 120,
    cumulativeGPA: 3.72,
    classRank: 5,
    totalStudents: 45
  },
  semesterRecords: [
    {
      semester: "Fall 2024",
      year: "2024",
      courses: [
        { code: "CS-401", name: "Software Engineering", credits: 4, grade: "A", gpa: 4.0, points: 16.0 },
        { code: "CS-450", name: "Machine Learning", credits: 3, grade: "A-", gpa: 3.7, points: 11.1 },
        { code: "MATH-301", name: "Linear Algebra", credits: 3, grade: "B+", gpa: 3.3, points: 9.9 },
        { code: "ENG-301", name: "Technical Communication", credits: 2, grade: "A", gpa: 4.0, points: 8.0 }
      ],
      semesterGPA: 3.75,
      totalCredits: 12,
      totalPoints: 45.0,
      status: "In Progress"
    },
    {
      semester: "Spring 2024",
      year: "2024",
      courses: [
        { code: "CS-301", name: "Database Systems", credits: 4, grade: "A-", gpa: 3.7, points: 14.8 },
        { code: "CS-350", name: "Web Development", credits: 3, grade: "B+", gpa: 3.3, points: 9.9 },
        { code: "MATH-250", name: "Statistics", credits: 3, grade: "A", gpa: 4.0, points: 12.0 },
        { code: "ENG-201", name: "Technical Writing", credits: 2, grade: "B", gpa: 3.0, points: 6.0 }
      ],
      semesterGPA: 3.56,
      totalCredits: 12,
      totalPoints: 42.7,
      status: "Completed"
    },
    {
      semester: "Fall 2023",
      year: "2023",
      courses: [
        { code: "CS-201", name: "Data Structures", credits: 4, grade: "A", gpa: 4.0, points: 16.0 },
        { code: "CS-250", name: "Computer Networks", credits: 3, grade: "A-", gpa: 3.7, points: 11.1 },
        { code: "MATH-201", name: "Discrete Mathematics", credits: 3, grade: "B+", gpa: 3.3, points: 9.9 },
        { code: "PHY-101", name: "Physics", credits: 3, grade: "B", gpa: 3.0, points: 9.0 }
      ],
      semesterGPA: 3.54,
      totalCredits: 13,
      totalPoints: 46.0,
      status: "Completed"
    }
  ]
};

export default function TranscriptsPage() {
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [showOfficialTranscript, setShowOfficialTranscript] = useState(false);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "A-": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "B+": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300";
      case "B": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const filteredSemesters = selectedSemester === "all" 
    ? mockTranscriptData.semesterRecords 
    : mockTranscriptData.semesterRecords.filter(sem => sem.semester === selectedSemester);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Academic Transcripts</h1>
          <p className="text-muted-foreground">Official academic records and transcripts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Official
          </Button>
        </div>
      </div>

      {/* Student Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Student Name</label>
              <p className="font-semibold">{mockTranscriptData.studentInfo.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Student ID</label>
              <p className="font-semibold">{mockTranscriptData.studentInfo.studentId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Program</label>
              <p className="font-semibold">{mockTranscriptData.studentInfo.program}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Admission Date</label>
              <p className="font-semibold">{mockTranscriptData.studentInfo.admissionDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Expected Graduation</label>
              <p className="font-semibold">{mockTranscriptData.studentInfo.expectedGraduation}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Semester</label>
              <p className="font-semibold">{mockTranscriptData.studentInfo.currentSemester}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockTranscriptData.academicSummary.cumulativeGPA}</div>
            <div className="text-sm text-muted-foreground">Cumulative GPA</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{mockTranscriptData.academicSummary.totalCreditsEarned}</div>
            <div className="text-sm text-muted-foreground">Credits Earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockTranscriptData.academicSummary.totalCreditsRequired}</div>
            <div className="text-sm text-muted-foreground">Credits Required</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{mockTranscriptData.academicSummary.classRank}</div>
            <div className="text-sm text-muted-foreground">Class Rank</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((mockTranscriptData.academicSummary.totalCreditsEarned / mockTranscriptData.academicSummary.totalCreditsRequired) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          size="sm" 
          variant={selectedSemester === "all" ? "default" : "outline"}
          onClick={() => setSelectedSemester("all")}
        >
          All Semesters
        </Button>
        {mockTranscriptData.semesterRecords.map((semester) => (
          <Button
            key={semester.semester}
            size="sm"
            variant={selectedSemester === semester.semester ? "default" : "outline"}
            onClick={() => setSelectedSemester(semester.semester)}
          >
            {semester.semester}
          </Button>
        ))}
      </div>

      {/* Semester Records */}
      <div className="space-y-6">
        {filteredSemesters.map((semester, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {semester.semester} {semester.year}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    semester.status === "Completed" ? "bg-green-100 text-green-800" : 
                    semester.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {semester.status}
                  </span>
                  <span>GPA: {semester.semesterGPA}</span>
                  <span>Credits: {semester.totalCredits}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Course Code</th>
                      <th className="text-left p-3">Course Name</th>
                      <th className="text-left p-3">Credits</th>
                      <th className="text-left p-3">Grade</th>
                      <th className="text-left p-3">GPA Points</th>
                      <th className="text-left p-3">Quality Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.courses.map((course, courseIndex) => (
                      <tr key={courseIndex} className="border-b">
                        <td className="p-3 font-medium">{course.code}</td>
                        <td className="p-3">{course.name}</td>
                        <td className="p-3">{course.credits}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </td>
                        <td className="p-3 font-medium">{course.gpa.toFixed(1)}</td>
                        <td className="p-3">{course.points.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 font-semibold bg-muted/30">
                      <td className="p-3" colSpan="2">Semester Totals</td>
                      <td className="p-3">{semester.totalCredits}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          GPA: {semester.semesterGPA}
                        </span>
                      </td>
                      <td className="p-3">-</td>
                      <td className="p-3">{semester.totalPoints.toFixed(1)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transcript Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Transcript Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="w-6 h-6" />
              <span>Request Official Transcript</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Download className="w-6 h-6" />
              <span>Download Unofficial Copy</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Award className="w-6 h-6" />
              <span>Degree Verification</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
