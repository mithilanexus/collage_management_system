import PrimaryLevelTeacherModel from "@/models/admin/management/teacher/primaryLevel/primaryLevelTeacher.model";
import '@/models'
import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";
import PrimaryLevelClassModel from "@/models/admin/course/primary/primaryLevelClass.model";

export async function GET() {
    try {
        const teachers = await PrimaryLevelTeacherModel.find({}).lean().populate([
            {
                path: "subjects",
                model: PrimarySubjectModel,
                select: "name",
            },
            {
                path: "classes",
                model: PrimaryLevelClassModel,
                select: "fullName",
            },
        ]);
        return Response.json({
            message: "Teachers data retrieved successfully",
            success: true,
            data: teachers,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve teachers data",
            success: false,
            error: error.message,
        });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const teacher = await PrimaryLevelTeacherModel.create(body);
        return Response.json({
            message: "Teacher created successfully",
            success: true,
            data: teacher,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to create teacher",
            success: false,
            error: error.message,
        });
    }
}