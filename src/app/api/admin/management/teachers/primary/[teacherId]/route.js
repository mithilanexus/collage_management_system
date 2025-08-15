import PrimaryLevelTeacherModel from "@/models/admin/management/teacher/primaryLevel/primaryLevelTeacher.model";

export async function GET(request, context) {
    try {
        const teacherId = await context.params.teacherId;
        const teacher = await PrimaryLevelTeacherModel.findOne({ _id: teacherId }).lean();
        return Response.json({
            message: "Teacher data retrieved successfully",
            success: true,
            data: teacher,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve teacher data",
            success: false,
            error: error.message,
        });
    }
}

export async function PUT(request, context) {
    try {
        const teacherId = await context.params.teacherId;
        const body = await request.json();
        const teacher = await PrimaryLevelTeacherModel.findOneAndUpdate({ _id: teacherId }, body, { new: true });
        return Response.json({
            message: "Teacher updated successfully",
            success: true,
            data: teacher,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to update teacher",
            success: false,
            error: error.message,
        });
    }
}

export async function DELETE(request, context) {
    try {
        const teacherId = await context.params.teacherId;
        await PrimaryLevelTeacherModel.findOneAndDelete({ _id: teacherId });
        return Response.json({
            message: "Teacher deleted successfully",
            success: true,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to delete teacher",
            success: false,
            error: error.message,
        });
    }
}
