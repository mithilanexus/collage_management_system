import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";

export async function GET() {
    return Response.json({
        message: "Teacher is assigned"
    })
}


export async function DELETE(request, context) {
    try {
        const assignedClassId = context.params.assignedClassId;
        const subjectId = context.params.subjectId;
        console.log(assignedClassId, subjectId);

        if (!assignedClassId) {
            return Response.json({
                message: "Missing assignedClassId",
                success: false
            }, { status: 400 });
        }


        const res = await PrimarySubjectModel.findOneAndUpdate(
            { _id: subjectId },
            { $pull: { assignedClasses: { classId: assignedClassId } } },
            { new: true }
        );

        if (!res) {
            return Response.json({
                message: "No teacher assignment found to unassign",
                success: false
            }, { status: 404 });
        }

        return Response.json({
            message: "Teacher unassigned successfully",
            success: true,
            data: res
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