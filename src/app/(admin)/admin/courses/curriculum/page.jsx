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
  BookOpen,
  FileText,
  Download,
  Upload,
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react";

// Mock data for curriculum (Nepali college system)
const mockCurriculum = [
  {
    id: 1,
    curriculumCode: "BA-2023",
    curriculumName: "Bachelor of Arts Curriculum 2023",
    program: "Bachelor of Arts (BA)",
    academicYear: "2023-2024",
    effectiveDate: "2023-07-15",
    totalSemesters: 6,
    totalCredits: 120,
    totalCourses: 40,
    status: "Active",
    approvedBy: "Academic Council",
    approvalDate: "2023-06-30",
    lastUpdated: "2023-07-01",
    description: "Comprehensive curriculum for Bachelor of Arts program covering humanities, social sciences, and language studies.",
    objectives: [
      "Develop critical thinking and analytical skills",
      "Foster understanding of cultural and social contexts",
      "Enhance communication and writing abilities",
      "Prepare students for diverse career opportunities"
    ],
    semesters: [
      {
        semester: 1,
        courses: [
          { code: "ENG101", name: "English Language I", credits: 3, type: "Core" },
          { code: "NEP101", name: "Nepali Language I", credits: 3, type: "Core" },
          { code: "SOC101", name: "Introduction to Sociology", credits: 3, type: "Core" },
          { code: "HIS101", name: "History of Nepal", credits: 3, type: "Core" },
          { code: "PHI101", name: "Introduction to Philosophy", credits: 3, type: "Elective" }
        ]
      },
      {
        semester: 2,
        courses: [
          { code: "ENG102", name: "English Language II", credits: 3, type: "Core" },
          { code: "NEP102", name: "Nepali Language II", credits: 3, type: "Core" },
          { code: "SOC102", name: "Social Anthropology", credits: 3, type: "Core" },
          { code: "HIS102", name: "World History", credits: 3, type: "Core" },
          { code: "PSY101", name: "Introduction to Psychology", credits: 3, type: "Elective" }
        ]
      }
    ],
    documents: [
      { name: "Curriculum Framework.pdf", size: "2.5 MB", uploadDate: "2023-07-01" },
      { name: "Course Descriptions.pdf", size: "1.8 MB", uploadDate: "2023-07-01" },
      { name: "Assessment Guidelines.pdf", size: "1.2 MB", uploadDate: "2023-07-01" }
    ]
  },
  {
    id: 2,
    curriculumCode: "BSc-2023",
    curriculumName: "Bachelor of Science Curriculum 2023",
    program: "Bachelor of Science (BSc)",
    academicYear: "2023-2024",
    effectiveDate: "2023-07-15",
    totalSemesters: 6,
    totalCredits: 135,
    totalCourses: 45,
    status: "Active",
    approvedBy: "Academic Council",
    approvalDate: "2023-06-30",
    lastUpdated: "2023-07-01",
    description: "Comprehensive curriculum for Bachelor of Science program covering mathematics, physics, chemistry, and biology.",
    objectives: [
      "Develop scientific thinking and research skills",
      "Provide strong foundation in core science subjects",
      "Enhance laboratory and practical skills",
      "Prepare students for advanced studies and careers in science"
    ],
    semesters: [
      {
        semester: 1,
        courses: [
          { code: "MTH101", name: "Mathematics I", credits: 4, type: "Core" },
          { code: "PHY101", name: "Physics I", credits: 4, type: "Core" },
          { code: "CHE101", name: "Chemistry I", credits: 4, type: "Core" },
          { code: "BIO101", name: "Biology I", credits: 4, type: "Core" },
          { code: "ENG101", name: "English Language", credits: 3, type: "Core" }
        ]
      }
    ],
    documents: [
      { name: "Science Curriculum 2023.pdf", size: "3.2 MB", uploadDate: "2023-07-01" },
      { name: "Lab Manual Guidelines.pdf", size: "2.1 MB", uploadDate: "2023-07-01" }
    ]
  },
  {
    id: 3,
    curriculumCode: "BBS-2023",
    curriculumName: "Bachelor of Business Studies Curriculum 2023",
    program: "Bachelor of Business Studies (BBS)",
    academicYear: "2023-2024",
    effectiveDate: "2023-07-20",
    totalSemesters: 8,
    totalCredits: 140,
    totalCourses: 48,
    status: "Active",
    approvedBy: "Academic Council",
    approvalDate: "2023-07-05",
    lastUpdated: "2023-07-10",
    description: "Comprehensive curriculum for Bachelor of Business Studies program covering management, finance, marketing, and entrepreneurship.",
    objectives: [
      "Develop business acumen and management skills",
      "Provide understanding of financial and economic principles",
      "Enhance entrepreneurial and leadership capabilities",
      "Prepare students for business careers and further studies"
    ],
    semesters: [
      {
        semester: 1,
        courses: [
          { code: "MGT101", name: "Principles of Management", credits: 3, type: "Core" },
          { code: "ACC101", name: "Financial Accounting", credits: 3, type: "Core" },
          { code: "ECO101", name: "Microeconomics", credits: 3, type: "Core" },
          { code: "STA101", name: "Business Statistics", credits: 3, type: "Core" },
          { code: "ENG101", name: "Business English", credits: 3, type: "Core" }
        ]
      }
    ],
    documents: [
      { name: "BBS Curriculum Framework.pdf", size: "2.8 MB", uploadDate: "2023-07-10" },
      { name: "Business Case Studies.pdf", size: "1.9 MB", uploadDate: "2023-07-10" }
    ]
  }
];

