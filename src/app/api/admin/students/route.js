 

export async function GET(req) {
    try { 
        
        const { searchParams } = new URL(req.url);
        const class_ = searchParams.get('class');
        const section = searchParams.get('section');

        // For now, return dummy data since we don't have a Student model yet
        // This can be replaced with actual database queries later
        const dummyStudents = [
            { _id: "std-1", name: "Aarav Sharma", rollNumber: "2025001", class: "Grade 1", section: "A", email: "aarav@school.edu" },
            { _id: "std-2", name: "Priya Patel", rollNumber: "2025002", class: "Grade 1", section: "A", email: "priya@school.edu" },
            { _id: "std-3", name: "Rohan Singh", rollNumber: "2025003", class: "Grade 2", section: "A", email: "rohan@school.edu" },
            { _id: "std-4", name: "Ananya Gupta", rollNumber: "2025004", class: "Grade 2", section: "B", email: "ananya@school.edu" },
            { _id: "std-5", name: "Vikram Kumar", rollNumber: "2025005", class: "Grade 3", section: "A", email: "vikram@school.edu" },
            { _id: "std-6", name: "Sneha Reddy", rollNumber: "2025006", class: "Grade 3", section: "B", email: "sneha@school.edu" },
            { _id: "std-7", name: "Arjun Mehta", rollNumber: "2025007", class: "Grade 4", section: "A", email: "arjun@school.edu" },
            { _id: "std-8", name: "Kavya Joshi", rollNumber: "2025008", class: "Grade 4", section: "B", email: "kavya@school.edu" },
            { _id: "std-9", name: "Rahul Verma", rollNumber: "2025009", class: "Grade 5", section: "A", email: "rahul@school.edu" },
            { _id: "std-10", name: "Pooja Nair", rollNumber: "2025010", class: "Grade 5", section: "B", email: "pooja@school.edu" }
        ];

        let filteredStudents = dummyStudents;

        if (class_ && class_ !== 'all') {
            filteredStudents = filteredStudents.filter(student => student.class === class_);
        }

        if (section && section !== 'all') {
            filteredStudents = filteredStudents.filter(student => student.section === section);
        }

        return Response.json({
            message: "Students fetched successfully",
            success: true,
            data: filteredStudents,
        });

    } catch (error) {
        console.error("Error fetching students:", error);
        return Response.json({
            message: "Failed to fetch students",
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
