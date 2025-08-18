import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";

export async function GET() {
   return  Response.json({
        message: "Teacher is assigned"
    })

}
export async function POST(request, context) {
    try {
        const req = await request.json();

        // Update the subject: remove existing class if it matches, then add new req
        const updatedSubject = await PrimarySubjectModel.findByIdAndUpdate(
            req.subjectId,
            [
                // Step 1: Remove existing class if grade matches
                {
                    $set: {
                        assignedClasses: {
                            $filter: {
                                input: '$assignedClasses',
                                as: 'cls',
                                cond: { $ne: ['$$cls.class', req.class] }
                            }
                        }
                    }
                },
                // Step 2: Add the new req to assignedClasses
                {
                    $set: {
                        assignedClasses: {
                            $concatArrays: [
                                '$assignedClasses',
                                [{ ...req }]
                            ]
                        }
                    }
                }
            ],
            { new: true }
        );

        if (!updatedSubject) {
            return Response.json({
                message: "Subject not found",
                success: false
            }, { status: 404 });
        }

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