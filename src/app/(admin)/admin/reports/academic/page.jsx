"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Eye, 
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Target
} from "lucide-react";

// Mock data for academic reports (Nepali college system)
const mockReports = [
  {
    id: 1,
    reportName: "Student Performance Analysis - First Semester 2024",
    reportType: "Performance",
    description: "Comprehensive analysis of student academic performance including GPA distribution, pass rates, and subject-wise performance metrics.",
    generatedDate: "2024-01-15",
    generatedBy: "Academic Office",
    period: "First Semester 2023-2024",
    totalStudents: 1250,
    averageGPA: 3.45,
    passRate: 92.5,
    topPerformers: 125,
    fileSize: "2.5 MB",
    format: "PDF",
    status: "Available",
    downloadCount: 45,
    keyMetrics: {
      totalEnrollment: 1250,
      activeStudents: 1180,
      graduatedStudents: 70,
      averageAttendance: 87.3,
      subjectPassRates: {
        "English": 95.2,
        "Mathematics": 88.7,
        "Science": 91.4,
        "Nepali": 96.8,
        "Social Studies": 93.1
      }
    }
  },
  {
    id: 2,
    reportName: "Attendance Summary Report - January 2024",
    reportType: "Attendance",
    description: "Monthly attendance report showing class-wise attendance rates, absenteeism patterns, and attendance trends.",
    generatedDate: "2024-01-31",
    generatedBy: "Academic Office",
    period: "January 2024",
    totalStudents: 1250,
    averageAttendance: 87.3,
    perfectAttendance: 156,
    lowAttendance: 89,
    fileSize: "1.8 MB",
    format: "Excel",
    status: "Available",
    downloadCount: 32,
    keyMetrics: {
      totalClasses: 22,
      averageAttendance: 87.3,
      highestAttendance: 98.5,
      lowestAttendance: 72.1,
      classWiseAttendance: {
        "Grade 10": 89.2,
        "Grade 11": 86.7,
        "Grade 12": 85.9,
        "Bachelor": 88.1
      }
    }
  },
  {
    id: 3,
    reportName: "Grade Distribution Analysis - Academic Year 2023-24",
    reportType: "Grades",
    description: "Analysis of grade distribution across all programs showing GPA trends, grade point averages, and academic achievement levels.",
    generatedDate: "2024-01-20",
    generatedBy: "Academic Office",
    period: "Academic Year 2023-2024",
    totalStudents: 1250,
    averageGPA: 3.45,
    aGradeStudents: 312,
    bGradeStudents: 456,
    fileSize: "3.2 MB",
    format: "PDF",
    status: "Available",
    downloadCount: 67,
    keyMetrics: {
      gradeDistribution: {
        "A+": 8.5,
        "A": 16.8,
        "A-": 19.2,
        "B+": 22.4,
        "B": 18.7,
        "B-": 9.6,
        "C+": 3.8,
        "C": 1.0
      },
      programWiseGPA: {
        "Bachelor of Arts": 3.42,
        "Bachelor of Science": 3.51,
        "Bachelor of Business Studies": 3.38,
        "Grade 12": 3.47,
        "Grade 11": 3.41,
        "Grade 10": 3.49
      }
    }
  },
  {
    id: 4,
    reportName: "Course Enrollment Report - Spring 2024",
    reportType: "Enrollment",
    description: "Detailed report on course enrollment statistics, popular courses, capacity utilization, and enrollment trends.",
    generatedDate: "2024-01-10",
    generatedBy: "Academic Office",
    period: "Spring Semester 2024",
    totalCourses: 85,
    totalEnrollments: 3450,
    averageEnrollment: 40.6,
    fullCourses: 12,
    fileSize: "1.9 MB",
    format: "Excel",
    status: "Available",
    downloadCount: 28,
    keyMetrics: {
      totalCourses: 85,
      totalEnrollments: 3450,
      averageEnrollment: 40.6,
      capacityUtilization: 81.2,
      popularCourses: [
        { name: "English Literature", enrollment: 48, capacity: 50 },
        { name: "Business Mathematics", enrollment: 45, capacity: 45 },
        { name: "Computer Science", enrollment: 42, capacity: 45 },
        { name: "Nepali Literature", enrollment: 47, capacity: 50 }
      ]
    }
  },
  {
    id: 5,
    reportName: "Teacher Performance Evaluation - 2023-24",
    reportType: "Faculty",
    description: "Comprehensive evaluation of teaching staff performance including student feedback, course completion rates, and professional development.",
    generatedDate: "2024-01-25",
    generatedBy: "Academic Office",
    period: "Academic Year 2023-2024",
    totalTeachers: 45,
    averageRating: 4.2,
    excellentRating: 28,
    goodRating: 15,
    fileSize: "2.1 MB",
    format: "PDF",
    status: "Available",
    downloadCount: 18,
    keyMetrics: {
      totalTeachers: 45,
      averageRating: 4.2,
      studentFeedbackScore: 4.1,
      courseCompletionRate: 96.8,
      professionalDevelopment: 78,
      ratingDistribution: {
        "Excellent (4.5-5.0)": 62.2,
        "Good (3.5-4.4)": 33.3,
        "Average (2.5-3.4)": 4.4,
        "Below Average (<2.5)": 0.0
      }
    }
  }
];

