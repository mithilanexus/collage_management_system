import PrimarySubjectModel from "@/models/admin/course/subjects/primarySubject.model";
export async function GET() {
    try {
        const subjects = await PrimarySubjectModel.find({});
        return Response.json({
            message: "Subjects retrieved successfully",
            success: true,
            data: subjects,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to retrieve subjects",
            success: false,
            error: error.message,
        });
    }

}

export async function POST(request) {

    try {
        const req = await request.json();
        req.subjectLevel = "primary";
        req.objectives = req.objectives.split("\n");
        const newSubject = await PrimarySubjectModel.create(req);
        return Response.json({
            message: "Subject added successfully",
            success: true,
            data: newSubject,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to add subject",
            success: false,
            error: error.message,
        });
    }

}