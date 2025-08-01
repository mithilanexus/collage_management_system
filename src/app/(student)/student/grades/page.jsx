"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Award, 
  BarChart3, 
  Download,
  Eye,
  Calendar,
  BookOpen,
  Target
} from "lucide-react";

const mockGrades = [
  {
    semester: "Fall 2024",
    courses: [
      { code: "CS-301", name: "Database Systems", credits: 3, grade: "A-", gpa: 3.7, points: 11.1 },
      { code: "CS-350", name: "Web Development", credits: 4, grade: "B+", gpa: 3.3, points: 13.2 },
      { code: "MATH-250", name: "Statistics", credits: 3, grade: "A", gpa: 4.0, points: 12.0 },
      { code: "ENG-201", name: "Technical Writing", credits: 2, grade: "B", gpa: 3.0, points: 6.0 }
    ],
    semesterGPA: 3.52,
    totalCredits: 12,
    totalPoints: 42.3
  },
  {
    semester: "Spring 2024",
    courses: [
      { code: "CS-201", name: "Data Structures", credits: 4, grade: "A", gpa: 4.0, points: 16.0 },
      { code: "CS-250", name: "Computer Networks", credits: 3, grade: "A-", gpa: 3.7, points: 11.1 },
      { code: "MATH-201", name: "Discrete Mathematics", credits: 3, grade: "B+", gpa: 3.3, points: 9.9 },
      { code: "PHY-101", name: "Physics", credits: 3, grade: "B", gpa: 3.0, points: 9.0 }
    ],
    semesterGPA: 3.54,
    totalCredits: 13,
    totalPoints: 46.0
  },
  {
    semester: "Fall 2023",
    courses: [
      { code: "CS-101", name: "Programming Fundamentals", credits: 4, grade: "A", gpa: 4.0, points: 16.0 },
      { code: "MATH-101", name: "Calculus I", credits: 4, grade: "B+", gpa: 3.3, points: 13.2 },
      { code: "ENG-101", name: "English Composition", credits: 3, grade: "A-", gpa: 3.7, points: 11.1 },
      { code: "SOC-101", name: "Sociology", credits: 2, grade: "A", gpa: 4.0, points: 8.0 }
    ],
    semesterGPA: 3.71,
    totalCredits: 13,
    totalPoints: 48.3
  }
];

export default function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState("Fall 2024");
  const [showAllSemesters, setShowAllSemesters] = useState(false);

  const currentSemester = mockGrades.find(sem => sem.semester === selectedSemester);
  const totalCreditsEarned = mockGrades.reduce((sum, sem) => sum + sem.totalCredits, 0);
  const totalQualityPoints = mockGrades.reduce((sum, sem) => sum + sem.totalPoints, 0);
  const cumulativeGPA = totalQualityPoints / totalCreditsEarned;

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "A-": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "B+": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300";
      case "B": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "B-": return "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const gradeDistribution = {
    "A": mockGrades.flatMap(sem => sem.courses).filter(course => course.grade === "A").length,
    "A-": mockGrades.flatMap(sem => sem.courses).filter(course => course.grade === "A-").length,
    "B+": mockGrades.flatMap(sem => sem.courses).filter(course => course.grade === "B+").length,
    "B": mockGrades.flatMap(sem => sem.courses).filter(course => course.grade === "B").length,
    "B-": mockGrades.flatMap(sem => sem.courses).filter(course => course.grade === "B-").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Academic Grades</h1>
          <p className="text-muted-foreground">Track your academic performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Transcript
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Grade Report
          </Button>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cumulative GPA</p>
                <p className="text-2xl font-bold text-primary">{cumulativeGPA.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Semester</p>
                <p className="text-2xl font-bold text-green-600">{currentSemester?.semesterGPA.toFixed(2)}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits Earned</p>
                <p className="text-2xl font-bold text-blue-600">{totalCreditsEarned}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quality Points</p>
                <p className="text-2xl font-bold text-orange-600">{totalQualityPoints.toFixed(1)}</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Selection */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          {mockGrades.map((semester) => (
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
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAllSemesters(!showAllSemesters)}
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          {showAllSemesters ? "Current Semester" : "All Semesters"}
        </Button>
      </div>

      {/* Current Semester Grades */}
      {!showAllSemesters && currentSemester && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {currentSemester.semester} Grades
            </CardTitle>
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
                  {currentSemester.courses.map((course, index) => (
                    <tr key={index} className="border-b">
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
                  <tr className="border-t-2 font-semibold">
                    <td className="p-3" colSpan="2">Semester Totals</td>
                    <td className="p-3">{currentSemester.totalCredits}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        GPA: {currentSemester.semesterGPA.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3">-</td>
                    <td className="p-3">{currentSemester.totalPoints.toFixed(1)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Semesters View */}
      {showAllSemesters && (
        <div className="space-y-4">
          {mockGrades.map((semester) => (
            <Card key={semester.semester}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {semester.semester}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    GPA: {semester.semesterGPA.toFixed(2)} | Credits: {semester.totalCredits}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {semester.courses.map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{course.code}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{course.name}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{course.credits} credits</span>
                        <span>{course.gpa.toFixed(1)} GPA</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Grade Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{count}</div>
                <div className={`text-sm px-2 py-1 rounded-full font-medium ${getGradeColor(grade)}`}>
                  Grade {grade}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