export default function AcademicReports() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || report.reportType.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const handleDownload = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      // Update download count
      setReports(reports.map(r => 
        r.id === reportId ? { ...r, downloadCount: r.downloadCount + 1 } : r
      ));
      alert(`Downloading ${report.reportName}...`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Processing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Performance": return <TrendingUp className="w-4 h-4" />;
      case "Attendance": return <Users className="w-4 h-4" />;
      case "Grades": return <Award className="w-4 h-4" />;
      case "Enrollment": return <BookOpen className="w-4 h-4" />;
      case "Faculty": return <GraduationCap className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const totalReports = reports.length;
  const availableReports = reports.filter(r => r.status === "Available").length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloadCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Academic Reports</h1>
          <p className="text-muted-foreground">Generate and manage academic performance reports</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/reports/academic/generate'} className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-primary">{totalReports}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableReports}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold text-blue-600">{totalDownloads}</p>
              </div>
              <Download className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Report Types</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "performance" ? "default" : "outline"}
            onClick={() => setFilterType("performance")}
          >
            Performance
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "attendance" ? "default" : "outline"}
            onClick={() => setFilterType("attendance")}
          >
            Attendance
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "grades" ? "default" : "outline"}
            onClick={() => setFilterType("grades")}
          >
            Grades
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "enrollment" ? "default" : "outline"}
            onClick={() => setFilterType("enrollment")}
          >
            Enrollment
          </Button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search reports by name, type, description or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(report.reportType)}
                    <h3 className="font-bold text-lg truncate">{report.reportName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Period</label>
                      <p className="text-sm font-medium">{report.period}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Generated By</label>
                      <p className="text-sm font-medium">{report.generatedBy}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Generated Date</label>
                      <p className="text-sm font-medium">{report.generatedDate}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Downloads</label>
                      <p className="text-sm font-medium">{report.downloadCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Format: {report.format}</span>
                    <span>Size: {report.fileSize}</span>
                    <span>Type: {report.reportType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(report)}
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(report.id)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Report Details - {selectedReport.reportName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <p className="text-sm text-muted-foreground">{selectedReport.reportType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Period</label>
                  <p className="text-sm text-muted-foreground">{selectedReport.period}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Generated Date</label>
                  <p className="text-sm text-muted-foreground">{selectedReport.generatedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Generated By</label>
                  <p className="text-sm text-muted-foreground">{selectedReport.generatedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">File Size</label>
                  <p className="text-sm text-muted-foreground">{selectedReport.fileSize}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Format</label>
                  <p className="text-sm text-muted-foreground">{selectedReport.format}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Key Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedReport.reportType === "Performance" && (
                    <>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{selectedReport.totalStudents}</div>
                          <div className="text-sm text-muted-foreground">Total Students</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{selectedReport.averageGPA}</div>
                          <div className="text-sm text-muted-foreground">Average GPA</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{selectedReport.passRate}%</div>
                          <div className="text-sm text-muted-foreground">Pass Rate</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600">{selectedReport.topPerformers}</div>
                          <div className="text-sm text-muted-foreground">Top Performers</div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {selectedReport.reportType === "Attendance" && (
                    <>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{selectedReport.keyMetrics.totalClasses}</div>
                          <div className="text-sm text-muted-foreground">Total Classes</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{selectedReport.averageAttendance}%</div>
                          <div className="text-sm text-muted-foreground">Average Attendance</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{selectedReport.perfectAttendance}</div>
                          <div className="text-sm text-muted-foreground">Perfect Attendance</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">{selectedReport.lowAttendance}</div>
                          <div className="text-sm text-muted-foreground">Low Attendance</div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
                <Button onClick={() => handleDownload(selectedReport.id)} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
