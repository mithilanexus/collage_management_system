"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Eye,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  Target,
  Users,
  Calendar,
  Zap
} from "lucide-react";

// Mock data for analytics reports
const mockAnalyticsReports = [
  {
    id: 1,
    reportName: "Student Enrollment Trends Analysis - 2023-24",
    reportType: "Enrollment Analytics",
    description: "Comprehensive analysis of student enrollment patterns, demographic trends, and program popularity over the academic year.",
    generatedDate: "2024-01-30",
    generatedBy: "Analytics Team",
    period: "Academic Year 2023-2024",
    totalDataPoints: 15000,
    accuracy: 98.5,
    insights: 25,
    fileSize: "4.2 MB",
    format: "Interactive Dashboard",
    status: "Available",
    downloadCount: 34,
    keyMetrics: {
      totalEnrollments: 1250,
      growthRate: 12.5,
      retentionRate: 94.2,
      popularPrograms: ["Bachelor of Science", "Bachelor of Arts", "BBS"],
      demographics: {
        "Male": 52.4,
        "Female": 47.6
      }
    }
  },
  {
    id: 2,
    reportName: "Academic Performance Predictive Analysis",
    reportType: "Performance Analytics",
    description: "Machine learning-based analysis predicting student performance outcomes and identifying at-risk students for early intervention.",
    generatedDate: "2024-01-28",
    generatedBy: "Analytics Team",
    period: "Ongoing Analysis",
    totalDataPoints: 25000,
    accuracy: 87.3,
    insights: 18,
    fileSize: "3.8 MB",
    format: "PDF + Dashboard",
    status: "Available",
    downloadCount: 28,
    keyMetrics: {
      studentsAnalyzed: 1180,
      atRiskStudents: 89,
      predictionAccuracy: 87.3,
      interventionSuccess: 76.4,
      performanceFactors: ["Attendance", "Assignment Scores", "Participation", "Previous GPA"]
    }
  },
  {
    id: 3,
    reportName: "Financial Performance Dashboard - Q1 2024",
    reportType: "Financial Analytics",
    description: "Real-time financial analytics dashboard showing revenue trends, expense patterns, and profitability analysis with forecasting.",
    generatedDate: "2024-01-25",
    generatedBy: "Finance Analytics",
    period: "Q1 2024",
    totalDataPoints: 8500,
    accuracy: 95.8,
    insights: 22,
    fileSize: "2.9 MB",
    format: "Interactive Dashboard",
    status: "Available",
    downloadCount: 41,
    keyMetrics: {
      totalRevenue: 8500000,
      profitMargin: 27.1,
      collectionEfficiency: 86.4,
      costPerStudent: 6800,
      revenueStreams: ["Tuition Fees", "Admission Fees", "Examination Fees", "Other Services"]
    }
  },
  {
    id: 4,
    reportName: "Campus Resource Utilization Analysis",
    reportType: "Operations Analytics",
    description: "Analysis of campus resource utilization including classrooms, laboratories, library, and other facilities with optimization recommendations.",
    generatedDate: "2024-01-22",
    generatedBy: "Operations Team",
    period: "January 2024",
    totalDataPoints: 12000,
    accuracy: 92.7,
    insights: 15,
    fileSize: "3.1 MB",
    format: "PDF + Excel",
    status: "Available",
    downloadCount: 19,
    keyMetrics: {
      averageUtilization: 78.5,
      peakHours: "10:00 AM - 2:00 PM",
      underutilizedSpaces: 8,
      optimizationPotential: 15.3,
      resourceTypes: ["Classrooms", "Labs", "Library", "Sports Facilities"]
    }
  },
  {
    id: 5,
    reportName: "Student Satisfaction & Engagement Analytics",
    reportType: "Satisfaction Analytics",
    description: "Comprehensive analysis of student satisfaction surveys, engagement metrics, and feedback patterns with actionable insights.",
    generatedDate: "2024-01-20",
    generatedBy: "Student Affairs",
    period: "Academic Year 2023-2024",
    totalDataPoints: 5600,
    accuracy: 94.1,
    insights: 20,
    fileSize: "2.7 MB",
    format: "Interactive Report",
    status: "Available",
    downloadCount: 26,
    keyMetrics: {
      overallSatisfaction: 4.2,
      responseRate: 78.4,
      engagementScore: 82.5,
      npsScore: 67,
      satisfactionAreas: ["Teaching Quality", "Facilities", "Support Services", "Campus Life"]
    }
  }
];

export default function AnalyticsReports() {
  const [reports, setReports] = useState(mockAnalyticsReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
                         report.reportType.toLowerCase().includes(filterType.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const handleDownload = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
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
    if (type.includes("Enrollment")) return <Users className="w-4 h-4" />;
    if (type.includes("Performance")) return <TrendingUp className="w-4 h-4" />;
    if (type.includes("Financial")) return <BarChart3 className="w-4 h-4" />;
    if (type.includes("Operations")) return <Activity className="w-4 h-4" />;
    if (type.includes("Satisfaction")) return <Target className="w-4 h-4" />;
    return <PieChart className="w-4 h-4" />;
  };

  const totalReports = reports.length;
  const availableReports = reports.filter(r => r.status === "Available").length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloadCount, 0);
  const averageAccuracy = (reports.reduce((sum, r) => sum + r.accuracy, 0) / reports.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics Reports</h1>
          <p className="text-muted-foreground">Advanced analytics and data insights</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/reports/analytics/generate'} className="flex items-center gap-2">
          <PieChart className="w-4 h-4" />
          Generate Analytics
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
              <PieChart className="w-8 h-8 text-primary" />
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
                <p className="text-sm font-medium text-muted-foreground">Avg Accuracy</p>
                <p className="text-2xl font-bold text-orange-600">{averageAccuracy}%</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
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
            variant={filterType === "enrollment" ? "default" : "outline"}
            onClick={() => setFilterType("enrollment")}
          >
            Enrollment
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
            variant={filterType === "financial" ? "default" : "outline"}
            onClick={() => setFilterType("financial")}
          >
            Financial
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "operations" ? "default" : "outline"}
            onClick={() => setFilterType("operations")}
          >
            Operations
          </Button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search analytics reports by name, type or description..."
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
                  
                  {/* Analytics Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-blue-700 dark:text-blue-300">Data Points</label>
                      <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                        {report.totalDataPoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-green-700 dark:text-green-300">Accuracy</label>
                      <p className="text-lg font-bold text-green-800 dark:text-green-200">
                        {report.accuracy}%
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-purple-700 dark:text-purple-300">Insights</label>
                      <p className="text-lg font-bold text-purple-800 dark:text-purple-200">
                        {report.insights}
                      </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-orange-700 dark:text-orange-300">Downloads</label>
                      <p className="text-lg font-bold text-orange-800 dark:text-orange-200">
                        {report.downloadCount}
                      </p>
                    </div>
                  </div>

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
                      <label className="text-xs font-medium text-muted-foreground">Format</label>
                      <p className="text-sm font-medium">{report.format}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Type: {report.reportType}</span>
                    <span>Size: {report.fileSize}</span>
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
                <PieChart className="w-5 h-5" />
                Analytics Report Details - {selectedReport.reportName}
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

              {/* Analytics Summary */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Analytics Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{selectedReport.totalDataPoints.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Data Points</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedReport.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedReport.insights}</div>
                      <div className="text-sm text-muted-foreground">Insights</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedReport.downloadCount}</div>
                      <div className="text-sm text-muted-foreground">Downloads</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
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
