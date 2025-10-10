import ExamAttendanceModel from "@/models/admin/exam/exam_attendance.model";
import connectDB from "@/lib/coonectDb";
import { ok, serverError, badRequest } from "@/lib/apiResponse";
import { ExamAttendanceSchema } from "@/lib/validation/admin";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get('examId');
    const class_ = searchParams.get('class');
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    const query = {};
    if (examId && examId !== 'all') query.examId = examId;
    if (class_ && class_ !== 'all') query.class = class_;
    if (status && status !== 'all') query.status = status;
    if (date && date !== 'all') query.examDate = new Date(date);

    const attendance = await ExamAttendanceModel.find(query)
      .populate('examId', 'examName')
      .sort({ examDate: -1, createdAt: -1 })
      .lean();

    return ok(attendance, "Attendance records fetched successfully");
  } catch (error) {
    return serverError("Failed to fetch attendance", error.message);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const reqData = await req.json();
    const parsed = ExamAttendanceSchema.safeParse(reqData);
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const safeData = parsed.data;

    const existingRecord = await ExamAttendanceModel.findOne({
      studentId: safeData.studentId,
      examId: safeData.examId,
      examDate: safeData.examDate,
      subject: safeData.subject,
    });

    let result;
    if (existingRecord) {
      result = await ExamAttendanceModel.findByIdAndUpdate(
        existingRecord._id,
        safeData,
        { new: true }
      );
    } else {
      result = await ExamAttendanceModel.create(safeData);
    }

    return ok(result, "Attendance saved successfully");
  } catch (error) {
    return serverError("Failed to save attendance", error.message);
  }
}
