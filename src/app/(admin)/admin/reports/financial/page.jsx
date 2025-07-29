"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  CreditCard,
  Wallet,
  Receipt
} from "lucide-react";

// Mock data for financial reports
const mockFinancialReports = [
  {
    id: 1,
    reportName: "Monthly Revenue Report - January 2024",
    reportType: "Revenue",
    description: "Comprehensive monthly revenue analysis including fee collections, payment methods, and outstanding amounts.",
    generatedDate: "2024-01-31",
    generatedBy: "Accounts Office",
    period: "January 2024",
    totalRevenue: 2850000,
    totalExpenses: 1650000,
    netProfit: 1200000,
    fileSize: "1.8 MB",
    format: "PDF",
    status: "Available",
    downloadCount: 23,
    keyMetrics: {
      totalCollected: 2850000,
      pendingAmount: 450000,
      collectionRate: 86.4,
      paymentMethods: {
        "Bank Transfer": 1650000,
        "Cash": 850000,
        "Online Payment": 350000
      }
    }
  },
  {
    id: 2,
    reportName: "Fee Collection Analysis - Academic Year 2023-24",
    reportType: "Collection",
    description: "Annual fee collection report showing program-wise collections, payment trends, and defaulter analysis.",
    generatedDate: "2024-01-25",
    generatedBy: "Accounts Office",
    period: "Academic Year 2023-2024",
    totalRevenue: 15600000,
    totalExpenses: 12400000,
    netProfit: 3200000,
    fileSize: "3.1 MB",
    format: "Excel",
    status: "Available",
    downloadCount: 45,
    keyMetrics: {
      totalDue: 18000000,
      totalCollected: 15600000,
      collectionRate: 86.7,
      programWiseCollection: {
        "Bachelor Programs": 8500000,
        "Grade 12": 4200000,
        "Grade 11": 2900000
      }
    }
  },
  {
    id: 3,
    reportName: "Expense Breakdown Report - Q1 2024",
    reportType: "Expenses",
    description: "Quarterly expense analysis covering operational costs, staff salaries, infrastructure, and other expenditures.",
    generatedDate: "2024-01-20",
    generatedBy: "Finance Department",
    period: "Q1 2024",
    totalRevenue: 8500000,
    totalExpenses: 6200000,
    netProfit: 2300000,
    fileSize: "2.3 MB",
    format: "PDF",
    status: "Available",
    downloadCount: 18,
    keyMetrics: {
      staffSalaries: 3200000,
      infrastructure: 1500000,
      utilities: 800000,
      supplies: 700000,
      expenseCategories: {
        "Staff Costs": 51.6,
        "Infrastructure": 24.2,
        "Utilities": 12.9,
        "Supplies": 11.3
      }
    }
  },
  {
    id: 4,
    reportName: "Scholarship Disbursement Report - 2023-24",
    reportType: "Scholarships",
    description: "Annual scholarship disbursement report showing scholarship types, recipients, and total amounts distributed.",
    generatedDate: "2024-01-15",
    generatedBy: "Finance Department",
    period: "Academic Year 2023-2024",
    totalDisbursed: 1250000,
    totalRecipients: 85,
    averageAmount: 14706,
    fileSize: "1.5 MB",
    format: "PDF",
    status: "Available",
    downloadCount: 12,
    keyMetrics: {
      totalDisbursed: 1250000,
      totalRecipients: 85,
      scholarshipTypes: {
        "Merit Scholarship": 650000,
        "Need-Based Aid": 400000,
        "Sports Scholarship": 200000
      }
    }
  }
];

export default function FinancialReports() {
  const [reports, setReports] = useState(mockFinancialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || report.reportType.toLowerCase() === filterType.toLowerCase();
    
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
    switch (type) {
      case "Revenue": return <TrendingUp className="w-4 h-4" />;
      case "Collection": return <CreditCard className="w-4 h-4" />;
      case "Expenses": return <TrendingDown className="w-4 h-4" />;
      case "Scholarships": return <Wallet className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const totalReports = reports.length;
  const availableReports = reports.filter(r => r.status === "Available").length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloadCount, 0);
  const totalRevenue = reports.reduce((sum, r) => sum + r.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground">Generate and manage financial reports and analytics</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/reports/financial/generate'} className="flex items-center gap-2">
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
              <Receipt className="w-8 h-8 text-green-600" />
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
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-600">Rs. {(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
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
            variant={filterType === "revenue" ? "default" : "outline"}
            onClick={() => setFilterType("revenue")}
          >
            Revenue
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "collection" ? "default" : "outline"}
            onClick={() => setFilterType("collection")}
          >
            Collection
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "expenses" ? "default" : "outline"}
            onClick={() => setFilterType("expenses")}
          >
            Expenses
          </Button>
          <Button 
            size="sm" 
            variant={filterType === "scholarships" ? "default" : "outline"}
            onClick={() => setFilterType("scholarships")}
          >
            Scholarships
          </Button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search reports by name, type or description..."
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
                  
                  {/* Financial Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-green-700 dark:text-green-300">Total Revenue</label>
                      <p className="text-lg font-bold text-green-800 dark:text-green-200">
                        Rs. {(report.totalRevenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-red-700 dark:text-red-300">Total Expenses</label>
                      <p className="text-lg font-bold text-red-800 dark:text-red-200">
                        Rs. {(report.totalExpenses / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                      <label className="text-xs font-medium text-blue-700 dark:text-blue-300">Net Profit</label>
                      <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                        Rs. {(report.netProfit / 1000000).toFixed(1)}M
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
                <DollarSign className="w-5 h-5" />
                Financial Report Details - {selectedReport.reportName}
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

              {/* Financial Summary */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">Rs. {selectedReport.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">Rs. {selectedReport.totalExpenses.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Expenses</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">Rs. {selectedReport.netProfit.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Net Profit</div>
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
