import ExamResultModel from "@/models/admin/exam/exam_result.model";
import connectDB from "@/lib/coonectDb";
import { ok, created, serverError, badRequest, notFound } from "@/lib/apiResponse";
import { ExamResultSchema } from "@/lib/validation/admin";
import { parsePageParams, paginateQuery } from "@/lib/pagination";

export async function GET(req) {
  try { 
    await connectDB();
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get('examId');
    const studentId = searchParams.get('studentId');
    const class_ = searchParams.get('class');
    const status = searchParams.get('status');
    const { page, pageSize } = parsePageParams(req);

    const query = {};
    if (examId && examId !== 'all') query.examId = examId;
    if (studentId && studentId !== 'all') query.studentId = studentId;
    if (class_ && class_ !== 'all') query.class = class_;
    if (status && status !== 'all') query.status = status;

    const baseQuery = ExamResultModel.find(query)
      .populate('examId', 'examName examLevel startDate endDate')
      .populate('studentId', 'name rollNumber class section')
      .sort({ createdAt: -1 })
      .lean();

    const { data, total } = await paginateQuery(baseQuery, page, pageSize);
    return ok({ items: data, total, page, pageSize }, "Exam results fetched successfully");
  } catch (error) {
    console.error("Error fetching exam results:", error);
    return serverError("Failed to fetch exam results", error.message);
  }
}

export async function POST(req) {
  try { 
    await connectDB();
    const reqData = await req.json();
    const parsed = ExamResultSchema.safeParse(reqData);
    if (!parsed.success) {
      return badRequest("Validation failed", parsed.error.flatten());
    }
    const safeData = parsed.data;

    // Calculate totals and percentage
    const totalMarks = safeData.subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
    const obtainedMarks = safeData.subjects.reduce((sum, subject) => sum + subject.marksObtained, 0);
    const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

    // Determine overall grade based on percentage
    let overallGrade = 'F';
    if (percentage >= 90) overallGrade = 'A+';
    else if (percentage >= 80) overallGrade = 'A';
    else if (percentage >= 70) overallGrade = 'B+';
    else if (percentage >= 60) overallGrade = 'B';
    else if (percentage >= 50) overallGrade = 'C';
    else if (percentage >= 40) overallGrade = 'D';

    const resultData = {
      ...safeData,
      totalMarks,
      obtainedMarks,
      percentage: Math.round(percentage * 100) / 100,
      grade: overallGrade,
    };

    const existingResult = await ExamResultModel.findOne({
      studentId: safeData.studentId,
      examId: safeData.examId,
    });

    if (existingResult) {
      const result = await ExamResultModel.findByIdAndUpdate(existingResult._id, resultData, { new: true });
      return ok(result, "Exam result updated successfully");
    } else {
      const result = await ExamResultModel.create(resultData);
      return created(result, "Exam result created successfully");
    }

  } catch (error) {
    console.error("Error saving exam result:", error);
    return serverError("Failed to save exam result", error.message);
  }
}

export async function PUT(req) {
  try { 
    await connectDB();
    const reqData = await req.json();
    const { id, ...updateData } = reqData;
    if (!id) return badRequest("Result ID is required");

    if (updateData.subjects) {
      const totalMarks = updateData.subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
      const obtainedMarks = updateData.subjects.reduce((sum, subject) => sum + subject.marksObtained, 0);
      const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;
      let overallGrade = 'F';
      if (percentage >= 90) overallGrade = 'A+';
      else if (percentage >= 80) overallGrade = 'A';
      else if (percentage >= 70) overallGrade = 'B+';
      else if (percentage >= 60) overallGrade = 'B';
      else if (percentage >= 50) overallGrade = 'C';
      else if (percentage >= 40) overallGrade = 'D';
      updateData.totalMarks = totalMarks;
      updateData.obtainedMarks = obtainedMarks;
      updateData.percentage = Math.round(percentage * 100) / 100;
      updateData.grade = overallGrade;
    }

    const result = await ExamResultModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) return notFound("Exam result not found");
    return ok(result, "Exam result updated successfully");
  } catch (error) {
    console.error("Error updating exam result:", error);
    return serverError("Failed to update exam result", error.message);
  }
}

export async function DELETE(req) {
  try {  
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return badRequest("Result ID is required");

    const result = await ExamResultModel.findByIdAndDelete(id);
    if (!result) return notFound("Exam result not found");
    return ok(null, "Exam result deleted successfully");
  } catch (error) {
    console.error("Error deleting exam result:", error);
    return serverError("Failed to delete exam result", error.message);
  }
}
