
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  GraduationCap,
  Save,
  Plus,
  X,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function EditBachelorTeacherPage() {
  const params = useParams();
  const teacherId = params.id;

  const [formData, setFormData] = useState({
    teacherId: "",
    name: "",
    nepaliName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    program: "",
    qualification: "",
    experience: "",
    joiningDate: "",
    address: "",
    salary: "",
    biography: "",
    avatar: null
  });

  const [specializations, setSpecializations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const positions = [
    "Professor",
    "Associate Professor", 
    "Assistant Professor",
    "Lecturer",
    "Senior Lecturer",
    "Research Fellow",
    "Visiting Professor",
    "Emeritus Professor"
  ];

  const departments = [
    "Computer Science",
    "Management",
    "Humanities",
    "Science",
    "Engineering",
    "Social Work",
    "Education",
    "Law",
    "Medicine"
  ];

  const programs = [
    "BIT",
    "BBS", 
    "BA",
    "BSc",
    "BE",
    "BBA",
    "BSW",
    "BEd",
    "LLB",
    "MBBS"
  ];

  // Load existing teacher data
  useEffect(() => {
    // Mock data - in real app, fetch from API
    const existingTeacher = {
      teacherId: "BT001",
      name: "Dr. Rajesh Kumar Sharma",
      nepaliName: "डा. राजेश कुमार शर्मा",
      email: "rajesh.sharma@college.edu",
      phone: "+977-9841234567",
      position: "Professor",
      department: "Computer Science",
      program: "BIT",
      qualification: "Ph.D. Computer Science, MIT, USA",
      experience: "15 years",
      joiningDate: "2020-03-15",
      address: "Kathmandu-32, Baneshwor, Nepal",
      salary: "NPR 80,000",
      biography: "Dr. Rajesh Kumar Sharma is a renowned professor in Computer Science with extensive experience in software engineering and database systems.",
      avatar: null
    };

    const existingSpecializations = ["Software Engineering", "Database Systems", "Artificial Intelligence", "Machine Learning"];
    const existingSubjects = ["Database Management", "Software Engineering", "Research Methodology", "Advanced Programming"];

    setFormData(existingTeacher);
    setSpecializations(existingSpecializations);
    setSubjects(existingSubjects);
  }, [teacherId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
      setSpecializations([...specializations, newSpecialization.trim()]);
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index) => {
    setSpecializations(specializations.filter((_, i) => i !== index));
  };

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.position || !formData.department) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Prepare updated teacher data
    const updatedTeacherData = {
      ...formData,
      specializations,
      subjects,
      updatedAt: new Date().toISOString()
    };

    console.log("Updated Bachelor Teacher:", updatedTeacherData);
    toast.success("Bachelor teacher updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/admin/management/teachers/bachelor/${teacherId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            Edit Bachelor Level Teacher
          </h1>
          <p className="text-muted-foreground">
            Update teacher information and academic details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacherId">Teacher ID *</Label>
                <Input
                  id="teacherId"
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleInputChange}
                  placeholder="e.g., BT001"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name (English) *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Dr. John Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nepaliName">Full Name (Nepali)</Label>
                <Input
                  id="nepaliName"
                  name="nepaliName"
                  value={formData.nepaliName}
                  onChange={handleInputChange}
                  placeholder="e.g., डा. जोन स्मिथ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                >
                  <option value="">Select Position</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Main Program *</Label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                >
                  <option value="">Select Program</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="teacher@college.edu"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+977-9841234567"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="City, District, Nepal"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qualification">Highest Qualification</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g., Ph.D. Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Monthly Salary</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="NPR 75,000"
                />
              </div>
            </div>

            {/* Specializations */}
            <div className="space-y-2">
              <Label>Specializations</Label>
              <div className="flex gap-2">
                <Input
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  placeholder="Add specialization"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                />
                <Button type="button" onClick={addSpecialization} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    <span>{spec}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecialization(index)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-2">
              <Label>Teaching Subjects</Label>
              <div className="flex gap-2">
                <Input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Add subject"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                />
                <Button type="button" onClick={addSubject} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    <span>{subject}</span>
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <Label htmlFor="biography">Biography / Description</Label>
              <Textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                placeholder="Brief description about the teacher's background, achievements, and expertise..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-purple-100 flex items-center justify-center">
                  {formData.avatar ? (
                    <img
                      src={typeof formData.avatar === 'string' ? formData.avatar : URL.createObjectURL(formData.avatar)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <User className="w-8 h-8 text-purple-600" />
                  )}
                </div>
                <div>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="max-w-xs"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a professional photo (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link href={`/admin/management/teachers/bachelor/${teacherId}`}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Update Teacher
          </Button>
        </div>
      </form>
    </div>
  );
}
