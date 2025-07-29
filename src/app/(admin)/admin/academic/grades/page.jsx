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
  GraduationCap,
  TrendingUp,
  Award,
  FileText,
  Download,
  Upload,
  Calculator
} from "lucide-react";

// Mock data for grades (Nepali college system)
const mockGrades = [
  {
    id: 1,
    studentId: "STU2024001",
    studentName: "Anil Shrestha",
    class: "Grade 12",
    section: "A",
    rollNumber: "15",
    semester: "First Semester",
    academicYear: "2023-2024",
    subjects: [
      { code: "ENG101", name: "English", fullMarks: 100, obtainedMarks: 85, grade: "A", gpa: 3.8 },
      { code: "NEP101", name: "Nepali", fullMarks: 100, obtainedMarks: 78, grade: "B+", gpa: 3.3 },
      { code: "MTH101", name: "Mathematics", fullMarks: 100, obtainedMarks: 92, grade: "A+", gpa: 4.0 },
      { code: "SCI101", name: "Science", fullMarks: 100, obtainedMarks: 88, grade: "A", gpa: 3.8 },
      { code: "SOC101", name: "Social Studies", fullMarks: 100, obtainedMarks: 82, grade: "A-", gpa: 3.7 }
    ],
    totalMarks: 500,
    obtainedMarks: 425,
    percentage: 85.0,
    gpa: 3.72,
    grade: "A",
    rank: 3,
    status: "Pass",
    examDate: "2024-05-15",
    resultDate: "2024-06-01"
  },
  {
    id: 2,
    studentId: "STU2024002",
    studentName: "Priya Poudel",
    class: "Grade 11",
    section: "A",
    rollNumber: "08",
    semester: "First Semester",
    academicYear: "2023-2024",
    subjects: [
      { code: "ENG101", name: "English", fullMarks: 100, obtainedMarks: 95, grade: "A+", gpa: 4.0 },
      { code: "NEP101", name: "Nepali", fullMarks: 100, obtainedMarks: 89, grade: "A", gpa: 3.8 },
      { code: "MTH101", name: "Mathematics", fullMarks: 100, obtainedMarks: 96, grade: "A+", gpa: 4.0 },
      { code: "SCI101", name: "Science", fullMarks: 100, obtainedMarks: 91, grade: "A+", gpa: 4.0 },
      { code: "SOC101", name: "Social Studies", fullMarks: 100, obtainedMarks: 87, grade: "A", gpa: 3.8 }
    ],
    totalMarks: 500,
    obtainedMarks: 458,
    percentage: 91.6,
    gpa: 3.92,
    grade: "A+",
    rank: 1,
    status: "Pass",
    examDate: "2024-05-15",
    resultDate: "2024-06-01"
  },
  {
    id: 3,
    studentId: "STU2024003",
    studentName: "Rajesh Gurung",
    class: "Grade 10",
    section: "B",
    rollNumber: "12",
    semester: "First Semester",
    academicYear: "2023-2024",
    subjects: [
      { code: "ENG101", name: "English", fullMarks: 100, obtainedMarks: 72, grade: "B", gpa: 3.0 },
      { code: "NEP101", name: "Nepali", fullMarks: 100, obtainedMarks: 68, grade: "B", gpa: 3.0 },
      { code: "MTH101", name: "Mathematics", fullMarks: 100, obtainedMarks: 75, grade: "B+", gpa: 3.3 },
      { code: "SCI101", name: "Science", fullMarks: 100, obtainedMarks: 70, grade: "B", gpa: 3.0 },
      { code: "SOC101", name: "Social Studies", fullMarks: 100, obtainedMarks: 73, grade: "B+", gpa: 3.3 }
    ],
    totalMarks: 500,
    obtainedMarks: 358,
    percentage: 71.6,
    gpa: 3.12,
    grade: "B+",
    rank: 15,
    status: "Pass",
    examDate: "2024-05-15",
    resultDate: "2024-06-01"
  }
];

export default function GradesManagement() {
  const [grades, setGrades] = useState(mockGrades);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);

  const filteredGrades = grades.filter(grade =>
    grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (grade) => {
    setSelectedGrade(grade);
  };

  const handleEdit = (gradeId) => {
    window.location.href = `/admin/academic/grades/${gradeId}/edit`;
  };

  const handleDelete = (gradeId) => {
    if (confirm("Are you sure you want to delete this grade record?")) {
      setGrades(grades.filter(g => g.id !== gradeId));
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "A": return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300";
      case "A-": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300";
      case "B+": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "B": return "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-300";
      default: return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Grades Management</h1>
          <p className="text-muted-foreground">Manage student grades and academic performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Grades
          </Button>
          <Button onClick={() => window.location.href = '/admin/academic/grades/add'} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Grade Record
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by student name, ID, class or section..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{grades.length}</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {(grades.reduce((sum, g) => sum + g.gpa, 0) / grades.length).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Average GPA</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {grades.filter(g => g.status === "Pass").length}
            </div>
            <div className="text-sm text-muted-foreground">Pass Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Class</th>
                  <th className="text-left p-4">Semester</th>
                  <th className="text-left p-4">Performance</th>
                  <th className="text-left p-4">Grade</th>
                  <th className="text-left p-4">Rank</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{grade.studentName}</div>
                        <div className="text-sm text-muted-foreground">{grade.studentId}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{grade.class}</div>
                        <div className="text-sm text-muted-foreground">Section {grade.section} • Roll {grade.rollNumber}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{grade.semester}</div>
                        <div className="text-sm text-muted-foreground">{grade.academicYear}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{grade.obtainedMarks}/{grade.totalMarks}</div>
                        <div className="text-sm text-muted-foreground">{grade.percentage}% • GPA: {grade.gpa}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-medium">#{grade.rank}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(grade)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(grade.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(grade.id)}
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

      {/* Grade Details Modal */}
      {selectedGrade && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Grade Details - {selectedGrade.studentName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <p className="text-sm text-muted-foreground">{selectedGrade.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedGrade.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-muted-foreground">{selectedGrade.class} - Section {selectedGrade.section}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Roll Number</label>
                  <p className="text-sm text-muted-foreground">{selectedGrade.rollNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Semester</label>
                  <p className="text-sm text-muted-foreground">{selectedGrade.semester}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Academic Year</label>
                  <p className="text-sm text-muted-foreground">{selectedGrade.academicYear}</p>
                </div>
              </div>

              {/* Overall Performance */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Overall Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{selectedGrade.obtainedMarks}</div>
                      <div className="text-sm text-muted-foreground">Total Marks</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedGrade.percentage}%</div>
                      <div className="text-sm text-muted-foreground">Percentage</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedGrade.gpa}</div>
                      <div className="text-sm text-muted-foreground">GPA</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">#{selectedGrade.rank}</div>
                      <div className="text-sm text-muted-foreground">Class Rank</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Subject-wise Performance */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Subject-wise Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Subject Code</th>
                        <th className="text-left p-3">Subject Name</th>
                        <th className="text-left p-3">Full Marks</th>
                        <th className="text-left p-3">Obtained Marks</th>
                        <th className="text-left p-3">Grade</th>
                        <th className="text-left p-3">GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedGrade.subjects.map((subject, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-mono text-sm">{subject.code}</td>
                          <td className="p-3">{subject.name}</td>
                          <td className="p-3">{subject.fullMarks}</td>
                          <td className="p-3 font-medium">{subject.obtainedMarks}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="p-3 font-medium">{subject.gpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedGrade(null)}>
                  Close
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
                <Button onClick={() => handleEdit(selectedGrade.id)}>
                  Edit Grades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
