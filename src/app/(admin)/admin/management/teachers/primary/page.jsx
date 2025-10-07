
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  School,
  Users,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useTeachers, useDeleteTeacher } from "@/hooks/admin/management";

export default function PrimaryTeachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12); 

  const { data, isLoading, isError, error, isFetching } = useTeachers({
    page,
    pageSize,
    search: searchTerm,
    status: filterStatus,
    level: "primary",
  });

  const { mutateAsync: deleteTeacher } = useDeleteTeacher();

  const items = data?.items ?? data ?? [];
  const total = data?.total ?? items.length ?? 0;
  const filteredTeachers = items 

  const stats = {
    total: total,
    active: data?.active ?? 0,
    onLeave: data?.onLeave ?? 0,
    subjects: data?.subjects ?? 0,
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/management/teachers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Teachers
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <School className="w-8 h-8 text-green-600" />
              Primary Level Teachers
            </h1>
            <p className="text-muted-foreground">
              Manage teachers for grades 1-5
            </p>
          </div>
        </div>
        <Link href="/admin/management/teachers/primary/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Teacher
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.onLeave}</p>
                <p className="text-sm text-muted-foreground">On Leave</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.subjects}</p>
                <p className="text-sm text-muted-foreground">Subjects Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                All ({stats.total})
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                onClick={() => setFilterStatus("active")}
              >
                Active ({stats.active})
              </Button>
              <Button
                variant={filterStatus === "on leave" ? "default" : "outline"}
                onClick={() => setFilterStatus("on leave")}
              >
                On Leave ({stats.onLeave})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <Card className="col-span-full"><CardContent className="p-6">Loading…</CardContent></Card>
        ) : isError ? (
          <Card className="col-span-full"><CardContent className="p-6 text-destructive">{String(error?.message || "Failed to load")}</CardContent></Card>
        ) : filteredTeachers.length === 0 ? (
          <Card className="col-span-full"><CardContent className="p-6 text-muted-foreground">No teachers found.</CardContent></Card>
        ) : (
        filteredTeachers.map((teacher) => (
          <Card key={teacher._id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{teacher.englishName}</p>
                  </div>
                </div>
                <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                  {teacher.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{teacher.address}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Qualification:</p>
                <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Teaching Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{subject.name}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Classes:</p>
                <div className="flex flex-wrap gap-1">
                  {teacher?.classes?.map((cls, idx) => (
                    <Badge key={cls._id} variant="outline" className="text-xs">{cls.fullName}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-sm font-medium">{teacher.experience}</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{teacher.salary}</p>
                  <p className="text-xs text-muted-foreground">Monthly Salary</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Link href={`/admin/management/teachers/primary/${teacher._id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Link href={`/admin/management/teachers/primary/${teacher._id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(teacher._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 items-center justify-end">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="text-sm">Page {page}</span>
        <Button size="sm" variant="outline" disabled={filteredTeachers.length < pageSize || page * pageSize >= total} onClick={() => setPage((p) => p + 1)}>Next</Button>
        {isFetching && <span className="text-xs text-muted-foreground ml-2">Updating…</span>}
      </div>
    </div>
  );
}
