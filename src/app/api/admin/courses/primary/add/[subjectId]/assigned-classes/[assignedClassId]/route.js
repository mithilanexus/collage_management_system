import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";

export async function GET() {
    return Response.json({
        message: "Teacher is assigned"
    })
}


export async function DELETE(request, context) {
    try {
        const { assignedClassId } = await context.params;

        console.log(assignedClassId);
        const req = await request.json();
        console.log(req);

        if (!assignedClassId) {
            return Response.json({
                message: "Missing assignedClassId",
                success: false
            }, { status: 400 });
        }

        const res = await PrimarySubjectModel.findOneAndUpdate(
            { _id: req.subjectId },
            { $pull: { assignedClasses: { _id: req.assignedClassId } } },
            { new: true }
        );
        console.log(res);

        if (!res) {
            return Response.json({
                message: "No teacher assignment found to unassign",
                success: false
            }, { status: 404 });
        }

        return Response.json({
            message: "Teacher unassigned successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return Response.json({
            message: "Failed to unassign teacher",
            success: false,
            error: error.message
        }, { status: 500 });
    }
}