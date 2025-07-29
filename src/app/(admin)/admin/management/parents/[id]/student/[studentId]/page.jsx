"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  User,
  GraduationCap,
  Calendar,
  DollarSign,
  FileText,
  Award,
  Users,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  Download,
  Upload,
  Eye,
  BookOpen,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  Target,
  Activity,
  CreditCard,
  Receipt,
  Bell,
  Settings
} from "lucide-react";

// Mock comprehensive student data
const mockStudentData = {
  // Basic Information
  id: "STU2024001",
  firstName: "Anil",
  lastName: "Shrestha",
  fullName: "Anil Shrestha",
  dateOfBirth: "2005-03-15",
  gender: "Male",
  bloodGroup: "B+",
  nationality: "Nepali",
  religion: "Hindu",
  caste: "Brahmin",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  
  // Contact Information
  email: "anil.shrestha@student.edu.np",
  phone: "9841234567",
  alternatePhone: "9841234568",
  address: {
    permanent: "Kathmandu-10, Bagbazar, Ward No. 5",
    temporary: "Kathmandu-10, Bagbazar, Ward No. 5",
    district: "Kathmandu",
    province: "Bagmati Province",
    country: "Nepal"
  },
  
  // Academic Information
  academic: {
    currentClass: "Grade 12",
    section: "A",
    rollNumber: "15",
    program: "Science",
    batch: "2023-2025",
    admissionDate: "2023-07-15",
    studentType: "Regular",
    previousSchool: "Shree Saraswati Secondary School",
    previousGrade: "A",
    currentSemester: "Second Semester",
    academicYear: "2023-2024"
  },
  
  // Parent Information
  parent: {
    id: "PAR2024001",
    fatherName: "Ram Bahadur Shrestha",
    motherName: "Sita Shrestha",
    guardianName: "Ram Bahadur Shrestha",
    fatherOccupation: "Business",
    motherOccupation: "Teacher",
    fatherPhone: "9841234569",
    motherPhone: "9841234570",
    annualIncome: "Rs. 8,00,000"
  },
  
  // Academic Performance
  performance: {
    currentGPA: 3.72,
    overallGrade: "A",
    totalCredits: 118,
    completedCredits: 98,
    attendance: 92.5,
    rank: 5,
    totalStudents: 45,
    subjects: [
      { name: "English", grade: "A", gpa: 3.8, credits: 4, teacher: "Dr. Ram Sharma" },
      { name: "Mathematics", grade: "A-", gpa: 3.6, credits: 4, teacher: "Mrs. Gita Poudel" },
      { name: "Physics", grade: "A", gpa: 3.9, credits: 4, teacher: "Dr. Sunita Rai" },
      { name: "Chemistry", grade: "A-", gpa: 3.7, credits: 4, teacher: "Mr. Rajesh Kc" },
      { name: "Biology", grade: "B+", gpa: 3.5, credits: 4, teacher: "Dr. Maya Tamang" },
      { name: "Nepali", grade: "A", gpa: 3.8, credits: 3, teacher: "Mr. Dipak Gurung" }
    ]
  },
  
  // Financial Information
  financial: {
    totalFees: 45000,
    paidAmount: 35000,
    pendingAmount: 10000,
    lastPaymentDate: "2024-01-15",
    paymentHistory: [
      { date: "2024-01-15", amount: 22500, type: "Tuition Fee", method: "Bank Transfer", status: "Completed" },
      { date: "2023-12-10", amount: 12500, type: "Admission Fee", method: "Cash", status: "Completed" },
      { date: "2023-11-20", amount: 2500, type: "Examination Fee", method: "Online", status: "Completed" }
    ],
    scholarships: [
      { name: "Merit Scholarship", amount: 5000, status: "Active", provider: "College" }
    ]
  },
  
  // Attendance Records
  attendance: {
    totalClasses: 120,
    attendedClasses: 111,
    absentDays: 9,
    lateArrivals: 3,
    attendanceRate: 92.5,
    monthlyAttendance: [
      { month: "January", rate: 95.2, present: 20, absent: 1 },
      { month: "December", rate: 89.7, present: 17, absent: 2 },
      { month: "November", rate: 92.3, present: 18, absent: 2 }
    ]
  },
  
  // Disciplinary Records
  discipline: {
    totalIncidents: 1,
    warnings: 1,
    suspensions: 0,
    records: [
      { date: "2023-12-05", type: "Warning", reason: "Late submission of assignment", action: "Verbal warning", status: "Resolved" }
    ]
  },
  
  // Extracurricular Activities
  activities: [
    { name: "Science Club", role: "Member", joinDate: "2023-08-01", status: "Active" },
    { name: "Basketball Team", role: "Player", joinDate: "2023-07-20", status: "Active" },
    { name: "Debate Society", role: "Secretary", joinDate: "2023-09-15", status: "Active" }
  ],
  
  // Health Information
  health: {
    medicalConditions: "None",
    allergies: "None",
    medications: "None",
    emergencyContact: "Ram Bahadur Shrestha - 9841234569",
    bloodGroup: "B+",
    lastCheckup: "2023-10-15",
    vaccinations: "Complete"
  },
  
  // Documents
  documents: [
    { name: "Birth Certificate", type: "PDF", uploadDate: "2023-07-15", status: "Verified" },
    { name: "Previous School Certificate", type: "PDF", uploadDate: "2023-07-15", status: "Verified" },
    { name: "Citizenship Copy", type: "PDF", uploadDate: "2023-07-15", status: "Verified" },
    { name: "Medical Certificate", type: "PDF", uploadDate: "2023-07-15", status: "Verified" }
  ],
  
  // Recent Activities
  recentActivities: [
    { date: "2024-01-15", activity: "Fee payment completed", type: "Financial" },
    { date: "2024-01-12", activity: "Attended Science Exhibition", type: "Academic" },
    { date: "2024-01-10", activity: "Basketball match participation", type: "Sports" },
    { date: "2024-01-08", activity: "Monthly test completed", type: "Academic" }
  ]
};

