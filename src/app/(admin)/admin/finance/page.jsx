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
  CheckCircle
} from "lucide-react";

// Mock data for fee management (Nepali college system)
const mockFeeRecords = [
  {
    id: 1,
    studentId: "STU2024001",
    studentName: "Anil Shrestha",
    class: "Grade 12",
    section: "A",
    rollNumber: "15",
    feeType: "Tuition Fee",
    academicYear: "2023-2024",
    semester: "First Semester",
    totalAmount: 45000,
    paidAmount: 45000,
    pendingAmount: 0,
    dueDate: "2024-01-31",
    paymentDate: "2024-01-15",
    paymentMethod: "Bank Transfer",
    status: "Paid",
    receiptNumber: "RCP2024001",
    remarks: "Full payment received on time"
  },
  {
    id: 2,
    studentId: "STU2024002",
    studentName: "Priya Poudel",
    class: "Grade 11",
    section: "A",
    rollNumber: "08",
    feeType: "Tuition Fee",
    academicYear: "2023-2024",
    semester: "First Semester",
    totalAmount: 45000,
    paidAmount: 25000,
    pendingAmount: 20000,
    dueDate: "2024-01-31",
    paymentDate: "2024-01-10",
    paymentMethod: "Cash",
    status: "Partial",
    receiptNumber: "RCP2024002",
    remarks: "Partial payment, remaining due"
  },
  {
    id: 3,
    studentId: "STU2024003",
    studentName: "Rajesh Gurung",
    class: "Grade 10",
    section: "B",
    rollNumber: "12",
    feeType: "Admission Fee",
    academicYear: "2023-2024",
    semester: "First Semester",
    totalAmount: 15000,
    paidAmount: 0,
    pendingAmount: 15000,
    dueDate: "2024-02-15",
    paymentDate: null,
    paymentMethod: null,
    status: "Pending",
    receiptNumber: null,
    remarks: "Payment overdue"
  },
  {
    id: 4,
    studentId: "STU2024004",
    studentName: "Suresh Tamang",
    class: "Grade 12",
    section: "B",
    rollNumber: "22",
    feeType: "Examination Fee",
    academicYear: "2023-2024",
    semester: "First Semester",
    totalAmount: 5000,
    paidAmount: 5000,
    pendingAmount: 0,
    dueDate: "2024-03-01",
    paymentDate: "2024-02-28",
    paymentMethod: "Online Payment",
    status: "Paid",
    receiptNumber: "RCP2024004",
    remarks: "Exam fee paid before deadline"
  }
];

export default function FinanceManagement() {
  const [feeRecords, setFeeRecords] = useState(mockFeeRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.feeType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const handleEdit = (recordId) => {
    window.location.href = `/admin/finance/${recordId}/edit`;
  };

  const handleDelete = (recordId) => {
    if (confirm("Are you sure you want to delete this fee record?")) {
      setFeeRecords(feeRecords.filter(r => r.id !== recordId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Partial": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Pending": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const totalRevenue = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.pendingAmount, 0);
  const paidRecords = feeRecords.filter(r => r.status === "Paid").length;
  const pendingRecords = feeRecords.filter(r => r.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground">Manage student fees and financial records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.href = '/admin/finance/payments'}>
            <CreditCard className="w-4 h-4 mr-2" />
            Payments
          </Button>
          <Button onClick={() => window.location.href = '/admin/finance/add'} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Fee Record
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">Rs. {totalPending.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Records</p>
                <p className="text-2xl font-bold text-blue-600">{paidRecords}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Records</p>
                <p className="text-2xl font-bold text-orange-600">{pendingRecords}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by student name, ID, class or fee type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Class</th>
                  <th className="text-left p-4">Fee Type</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Payment</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{record.studentName}</div>
                        <div className="text-sm text-muted-foreground">{record.studentId}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{record.class}</div>
                        <div className="text-sm text-muted-foreground">Section {record.section} • Roll {record.rollNumber}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{record.feeType}</div>
                        <div className="text-sm text-muted-foreground">{record.semester}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">Rs. {record.totalAmount.toLocaleString()}</div>
                        {record.pendingAmount > 0 && (
                          <div className="text-sm text-red-600">Pending: Rs. {record.pendingAmount.toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">Rs. {record.paidAmount.toLocaleString()}</div>
                        {record.paymentDate && (
                          <div className="text-sm text-muted-foreground">{record.paymentDate}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(record)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(record.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(record.id)}
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

      {/* Fee Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Fee Record Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedRecord.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.class} - Section {selectedRecord.section}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Roll Number</label>
                  <p className="text-sm text-muted-foreground">{selectedRecord.rollNumber}</p>
                </div>
              </div>

              {/* Fee Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Fee Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Fee Type</label>
                    <p className="text-sm text-muted-foreground">{selectedRecord.feeType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Academic Year</label>
                    <p className="text-sm text-muted-foreground">{selectedRecord.academicYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Semester</label>
                    <p className="text-sm text-muted-foreground">{selectedRecord.semester}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <p className="text-sm text-muted-foreground">{selectedRecord.dueDate}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Total Amount</label>
                    <p className="text-sm text-muted-foreground">Rs. {selectedRecord.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Paid Amount</label>
                    <p className="text-sm text-muted-foreground">Rs. {selectedRecord.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pending Amount</label>
                    <p className="text-sm text-muted-foreground">Rs. {selectedRecord.pendingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Method</label>
                    <p className="text-sm text-muted-foreground">{selectedRecord.paymentMethod || "N/A"}</p>
                  </div>
                  {selectedRecord.paymentDate && (
                    <div>
                      <label className="text-sm font-medium">Payment Date</label>
                      <p className="text-sm text-muted-foreground">{selectedRecord.paymentDate}</p>
                    </div>
                  )}
                  {selectedRecord.receiptNumber && (
                    <div>
                      <label className="text-sm font-medium">Receipt Number</label>
                      <p className="text-sm text-muted-foreground font-mono">{selectedRecord.receiptNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Remarks */}
              {selectedRecord.remarks && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Remarks</h3>
                  <p className="text-sm text-muted-foreground">{selectedRecord.remarks}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedRecord(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedRecord.id)}>
                  Edit Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
