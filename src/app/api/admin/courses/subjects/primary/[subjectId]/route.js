import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";
export async function GET(request, context) {
    try {
        const subject = await PrimarySubjectModel.findById(context.params.subjectId);
        return Response.json({
            message: "Subject retrieved successfully",
            success: true,
            data: subject,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve subject",
            success: false,
            error: error.message,
        });
    }
}

export async function PUT(request, context) {
    try {
        const req = await request.json();
        const updatedSubject = await PrimarySubjectModel.findByIdAndUpdate(context.params.subjectId, req, { new: true });
        return Response.json({
            message: "Subject updated successfully",
            success: true,
            data: updatedSubject,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to update subject",
            success: false,
            error: error.message,
        });
    }

}

export async function DELETE(request, context) {
    try {
        const deletedSubject = await PrimarySubjectModel.findByIdAndDelete(context.params.subjectId);
        return Response.json({
            message: "Subject deleted successfully",
            success: true,
            data: deletedSubject,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to delete subject",
            success: false,
            error: error.message,
        });
    }
}
