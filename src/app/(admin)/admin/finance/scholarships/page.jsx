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
  Award,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap
} from "lucide-react";

// Mock data for scholarships (Nepali college system)
const mockScholarships = [
  {
    id: 1,
    scholarshipName: "Merit Scholarship",
    type: "Academic Merit",
    amount: 25000,
    amountType: "Fixed",
    eligibilityCriteria: "Minimum 3.5 GPA in previous semester",
    totalSlots: 20,
    availableSlots: 5,
    applicationDeadline: "2024-02-15",
    academicYear: "2023-2024",
    semester: "All Semesters",
    status: "Active",
    description: "Scholarship for academically excellent students based on GPA performance",
    provider: "College Administration",
    renewalPolicy: "Renewable each semester with maintained GPA",
    recipients: [
      { id: 1, name: "Priya Poudel", studentId: "STU2024002", gpa: 3.92, amount: 25000 },
      { id: 2, name: "Anil Shrestha", studentId: "STU2024001", gpa: 3.72, amount: 25000 }
    ]
  },
  {
    id: 2,
    scholarshipName: "Need-Based Financial Aid",
    type: "Financial Need",
    amount: 50,
    amountType: "Percentage",
    eligibilityCriteria: "Family income below Rs. 300,000 annually",
    totalSlots: 15,
    availableSlots: 8,
    applicationDeadline: "2024-01-31",
    academicYear: "2023-2024",
    semester: "All Semesters",
    status: "Active",
    description: "Financial assistance for students from economically disadvantaged backgrounds",
    provider: "Government Grant",
    renewalPolicy: "Annual renewal based on financial status verification",
    recipients: [
      { id: 3, name: "Rajesh Gurung", studentId: "STU2024003", gpa: 3.12, amount: 22500 }
    ]
  },
  {
    id: 3,
    scholarshipName: "Sports Excellence Scholarship",
    type: "Sports Achievement",
    amount: 15000,
    amountType: "Fixed",
    eligibilityCriteria: "National or regional level sports achievement",
    totalSlots: 10,
    availableSlots: 7,
    applicationDeadline: "2024-03-01",
    academicYear: "2023-2024",
    semester: "All Semesters",
    status: "Active",
    description: "Scholarship for students with outstanding sports achievements",
    provider: "Sports Development Fund",
    renewalPolicy: "Renewable with continued sports participation",
    recipients: [
      { id: 4, name: "Suresh Tamang", studentId: "STU2024004", gpa: 3.25, amount: 15000 }
    ]
  },
  {
    id: 4,
    scholarshipName: "Minority Community Scholarship",
    type: "Community Support",
    amount: 30,
    amountType: "Percentage",
    eligibilityCriteria: "Students from minority communities with good academic record",
    totalSlots: 12,
    availableSlots: 9,
    applicationDeadline: "2024-02-28",
    academicYear: "2023-2024",
    semester: "All Semesters",
    status: "Active",
    description: "Support for students from minority communities to promote inclusive education",
    provider: "Social Welfare Department",
    renewalPolicy: "Annual renewal with academic progress review",
    recipients: []
  }
];

export default function ScholarshipsManagement() {
  const [scholarships, setScholarships] = useState(mockScholarships);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const handleEdit = (scholarshipId) => {
    window.location.href = `/admin/finance/scholarships/${scholarshipId}/edit`;
  };

  const handleDelete = (scholarshipId) => {
    if (confirm("Are you sure you want to delete this scholarship?")) {
      setScholarships(scholarships.filter(s => s.id !== scholarshipId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300";
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300";
      case "Expired": return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-300";
    }
  };

  const totalScholarships = scholarships.length;
  const activeScholarships = scholarships.filter(s => s.status === "Active").length;
  const totalRecipients = scholarships.reduce((sum, s) => sum + s.recipients.length, 0);
  const totalAmount = scholarships.reduce((sum, s) => {
    return sum + s.recipients.reduce((recipientSum, r) => recipientSum + r.amount, 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Scholarships Management</h1>
          <p className="text-muted-foreground">Manage student scholarships and financial aid programs</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/finance/scholarships/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Scholarship
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Scholarships</p>
                <p className="text-2xl font-bold text-primary">{totalScholarships}</p>
              </div>
              <Award className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-bold text-green-600">{activeScholarships}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recipients</p>
                <p className="text-2xl font-bold text-blue-600">{totalRecipients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Disbursed</p>
                <p className="text-2xl font-bold text-orange-600">Rs. {totalAmount.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by scholarship name, type, provider or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((scholarship) => (
          <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{scholarship.scholarshipName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{scholarship.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                  {scholarship.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {scholarship.amountType === "Fixed" 
                    ? `Rs. ${scholarship.amount.toLocaleString()}` 
                    : `${scholarship.amount}%`
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  {scholarship.amountType === "Fixed" ? "Fixed Amount" : "Fee Discount"}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Slots:</span>
                  <span className="font-medium">{scholarship.availableSlots}/{scholarship.totalSlots}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipients:</span>
                  <span className="font-medium">{scholarship.recipients.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{scholarship.applicationDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium text-xs">{scholarship.provider}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Eligibility</p>
                <p className="text-sm line-clamp-2">{scholarship.eligibilityCriteria}</p>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ 
                    width: `${((scholarship.totalSlots - scholarship.availableSlots) / scholarship.totalSlots) * 100}%` 
                  }}
                ></div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(scholarship)}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(scholarship.id)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(scholarship.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scholarship Details Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Scholarship Details - {selectedScholarship.scholarshipName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Scholarship Name</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.scholarshipName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <p className="text-sm text-muted-foreground font-bold text-primary">
                    {selectedScholarship.amountType === "Fixed" 
                      ? `Rs. ${selectedScholarship.amount.toLocaleString()}` 
                      : `${selectedScholarship.amount}% discount`
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Slots</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.totalSlots}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Available Slots</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.availableSlots}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Application Deadline</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.applicationDeadline}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Academic Year</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.academicYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Provider</label>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.provider}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedScholarship.status)}`}>
                    {selectedScholarship.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedScholarship.description}</p>
              </div>

              {/* Eligibility & Renewal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Eligibility Criteria</h3>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.eligibilityCriteria}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Renewal Policy</h3>
                  <p className="text-sm text-muted-foreground">{selectedScholarship.renewalPolicy}</p>
                </div>
              </div>

              {/* Recipients */}
              {selectedScholarship.recipients.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Current Recipients</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Student Name</th>
                          <th className="text-left p-3">Student ID</th>
                          <th className="text-left p-3">GPA</th>
                          <th className="text-left p-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedScholarship.recipients.map((recipient) => (
                          <tr key={recipient.id} className="border-b">
                            <td className="p-3">{recipient.name}</td>
                            <td className="p-3 font-mono text-sm">{recipient.studentId}</td>
                            <td className="p-3 font-medium">{recipient.gpa}</td>
                            <td className="p-3 font-medium text-primary">Rs. {recipient.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedScholarship(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedScholarship.id)}>
                  Edit Scholarship
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
