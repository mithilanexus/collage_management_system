
import { useSubjects } from "@/hooks/admin/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";
import { ArrowLeft, Save,User, BookOpen, AlertCircle, Plus, X, Download, Printer, Edit, Trash2, Mail, Phone, MapPin, Calendar, Award, Users, Star, Clock, Target,Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function SubjectsTab({ classData }) {
    const params = useParams();
    const { data: subjectsData, isLoading: loadingSubjects } = useSubjects({
        classId: params.id,
        level: "primary",
    });
    const subjects = subjectsData || [];
    
    return ( 
        <>
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Subject Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage curriculum subjects and their weekly allocations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
          <Link href={`/admin/courses/primary/${params.id}/add-subject`}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </Link>
        </div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{classData.subjects.length}</p>
            <p className="text-sm text-muted-foreground">Total Subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{classData.subjects.filter(s => s.mandatory).length}</p>
            <p className="text-sm text-muted-foreground">Mandatory</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{10}</p>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{new Set(classData.subjects.map(s => s.teacher)).size}</p>
            <p className="text-sm text-muted-foreground">Teachers</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classData.subjects.map((subject, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{subject.name}</h4>
                  <p className="text-sm text-muted-foreground">Code: {subject.code}</p>
                </div>
                <Badge
                  variant={subject.mandatory ? "default" : "secondary"}
                  className={`text-xs ${subject.mandatory ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {subject.mandatory ? "Required" : "Optional"}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">Weekly Hours</span>
                  <Badge variant="outline">{subject.weeklyHours || 0} h</Badge>
                </div>
                <div className="flex items-center gap-2 p-2  bg-muted/50 rounded">
                  {
                    subject.teacher ? (
                      <>
                        <User className="w-4 h-4  " />
                        <span className="text-sm font-medium ">{subject.teacher}</span>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 bg-muted/50 rounded justify-between w-full">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 " />
                          <span className="text-sm font-medium ">Not Assigned</span>
                        </div>
                        <Button variant="default" size="sm" className=" ">
                          <Edit className="w-3 h-3 mr-1" />
                          Assign Teacher
                        </Button>
                      </div>
                    )
                  }
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="px-2">
                  <Calendar className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </>

    );
}
