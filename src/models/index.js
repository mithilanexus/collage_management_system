// This file ensures all models are loaded and registered with Mongoose
import '@/models/admin/course/primary/primaryLevelClass.model';
import '@/models/admin/course/subjects/primarySubject.model';
import '@/models/admin/campus/resources.model'; 
import '@/models/parent/Parent.model';
import '@/models/student/Student.model';
import '@/models/teacher/Teacher.model';

// Add other model imports here as needed

console.log('All models have been registered');
