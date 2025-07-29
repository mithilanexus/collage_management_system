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
  Download,
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

// Mock data for payments (Nepali college system)
const mockPayments = [
  {
    id: 1,
    paymentId: "PAY2024001",
    studentId: "STU2024001",
    studentName: "Anil Shrestha",
    class: "Grade 12",
    section: "A",
    feeType: "Tuition Fee",
    amount: 22500,
    paymentDate: "2024-01-15",
    paymentMethod: "Bank Transfer",
    bankName: "Nepal Bank Limited",
    transactionId: "TXN123456789",
    receiptNumber: "RCP2024001",
    status: "Completed",
    semester: "First Semester",
    academicYear: "2023-2024",
    remarks: "Full semester fee payment"
  },
  {
    id: 2,
    paymentId: "PAY2024002",
    studentId: "STU2024002",
    studentName: "Priya Poudel",
    class: "Grade 11",
    section: "A",
    feeType: "Examination Fee",
    amount: 2500,
    paymentDate: "2024-01-10",
    paymentMethod: "Cash",
    bankName: null,
    transactionId: null,
    receiptNumber: "RCP2024002",
    status: "Completed",
    semester: "First Semester",
    academicYear: "2023-2024",
    remarks: "Exam fee for first semester"
  },
  {
    id: 3,
    paymentId: "PAY2024003",
    studentId: "STU2024003",
    studentName: "Rajesh Gurung",
    class: "Grade 10",
    section: "B",
    feeType: "Library Fee",
    amount: 3000,
    paymentDate: "2024-01-08",
    paymentMethod: "Online Payment",
    bankName: "eSewa",
    transactionId: "ESW987654321",
    receiptNumber: "RCP2024003",
    status: "Completed",
    semester: "Annual",
    academicYear: "2023-2024",
    remarks: "Annual library fee"
  },
  {
    id: 4,
    paymentId: "PAY2024004",
    studentId: "STU2024004",
    studentName: "Suresh Tamang",
    class: "Grade 12",
    section: "B",
    feeType: "Tuition Fee",
    amount: 11250,
    paymentDate: "2024-01-12",
    paymentMethod: "Bank Transfer",
    bankName: "Rastriya Banijya Bank",
    transactionId: "RBB456789123",
    receiptNumber: "RCP2024004",
    status: "Pending Verification",
    semester: "First Semester",
    academicYear: "2023-2024",
    remarks: "Partial payment - 50% of tuition fee"
  }
];

export default function PaymentsManagement() {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments = payments.filter(payment =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.feeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (payment) => {
    setSelectedPayment(payment);
  };

  const handleDownloadReceipt = (paymentId) => {
    alert(`Downloading receipt for payment: ${paymentId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Pending Verification": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300";
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Bank Transfer": return <CreditCard className="w-4 h-4" />;
      case "Cash": return <DollarSign className="w-4 h-4" />;
      case "Online Payment": return <CreditCard className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(p => p.status === "Completed").length;
  const pendingPayments = payments.filter(p => p.status === "Pending Verification").length;
  const todayPayments = payments.filter(p => p.paymentDate === "2024-01-15").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Payment Management</h1>
          <p className="text-muted-foreground">Track and manage student fee payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button onClick={() => window.location.href = '/admin/finance/payments/add'} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                <p className="text-2xl font-bold text-primary">Rs. {totalAmount.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedPayments}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Payments</p>
                <p className="text-2xl font-bold text-blue-600">{todayPayments}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by student name, ID, payment ID, fee type or payment method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Payment ID</th>
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Fee Type</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Payment Method</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="font-mono text-sm">{payment.paymentId}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{payment.studentName}</div>
                        <div className="text-sm text-muted-foreground">{payment.studentId}</div>
                        <div className="text-sm text-muted-foreground">{payment.class} - {payment.section}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{payment.feeType}</div>
                        <div className="text-sm text-muted-foreground">{payment.semester}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">Rs. {payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <div>
                          <div className="font-medium">{payment.paymentMethod}</div>
                          {payment.bankName && (
                            <div className="text-sm text-muted-foreground">{payment.bankName}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{payment.paymentDate}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(payment)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadReceipt(payment.paymentId)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `/admin/finance/payments/${payment.id}/edit`}
                        >
                          <Edit className="w-3 h-3" />
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

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details - {selectedPayment.paymentId}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedPayment.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.class} - Section {selectedPayment.section}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Academic Year</label>
                  <p className="text-sm text-muted-foreground">{selectedPayment.academicYear}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Payment ID</label>
                    <p className="text-sm text-muted-foreground font-mono">{selectedPayment.paymentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Fee Type</label>
                    <p className="text-sm text-muted-foreground">{selectedPayment.feeType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <p className="text-sm text-muted-foreground font-bold text-primary">Rs. {selectedPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Date</label>
                    <p className="text-sm text-muted-foreground">{selectedPayment.paymentDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Method</label>
                    <p className="text-sm text-muted-foreground">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Receipt Number</label>
                    <p className="text-sm text-muted-foreground font-mono">{selectedPayment.receiptNumber}</p>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Transaction Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPayment.bankName && (
                    <div>
                      <label className="text-sm font-medium">Bank/Service</label>
                      <p className="text-sm text-muted-foreground">{selectedPayment.bankName}</p>
                    </div>
                  )}
                  {selectedPayment.transactionId && (
                    <div>
                      <label className="text-sm font-medium">Transaction ID</label>
                      <p className="text-sm text-muted-foreground font-mono">{selectedPayment.transactionId}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Semester</label>
                    <p className="text-sm text-muted-foreground">{selectedPayment.semester}</p>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              {selectedPayment.remarks && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Remarks</h3>
                  <p className="text-sm text-muted-foreground">{selectedPayment.remarks}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Close
                </Button>
                <Button variant="outline" onClick={() => handleDownloadReceipt(selectedPayment.paymentId)} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </Button>
                <Button onClick={() => window.location.href = `/admin/finance/payments/${selectedPayment.id}/edit`}>
                  Edit Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
