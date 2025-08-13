
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Filter,
  Eye,
  Users,
  Target,
  School
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function PrimarySubjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [primarySubjects, setPrimarySubjects] = useState([]);

  useEffect(() => {
    getPrimarySubjects();
  }, []);

  const getPrimarySubjects = async () => {
    try {
      const response = await fetch("/api/admin/courses/subjects/primary");
      const data = await response.json();
      setPrimarySubjects(data.data);
    } catch (error) {
      console.error("Error fetching primary subjects:", error);
      return [];
    }
  };

  const filteredSubjects = primarySubjects.filter((subject) => {
    const matchesSearch =
      subject.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || subject.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });


  const handleDelete = async (subjectId) => {
    try {
      const response = await fetch(`/api/admin/courses/subjects/primary/${subjectId}`, {
        method: "DELETE"
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Subject deleted successfully!");
        getPrimarySubjects();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error(error.message);
    }

  };

  const stats = {
    total: primarySubjects.length,
    active: primarySubjects.filter(s => s.status === "active").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses/subjects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <School className="w-8 h-8 text-green-600" />
              Primary Level Subjects
            </h1>
            <p className="text-muted-foreground">
              Manage subjects for grades 1-8
            </p>
          </div>
        </div>
        <Link href="/admin/courses/subjects/primary/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search subjects by name, code, or nepali name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="elective">Elective</SelectItem>
                <SelectItem value="optional">Optional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subjects List */}
      <div className="space-y-4">
        {filteredSubjects.map((subject) => (
          <Card key={subject._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {/* Subject Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{subject.name || "Untitled Subject"}</h3>
                      <p className="text-muted-foreground text-sm">
                        {subject.code || "No code"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={subject.status === "Active" ? "default" : "secondary"}>
                        {subject.status || "Draft"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subject.type || "No type"}
                      </Badge>
                      {subject.mandatory && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <span>Objectives: {subject.objectives || "Not specified"}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {subject.description || "No description available"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses/subjects/primary/${subject._id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/courses/subjects/primary/${subject._id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(subject._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Link href="/admin/courses/subjects/primary/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First Subject
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
