import PrimaryLevelTeacherModel from "@/models/admin/management/teacher/primaryLevel/primaryLevelTeacher.model";
import "@/models";
export async function GET() {
    try {
        const teachers = await PrimaryLevelTeacherModel.find({})
            .populate({
                path: 'subjects',
                model: 'PrimarySubject',
            })
            .lean();
        return Response.json({
            message: "Teachers data retrieved successfully",
            success: true,
            data: teachers,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve teachers data",
            success: false,
            error,
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
            error,
        });
    }
}