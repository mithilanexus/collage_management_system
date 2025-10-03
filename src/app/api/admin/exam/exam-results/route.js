import ExamResultModel from "@/models/admin/exam/exam_result.model";

export async function GET(req) {
    try { 
        
        const { searchParams } = new URL(req.url);
        const examId = searchParams.get('examId');
        const studentId = searchParams.get('studentId');
        const class_ = searchParams.get('class');
        const status = searchParams.get('status');

        let query = {};
        
        if (examId && examId !== 'all') {
            query.examId = examId;
        }
        
        if (studentId && studentId !== 'all') {
            query.studentId = studentId;
        }
        
        if (class_ && class_ !== 'all') {
            query.class = class_;
        }
        
        if (status && status !== 'all') {
            query.status = status;
        }

        const results = await ExamResultModel.find(query)
            .populate('examId', 'examName examLevel startDate endDate')
            .populate('studentId', 'name rollNumber class section')
            .sort({ createdAt: -1 })
            .lean();

        return Response.json({
            message: "Exam results fetched successfully",
            success: true,
            data: results,
        });

    } catch (error) {
        console.error("Error fetching exam results:", error);
        return Response.json({
            message: "Failed to fetch exam results",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

export async function POST(req) {
    try { 
        const reqData = await req.json();
        
        // Validate required fields
        const requiredFields = ['studentId', 'examId', 'examName', 'studentName', 'rollNumber', 'class', 'subjects'];
        for (const field of requiredFields) {
            if (!reqData[field]) {
                return Response.json({
                    message: `Missing required field: ${field}`,
                    success: false,
                }, { status: 400 });
            }
        }

        // Calculate totals and percentage
        const totalMarks = reqData.subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
        const obtainedMarks = reqData.subjects.reduce((sum, subject) => sum + subject.marksObtained, 0);
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
            ...reqData,
            totalMarks,
            obtainedMarks,
            percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
            grade: overallGrade,
        };

        // Check if result already exists for this student and exam
        const existingResult = await ExamResultModel.findOne({
            studentId: reqData.studentId,
            examId: reqData.examId
        });

        let result;
        if (existingResult) {
            // Update existing result
            result = await ExamResultModel.findByIdAndUpdate(
                existingResult._id,
                resultData,
                { new: true }
            );
            
            return Response.json({
                message: "Exam result updated successfully",
                success: true,
                data: result,
            });
        } else {
            // Create new result
            result = await ExamResultModel.create(resultData);
            
            return Response.json({
                message: "Exam result created successfully",
                success: true,
                data: result,
            });
        }

    } catch (error) {
        console.error("Error saving exam result:", error);
        return Response.json({
            message: "Failed to save exam result",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

export async function PUT(req) {
    try { 
        
        const reqData = await req.json();
        const { id, ...updateData } = reqData;

        if (!id) {
            return Response.json({
                message: "Result ID is required",
                success: false,
            }, { status: 400 });
        }

        // Recalculate totals if subjects are updated
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

        const result = await ExamResultModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!result) {
            return Response.json({
                message: "Exam result not found",
                success: false,
            }, { status: 404 });
        }

        return Response.json({
            message: "Exam result updated successfully",
            success: true,
            data: result,
        });

    } catch (error) {
        console.error("Error updating exam result:", error);
        return Response.json({
            message: "Failed to update exam result",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {  
        
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({
                message: "Result ID is required",
                success: false,
            }, { status: 400 });
        }

        const result = await ExamResultModel.findByIdAndDelete(id);

        if (!result) {
            return Response.json({
                message: "Exam result not found",
                success: false,
            }, { status: 404 });
        }

        return Response.json({
            message: "Exam result deleted successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error deleting exam result:", error);
        return Response.json({
            message: "Failed to delete exam result",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
