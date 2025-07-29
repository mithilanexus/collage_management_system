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
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle,
  Download
} from "lucide-react";

// Mock data for fee structure (Nepali college system)
const mockFeeStructure = [
  {
    id: 1,
    feeType: "Tuition Fee",
    program: "Bachelor of Arts (BA)",
    level: "Bachelor",
    semester: "Per Semester",
    amount: 22500,
    dueDate: "15th of each month",
    description: "Regular tuition fee for BA program covering all core subjects and faculty costs",
    status: "Active",
    applicableFrom: "2023-07-15",
    lastUpdated: "2023-06-30"
  },
  {
    id: 2,
    feeType: "Admission Fee",
    program: "All Programs",
    level: "All Levels",
    semester: "One Time",
    amount: 15000,
    dueDate: "At time of admission",
    description: "One-time admission fee for new students including registration and documentation",
    status: "Active",
    applicableFrom: "2023-07-15",
    lastUpdated: "2023-06-30"
  },
  {
    id: 3,
    feeType: "Examination Fee",
    program: "All Programs",
    level: "All Levels",
    semester: "Per Semester",
    amount: 2500,
    dueDate: "Before exam registration",
    description: "Examination fee covering question paper preparation, evaluation, and result processing",
    status: "Active",
    applicableFrom: "2023-07-15",
    lastUpdated: "2023-06-30"
  },
  {
    id: 4,
    feeType: "Library Fee",
    program: "All Programs",
    level: "All Levels",
    semester: "Annual",
    amount: 3000,
    dueDate: "Beginning of academic year",
    description: "Annual library fee for access to books, journals, and digital resources",
    status: "Active",
    applicableFrom: "2023-07-15",
    lastUpdated: "2023-06-30"
  },
  {
    id: 5,
    feeType: "Laboratory Fee",
    program: "Bachelor of Science (BSc)",
    level: "Bachelor",
    semester: "Per Semester",
    amount: 5000,
    dueDate: "Beginning of semester",
    description: "Laboratory fee for science students covering equipment usage and materials",
    status: "Active",
    applicableFrom: "2023-07-15",
    lastUpdated: "2023-06-30"
  },
  {
    id: 6,
    feeType: "Sports Fee",
    program: "All Programs",
    level: "All Levels",
    semester: "Annual",
    amount: 1500,
    dueDate: "Beginning of academic year",
    description: "Annual sports fee for sports facilities and equipment maintenance",
    status: "Active",
    applicableFrom: "2023-07-15",
    lastUpdated: "2023-06-30"
  }
];

export default function FeeStructureManagement() {
  const [feeStructure, setFeeStructure] = useState(mockFeeStructure);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);

  const filteredFees = feeStructure.filter(fee =>
    fee.feeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (fee) => {
    setSelectedFee(fee);
  };

  const handleEdit = (feeId) => {
    window.location.href = `/admin/finance/fees/${feeId}/edit`;
  };

  const handleDelete = (feeId) => {
    if (confirm("Are you sure you want to delete this fee structure?")) {
      setFeeStructure(feeStructure.filter(f => f.id !== feeId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const totalFeeTypes = feeStructure.length;
  const activeFees = feeStructure.filter(f => f.status === "Active").length;
  const totalAmount = feeStructure.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Fee Structure Management</h1>
          <p className="text-muted-foreground">Manage college fee structure and pricing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.href = '/admin/finance/payments'}>
            <CreditCard className="w-4 h-4 mr-2" />
            View Payments
          </Button>
          <Button onClick={() => window.location.href = '/admin/finance/fees/add'} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Fee Type
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fee Types</p>
                <p className="text-2xl font-bold text-primary">{totalFeeTypes}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Fee Types</p>
                <p className="text-2xl font-bold text-green-600">{activeFees}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fee Amount</p>
                <p className="text-2xl font-bold text-blue-600">Rs. {totalAmount.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Programs Covered</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by fee type, program, level or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Fee Structure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFees.map((fee) => (
          <Card key={fee.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{fee.feeType}</CardTitle>
                  <p className="text-sm text-muted-foreground">{fee.program}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                  {fee.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 bg-muted/30 rounded-lg">
                <div className="text-3xl font-bold text-primary">Rs. {fee.amount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{fee.semester}</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level:</span>
                  <span className="font-medium">{fee.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="font-medium">{fee.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applicable From:</span>
                  <span className="font-medium">{fee.applicableFrom}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm line-clamp-3">{fee.description}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(fee)}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(fee.id)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(fee.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee Details Modal */}
      {selectedFee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Fee Structure Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Fee Type</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.feeType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <p className="text-sm text-muted-foreground font-bold text-primary">Rs. {selectedFee.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Program</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Level</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.semester}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.dueDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Applicable From</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.applicableFrom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Updated</label>
                  <p className="text-sm text-muted-foreground">{selectedFee.lastUpdated}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedFee.description}</p>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-medium mb-3">Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedFee.status)}`}>
                  {selectedFee.status}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedFee(null)}>
                  Close
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Details
                </Button>
                <Button onClick={() => handleEdit(selectedFee.id)}>
                  Edit Fee Structure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
