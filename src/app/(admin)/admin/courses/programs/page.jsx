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
  Clock,
  Users,
  BookOpen,
  Calendar,
  Award
} from "lucide-react";

// Mock data for programs (Nepali college system)
const mockPrograms = [
  {
    id: 1,
    programCode: "BA",
    programName: "Bachelor of Arts",
    level: "Bachelor",
    duration: "3 Years",
    totalSemesters: 6,
    totalCredits: 120,
    faculty: "Faculty of Humanities and Social Sciences",
    department: "Arts Department",
    enrolledStudents: 150,
    maxCapacity: 200,
    tuitionFee: "Rs. 45,000/year",
    description: "Comprehensive undergraduate program in arts, literature, and social sciences with focus on critical thinking and communication skills.",
    eligibility: "SLC/SEE Pass with minimum 2.0 GPA",
    careerProspects: "Teaching, Civil Service, Journalism, Social Work, Research",
    status: "Active",
    startDate: "2024-01-15",
    applicationDeadline: "2023-12-31",
    coordinator: "Dr. Ram Prasad Sharma",
    accreditation: "University Grants Commission (UGC)",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    programCode: "BSc",
    programName: "Bachelor of Science",
    level: "Bachelor",
    duration: "3 Years",
    totalSemesters: 6,
    totalCredits: 135,
    faculty: "Faculty of Science and Technology",
    department: "Science Department",
    enrolledStudents: 120,
    maxCapacity: 150,
    tuitionFee: "Rs. 55,000/year",
    description: "Rigorous undergraduate program in science with specializations in Physics, Chemistry, Mathematics, and Biology.",
    eligibility: "SLC/SEE Pass with Science background and minimum 2.5 GPA",
    careerProspects: "Research, Laboratory Technician, Teaching, Healthcare, Engineering",
    status: "Active",
    startDate: "2024-01-15",
    applicationDeadline: "2023-12-31",
    coordinator: "Dr. Sunita Rai",
    accreditation: "University Grants Commission (UGC)",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    programCode: "BBS",
    programName: "Bachelor of Business Studies",
    level: "Bachelor",
    duration: "4 Years",
    totalSemesters: 8,
    totalCredits: 140,
    faculty: "Faculty of Management",
    department: "Business Department",
    enrolledStudents: 180,
    maxCapacity: 220,
    tuitionFee: "Rs. 60,000/year",
    description: "Comprehensive business education covering management, finance, marketing, and entrepreneurship for future business leaders.",
    eligibility: "SLC/SEE Pass with minimum 2.0 GPA, preferably with business background",
    careerProspects: "Business Management, Banking, Finance, Marketing, Entrepreneurship",
    status: "Active",
    startDate: "2024-01-20",
    applicationDeadline: "2024-01-05",
    coordinator: "Prof. Rajesh Kumar",
    accreditation: "University Grants Commission (UGC)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    programCode: "MA",
    programName: "Master of Arts",
    level: "Master",
    duration: "2 Years",
    totalSemesters: 4,
    totalCredits: 80,
    faculty: "Faculty of Humanities and Social Sciences",
    department: "Arts Department",
    enrolledStudents: 45,
    maxCapacity: 60,
    tuitionFee: "Rs. 50,000/year",
    description: "Advanced graduate program in arts and humanities with research focus and specialization options.",
    eligibility: "Bachelor's degree in relevant field with minimum 2.5 GPA",
    careerProspects: "Higher Education, Research, Administration, Cultural Organizations",
    status: "Active",
    startDate: "2024-02-01",
    applicationDeadline: "2024-01-15",
    coordinator: "Dr. Gita Poudel",
    accreditation: "University Grants Commission (UGC)",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
  }
];

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState(mockPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);

  const filteredPrograms = programs.filter(program =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.programCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (program) => {
    setSelectedProgram(program);
  };

  const handleEdit = (programId) => {
    window.location.href = `/admin/courses/programs/${programId}/edit`;
  };

  const handleDelete = (programId) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setPrograms(programs.filter(p => p.id !== programId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Academic Programs</h1>
          <p className="text-muted-foreground">Manage degree programs and academic offerings</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/courses/programs/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Program
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by program name, code, faculty or coordinator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{programs.length}</div>
            <div className="text-sm text-muted-foreground">Total Programs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {programs.reduce((sum, p) => sum + p.enrolledStudents, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Enrollment</div>
          </CardContent>
        </Card>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img 
                src={program.image} 
                alt={program.programName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  program.status === "Active" 
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {program.status}
                </span>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{program.programName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{program.programCode} • {program.level}</p>
                </div>
                <Award className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span>{program.totalCredits} Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{program.enrolledStudents}/{program.maxCapacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span>{program.totalSemesters} Semesters</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Faculty</p>
                <p className="text-sm font-medium">{program.faculty}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Tuition Fee</p>
                <p className="text-sm font-medium text-primary">{program.tuitionFee}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(program)}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(program.id)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(program.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Program Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Program Image */}
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src={selectedProgram.image} 
                  alt={selectedProgram.programName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Program Name</label>
                  <p className="text-sm text-muted-foreground">{selectedProgram.programName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Program Code</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedProgram.programCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Level</label>
                  <p className="text-sm text-muted-foreground">{selectedProgram.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <p className="text-sm text-muted-foreground">{selectedProgram.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Credits</label>
                  <p className="text-sm text-muted-foreground">{selectedProgram.totalCredits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Tuition Fee</label>
                  <p className="text-sm text-muted-foreground">{selectedProgram.tuitionFee}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">Program Description</h3>
                <p className="text-sm text-muted-foreground">{selectedProgram.description}</p>
              </div>

              {/* Eligibility & Career */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Eligibility Criteria</h3>
                  <p className="text-sm text-muted-foreground">{selectedProgram.eligibility}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Career Prospects</h3>
                  <p className="text-sm text-muted-foreground">{selectedProgram.careerProspects}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedProgram(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedProgram.id)}>
                  Edit Program
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
