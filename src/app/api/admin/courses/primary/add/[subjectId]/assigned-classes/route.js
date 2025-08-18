import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";

export async function GET() {
    Response.json({
        message: "Teacher is assigned"
    })

}
export async function POST(request, context) {
    try {
        const req = await request.json();

        const updatedSubject = await PrimarySubjectModel.findByIdAndUpdate(
            req.subjectId,             // directly pass the id
            { $set: { assignedClasses: req } },   // update only this field
            { new: true }                         // return the updated document
        );

        return Response.json({
            message: "Classes data updated",
            success: true,
            data: updatedSubject
        });

    } catch (error) {
        console.error(error);
        return Response.json({
            message: "Failed to update classes data",
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