export default function StudentManagementPage({ params }) {
  const [student, setStudent] = useState(mockStudentData);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "activities", label: "Activities", icon: Users },
    { id: "health", label: "Health", icon: Activity },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleSave = () => {
    setIsEditing(false);
    alert("Student information updated successfully!");
  };

  const handlePayFees = () => {
    alert("Redirecting to fee payment portal...");
  };

  const handleDownloadReport = () => {
    alert("Generating comprehensive student report...");
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800";
      case "A": return "bg-blue-100 text-blue-800";
      case "A-": return "bg-cyan-100 text-cyan-800";
      case "B+": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Parent
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <img 
                src={student.profileImage} 
                alt={student.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{student.fullName}</h1>
              <p className="text-muted-foreground">
                {student.academic.currentClass} - {student.academic.section} | Roll: {student.academic.rollNumber}
              </p>
              <p className="text-sm text-muted-foreground">Student ID: {student.id}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            {isEditing ? "Save Changes" : "Edit Student"}
          </Button>
        </div>
      </div>

      {/* Important Alerts */}
      {(student.financial.pendingAmount > 0 || student.attendance.attendanceRate < 85 || student.discipline.totalIncidents > 0) && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-orange-600" />
              <h3 className="font-medium text-orange-800 dark:text-orange-200">Important Alerts</h3>
            </div>
            <div className="space-y-2 text-sm">
              {student.financial.pendingAmount > 0 && (
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <DollarSign className="w-3 h-3" />
                  <span>Pending fees: Rs. {student.financial.pendingAmount.toLocaleString()}</span>
                </div>
              )}
              {student.attendance.attendanceRate < 85 && (
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Calendar className="w-3 h-3" />
                  <span>Low attendance: {student.attendance.attendanceRate}% (Below 85%)</span>
                </div>
              )}
              {student.discipline.totalIncidents > 0 && (
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <AlertCircle className="w-3 h-3" />
                  <span>Disciplinary incidents: {student.discipline.totalIncidents}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                <p className="text-2xl font-bold text-primary">{student.performance.currentGPA}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold text-green-600">{student.attendance.attendanceRate}%</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Fees</p>
                <p className="text-2xl font-bold text-orange-600">Rs. {student.financial.pendingAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Class Rank</p>
                <p className="text-2xl font-bold text-blue-600">{student.performance.rank}/{student.performance.totalStudents}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input value={student.fullName} onChange={(e) => setStudent({...student, fullName: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    {isEditing ? (
                      <Input type="date" value={student.dateOfBirth} onChange={(e) => setStudent({...student, dateOfBirth: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.dateOfBirth}</p>
                    )}
                  </div>
                  <div>
                    <Label>Gender</Label>
                    {isEditing ? (
                      <select className="w-full p-2 border border-border rounded-md" value={student.gender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.gender}</p>
                    )}
                  </div>
                  <div>
                    <Label>Blood Group</Label>
                    {isEditing ? (
                      <Input value={student.bloodGroup} onChange={(e) => setStudent({...student, bloodGroup: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.bloodGroup}</p>
                    )}
                  </div>
                  <div>
                    <Label>Nationality</Label>
                    {isEditing ? (
                      <Input value={student.nationality} onChange={(e) => setStudent({...student, nationality: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.nationality}</p>
                    )}
                  </div>
                  <div>
                    <Label>Religion</Label>
                    {isEditing ? (
                      <Input value={student.religion} onChange={(e) => setStudent({...student, religion: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.religion}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label>Permanent Address</Label>
                  {isEditing ? (
                    <Textarea value={student.address.permanent} rows={2} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{student.address.permanent}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input type="email" value={student.email} onChange={(e) => setStudent({...student, email: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input value={student.phone} onChange={(e) => setStudent({...student, phone: e.target.value})} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{student.phone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground">{activity.date} • {activity.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Academic Tab */}
        {activeTab === "academic" && (
          <div className="space-y-6">
            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Current Class</Label>
                    <p className="text-sm text-muted-foreground">{student.academic.currentClass}</p>
                  </div>
                  <div>
                    <Label>Section</Label>
                    <p className="text-sm text-muted-foreground">{student.academic.section}</p>
                  </div>
                  <div>
                    <Label>Roll Number</Label>
                    <p className="text-sm text-muted-foreground">{student.academic.rollNumber}</p>
                  </div>
                  <div>
                    <Label>Program</Label>
                    <p className="text-sm text-muted-foreground">{student.academic.program}</p>
                  </div>
                  <div>
                    <Label>Batch</Label>
                    <p className="text-sm text-muted-foreground">{student.academic.batch}</p>
                  </div>
                  <div>
                    <Label>Admission Date</Label>
                    <p className="text-sm text-muted-foreground">{student.academic.admissionDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Current Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{student.performance.currentGPA}</div>
                    <div className="text-sm text-muted-foreground">Current GPA</div>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{student.performance.overallGrade}</div>
                    <div className="text-sm text-muted-foreground">Overall Grade</div>
                  </div>
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{student.performance.rank}</div>
                    <div className="text-sm text-muted-foreground">Class Rank</div>
                  </div>
                  <div className="text-center p-4 bg-orange-100 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{student.performance.completedCredits}/{student.performance.totalCredits}</div>
                    <div className="text-sm text-muted-foreground">Credits</div>
                    <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(student.performance.completedCredits / student.performance.totalCredits) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-orange-600 mt-1">
                      {Math.round((student.performance.completedCredits / student.performance.totalCredits) * 100)}% Complete
                    </div>
                  </div>
                </div>

                {/* Subject-wise Performance */}
                <div>
                  <h3 className="font-medium mb-3">Subject-wise Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Subject</th>
                          <th className="text-left p-3">Teacher</th>
                          <th className="text-left p-3">Credits</th>
                          <th className="text-left p-3">GPA</th>
                          <th className="text-left p-3">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.performance.subjects.map((subject, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3 font-medium">{subject.name}</td>
                            <td className="p-3 text-sm text-muted-foreground">{subject.teacher}</td>
                            <td className="p-3">{subject.credits}</td>
                            <td className="p-3 font-medium">{subject.gpa}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                                {subject.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === "financial" && (
          <div className="space-y-6">
            {/* Fee Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">Rs. {student.financial.totalFees.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Fees</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">Rs. {student.financial.paidAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Paid Amount</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-red-600">Rs. {student.financial.pendingAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Pending Amount</div>
                  {student.financial.pendingAmount > 0 && (
                    <Button
                      size="sm"
                      className="mt-3 w-full"
                      onClick={handlePayFees}
                    >
                      <CreditCard className="w-3 h-3 mr-2" />
                      Pay Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Amount</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-left p-3">Method</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.financial.paymentHistory.map((payment, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{payment.date}</td>
                          <td className="p-3 font-medium">Rs. {payment.amount.toLocaleString()}</td>
                          <td className="p-3">{payment.type}</td>
                          <td className="p-3">{payment.method}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Scholarships
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.financial.scholarships.map((scholarship, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h3 className="font-medium">{scholarship.name}</h3>
                      <p className="text-sm text-muted-foreground">Provider: {scholarship.provider}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">Rs. {scholarship.amount.toLocaleString()}</div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {scholarship.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{student.attendance.attendanceRate}%</div>
                  <div className="text-sm text-muted-foreground">Attendance Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">{student.attendance.attendedClasses}</div>
                  <div className="text-sm text-muted-foreground">Classes Attended</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-red-600">{student.attendance.absentDays}</div>
                  <div className="text-sm text-muted-foreground">Absent Days</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">{student.attendance.lateArrivals}</div>
                  <div className="text-sm text-muted-foreground">Late Arrivals</div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Monthly Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Month</th>
                        <th className="text-left p-3">Present</th>
                        <th className="text-left p-3">Absent</th>
                        <th className="text-left p-3">Attendance Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.attendance.monthlyAttendance.map((month, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{month.month}</td>
                          <td className="p-3 text-green-600">{month.present}</td>
                          <td className="p-3 text-red-600">{month.absent}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${month.rate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{month.rate}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === "activities" && (
          <div className="space-y-6">
            {/* Extracurricular Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Extracurricular Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.activities.map((activity, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{activity.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Role: {activity.role}</p>
                      <p className="text-sm text-muted-foreground">Joined: {activity.joinDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disciplinary Records */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Disciplinary Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold">{student.discipline.totalIncidents}</div>
                    <div className="text-sm text-muted-foreground">Total Incidents</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{student.discipline.warnings}</div>
                    <div className="text-sm text-muted-foreground">Warnings</div>
                  </div>
                  <div className="text-center p-4 bg-red-100 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{student.discipline.suspensions}</div>
                    <div className="text-sm text-muted-foreground">Suspensions</div>
                  </div>
                </div>

                {student.discipline.records.length > 0 && (
                  <div className="space-y-3">
                    {student.discipline.records.map((record, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{record.type}</span>
                          <span className="text-sm text-muted-foreground">{record.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{record.reason}</p>
                        <p className="text-sm"><strong>Action:</strong> {record.action}</p>
                        <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Health Tab */}
        {activeTab === "health" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Blood Group</Label>
                    <p className="text-sm text-muted-foreground">{student.health.bloodGroup}</p>
                  </div>
                  <div>
                    <Label>Medical Conditions</Label>
                    <p className="text-sm text-muted-foreground">{student.health.medicalConditions}</p>
                  </div>
                  <div>
                    <Label>Allergies</Label>
                    <p className="text-sm text-muted-foreground">{student.health.allergies}</p>
                  </div>
                  <div>
                    <Label>Current Medications</Label>
                    <p className="text-sm text-muted-foreground">{student.health.medications}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Emergency Contact</Label>
                    <p className="text-sm text-muted-foreground">{student.health.emergencyContact}</p>
                  </div>
                  <div>
                    <Label>Last Health Checkup</Label>
                    <p className="text-sm text-muted-foreground">{student.health.lastCheckup}</p>
                  </div>
                  <div>
                    <Label>Vaccination Status</Label>
                    <p className="text-sm text-muted-foreground">{student.health.vaccinations}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.documents.map((document, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{document.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        document.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {document.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Type: {document.type}</p>
                    <p className="text-sm text-muted-foreground mb-3">Uploaded: {document.uploadDate}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 border-2 border-dashed border-muted rounded-lg text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Upload new document</p>
                <Button size="sm" variant="outline">Choose File</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Change Password</Label>
                  <div className="flex gap-2 mt-2">
                    <Input type="password" placeholder="New Password" className="flex-1" />
                    <Button>Update</Button>
                  </div>
                </div>

                <div>
                  <Label>Notification Preferences</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMS Notifications</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grade Alerts</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Attendance Alerts</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-red-600">Transfer Student</h3>
                    <p className="text-sm text-muted-foreground mb-2">Transfer this student to another class or section.</p>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Transfer Student
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium text-red-600">Suspend Student</h3>
                    <p className="text-sm text-muted-foreground mb-2">Temporarily suspend student access.</p>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Suspend Access
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {student.financial.pendingAmount > 0 && (
          <Button
            className="rounded-full w-14 h-14 shadow-lg"
            onClick={handlePayFees}
            title="Pay Fees"
          >
            <CreditCard className="w-5 h-5" />
          </Button>
        )}
        <Button
          variant="outline"
          className="rounded-full w-14 h-14 shadow-lg bg-background"
          onClick={handleDownloadReport}
          title="Download Report"
        >
          <Download className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
