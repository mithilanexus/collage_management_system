"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  CreditCard, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Download,
  Eye,
  Clock
} from "lucide-react";

const mockBillingData = {
  currentBalance: 25000,
  totalCharges: 85000,
  totalPayments: 60000,
  dueDate: "2024-02-15",
  accountStatus: "Active",
  charges: [
    { description: "Tuition Fee - Spring 2024", amount: 45000, date: "2024-01-15", status: "Posted" },
    { description: "Lab Fee - Computer Science", amount: 5000, date: "2024-01-15", status: "Posted" },
    { description: "Library Fee", amount: 2000, date: "2024-01-15", status: "Posted" },
    { description: "Student Activity Fee", amount: 3000, date: "2024-01-15", status: "Posted" },
    { description: "Examination Fee", amount: 2500, date: "2024-01-10", status: "Posted" }
  ],
  payments: [
    { description: "Online Payment", amount: 30000, date: "2024-01-20", method: "Bank Transfer", status: "Processed" },
    { description: "Cash Payment", amount: 20000, date: "2024-01-05", method: "Cash", status: "Processed" },
    { description: "Scholarship Credit", amount: 10000, date: "2024-01-01", method: "Scholarship", status: "Applied" }
  ]
};

export default function BillingPage() {
  const [billingData, setBillingData] = useState(mockBillingData);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isOverdue = new Date(billingData.dueDate) < new Date();
  const daysToDue = Math.ceil((new Date(billingData.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Account Summary</h1>
          <p className="text-muted-foreground">Spring 2024 Semester</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Statement
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View History
          </Button>
        </div>
      </div>

      {/* Balance Alert */}
      {billingData.currentBalance > 0 && (
        <Card className={`border-2 ${isOverdue ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className={`w-5 h-5 ${isOverdue ? 'text-red-600' : 'text-orange-600'}`} />
              <div className="flex-1">
                <h3 className={`font-medium ${isOverdue ? 'text-red-800' : 'text-orange-800'}`}>
                  {isOverdue ? 'Payment Overdue' : 'Payment Due'}
                </h3>
                <p className={`text-sm ${isOverdue ? 'text-red-700' : 'text-orange-700'}`}>
                  Outstanding balance of Rs. {billingData.currentBalance.toLocaleString()} 
                  {isOverdue ? ' is overdue' : ` is due in ${daysToDue} days`}
                </p>
              </div>
              <Button 
                className={isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}
                onClick={() => setShowPaymentModal(true)}
              >
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                <p className={`text-2xl font-bold ${billingData.currentBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Rs. {billingData.currentBalance.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Charges</p>
                <p className="text-2xl font-bold text-blue-600">Rs. {billingData.totalCharges.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                <p className="text-2xl font-bold text-green-600">Rs. {billingData.totalPayments.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className={`text-lg font-bold ${isOverdue ? 'text-red-600' : 'text-orange-600'}`}>
                  {new Date(billingData.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Charges */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billingData.charges.map((charge, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{charge.description}</h4>
                    <p className="text-xs text-muted-foreground">{charge.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">Rs. {charge.amount.toLocaleString()}</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {charge.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billingData.payments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{payment.description}</h4>
                    <p className="text-xs text-muted-foreground">{payment.date} • {payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">Rs. {payment.amount.toLocaleString()}</p>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <CreditCard className="w-6 h-6" />
              <span>Online Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <DollarSign className="w-6 h-6" />
              <span>Bank Transfer</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Clock className="w-6 h-6" />
              <span>Payment Plan</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Make Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Amount Due</p>
                <p className="text-2xl font-bold text-red-600">Rs. {billingData.currentBalance.toLocaleString()}</p>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay with Card/Bank
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Bank Transfer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Set up Payment Plan
                </Button>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
