import ExamAttendanceModel from "@/models/admin/exam/exam_attendance.model";

export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url);
        const examId = searchParams.get('examId');
        const class_ = searchParams.get('class');
        const status = searchParams.get('status');
        const date = searchParams.get('date');

        let query = {};
        if (examId && examId !== 'all') query.examId = examId;
        if (class_ && class_ !== 'all') query.class = class_;
        if (status && status !== 'all') query.status = status;
        if (date && date !== 'all') query.examDate = new Date(date);

        const attendance = await ExamAttendanceModel.find(query)
            .populate('examId', 'examName')
            .sort({ examDate: -1, createdAt: -1 })
            .lean();

        return Response.json({
            message: "Attendance records fetched successfully",
            success: true,
            data: attendance,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to fetch attendance",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const reqData = await req.json();

        const existingRecord = await ExamAttendanceModel.findOne({
            studentId: reqData.studentId,
            examId: reqData.examId,
            examDate: reqData.examDate,
            subject: reqData.subject
        });

        let result;
        if (existingRecord) {
            result = await ExamAttendanceModel.findByIdAndUpdate(
                existingRecord._id,
                reqData,
                { new: true }
            );
        } else {
            result = await ExamAttendanceModel.create(reqData);
        }

        return Response.json({
            message: "Attendance saved successfully",
            success: true,
            data: result,
        });
    } catch (error) {
        return Response.json({
            message: "Failed to save attendance",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