export default function CurriculumManagement() {
  const [curriculum, setCurriculum] = useState(mockCurriculum);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  const filteredCurriculum = curriculum.filter(curr =>
    curr.curriculumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.curriculumCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.academicYear.includes(searchTerm)
  );

  const handleView = (curr) => {
    setSelectedCurriculum(curr);
  };

  const handleEdit = (currId) => {
    window.location.href = `/admin/courses/curriculum/${currId}/edit`;
  };

  const handleDelete = (currId) => {
    if (confirm("Are you sure you want to delete this curriculum?")) {
      setCurriculum(curriculum.filter(c => c.id !== currId));
    }
  };

  const handleDownload = (document) => {
    // Simulate document download
    alert(`Downloading ${document.name}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Curriculum Management</h1>
          <p className="text-muted-foreground">Manage academic curriculum and course structures</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/courses/curriculum/add'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Curriculum
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by curriculum name, code, program or academic year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{curriculum.length}</div>
            <div className="text-sm text-muted-foreground">Total Curriculum</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {curriculum.filter(c => c.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Curriculum</div>
          </CardContent>
        </Card>
      </div>

      {/* Curriculum Table */}
      <Card>
        <CardHeader>
          <CardTitle>Curriculum List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Curriculum</th>
                  <th className="text-left p-4">Program</th>
                  <th className="text-left p-4">Academic Year</th>
                  <th className="text-left p-4">Structure</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCurriculum.map((curr) => (
                  <tr key={curr.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{curr.curriculumName}</div>
                        <div className="text-sm text-muted-foreground">{curr.curriculumCode}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{curr.program}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{curr.academicYear}</div>
                        <div className="text-sm text-muted-foreground">Effective: {curr.effectiveDate}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{curr.totalSemesters} Semesters</div>
                        <div>{curr.totalCredits} Credits</div>
                        <div>{curr.totalCourses} Courses</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        curr.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                      }`}>
                        {curr.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(curr)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(curr.id)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(curr.id)}
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

      {/* Curriculum Details Modal */}
      {selectedCurriculum && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Curriculum Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Curriculum Name</label>
                  <p className="text-sm text-muted-foreground">{selectedCurriculum.curriculumName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Curriculum Code</label>
                  <p className="text-sm text-muted-foreground font-mono">{selectedCurriculum.curriculumCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Program</label>
                  <p className="text-sm text-muted-foreground">{selectedCurriculum.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Academic Year</label>
                  <p className="text-sm text-muted-foreground">{selectedCurriculum.academicYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Credits</label>
                  <p className="text-sm text-muted-foreground">{selectedCurriculum.totalCredits}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Courses</label>
                  <p className="text-sm text-muted-foreground">{selectedCurriculum.totalCourses}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedCurriculum.description}</p>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="font-medium mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {selectedCurriculum.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Semester Structure */}
              <div>
                <h3 className="font-medium mb-3">Semester Structure</h3>
                <div className="space-y-4">
                  {selectedCurriculum.semesters.map((sem) => (
                    <Card key={sem.semester}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Semester {sem.semester}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Course Code</th>
                                <th className="text-left p-2">Course Name</th>
                                <th className="text-left p-2">Credits</th>
                                <th className="text-left p-2">Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sem.courses.map((course, index) => (
                                <tr key={index} className="border-b">
                                  <td className="p-2 font-mono">{course.code}</td>
                                  <td className="p-2">{course.name}</td>
                                  <td className="p-2">{course.credits}</td>
                                  <td className="p-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      course.type === "Core" 
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}>
                                      {course.type}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-medium mb-3">Related Documents</h3>
                <div className="space-y-2">
                  {selectedCurriculum.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} • Uploaded {doc.uploadDate}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedCurriculum(null)}>
                  Close
                </Button>
                <Button onClick={() => handleEdit(selectedCurriculum.id)}>
                  Edit Curriculum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
