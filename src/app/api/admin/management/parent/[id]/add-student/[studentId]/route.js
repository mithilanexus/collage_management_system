export async function POST(request, { params }) {
  try {
    const parentId = await params.id;
    const studentId = await params.studentId;
    const parent = await parentModel.findOneAndUpdate(
      {
        _id: parentId,
      },
      {
        $push: {
          students: studentId,
        },
        $inc: {
          studentsCount: 1,
        },
      },
      { new: true }
    );
    return Response.json({
      message: "Students added to parent successfully",
      success: true,
      data: parent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to add students to parent",
      success: false,
      error: error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const parentId = await params.id;
    const studentId = await params.studentId;
    const parent = await parentModel.findOneAndUpdate(
      {
        _id: parentId,
      },
      {
        $pull: {
          students: studentId,
        },
        $inc: {
          studentsCount: -1,
        },
      },
      { new: true }
    );
    return Response.json({
      message: "Students removed from parent successfully",
      success: true,
      data: parent,
    });
  } catch (error) {
    return Response.json({
      message: "Failed to remove students from parent",
      success: false,
      error: error.message,
    });
  }
}
