import { z } from "zod";

export const PrimarySubjectSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  type: z.string().min(1),
  mandatory: z.boolean().optional().default(false),
  description: z.string().min(1),
  status: z.string().min(1).default("active"),
  subjectLevel: z.string().optional(),
  objectives: z.union([
    z.string().transform((s) => s.split("\n").map((x) => x.trim()).filter(Boolean)),
    z.array(z.string()).transform((arr) => arr.map((x) => x.trim()).filter(Boolean)),
  ]).optional().default([]),
});

export const EventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().or(z.date()).transform((v) => new Date(v)),
  time: z.string().min(1).optional(),
  location: z.string().min(1),
  organizer: z.string().min(1).optional(),
  category: z.string().min(1),
  status: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
});

export const ResourceSchema = z.object({
  resourceName: z.string().min(1),
  category: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  availability: z.string().min(1),
  location: z.string().min(1),
  capacity: z.string().min(1),
  currentUsage: z.number().int().nonnegative(),
  cost: z.string().min(1),
  provider: z.string().min(1),
  status: z.string().min(1),
  accessMethod: z.string().min(1),
  supportContact: z.string().min(1),
  lastUpdated: z.string().or(z.date()).transform((v) => new Date(v)),
  image: z.string().min(1),
  features: z.array(z.string()).default([]),
});

export const AnnouncementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  priority: z.string().min(1),
  targetAudience: z.string().min(1),
  publishDate: z.string().or(z.date()).transform((v) => new Date(v)),
  expiryDate: z.string().or(z.date()).transform((v) => new Date(v)),
  status: z.string().min(1),
  author: z.string().min(1),
  isPinned: z.boolean().optional().default(false),
  views: z.number().int().nonnegative().optional().default(0),
  image: z.string().min(1),
});

export const StudentCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  class: z.string().min(1),
  section: z.string().min(1),
  rollNumber: z.string().min(1),
  admissionDate: z.string().or(z.date()).transform((v) => new Date(v)),
  status: z.string().optional(),
  phone: z.string().min(3),
  email: z.string().email(),
  dateOfBirth: z.string().or(z.date()).transform((v) => new Date(v)),
  parentId: z.string().optional().nullable(),
});

export const PrimaryScheduleUpsertSchema = z.object({
  classGrade: z.string().min(1),
  classId: z.string().min(1),
  timeSlots: z.array(z.object({
    periodNumber: z.number().int().min(1),
    start: z.string().min(1),
    end: z.string().min(1),
  })).optional(),
  schedule: z.array(z.object({
    day: z.string().min(1).optional(),
    subjects: z.array(z.object({
      periodNumber: z.number().int().min(1),
      subjectName: z.string().optional(),
      subjectId: z.string().optional(),
      teacherId: z.string().optional(),
      teacherName: z.string().optional(),
    })).optional().default([]),
  })).optional().default([]),
});

// Exam results payload validation
export const ExamResultSchema = z.object({
  studentId: z.string().min(1),
  examId: z.string().min(1),
  examName: z.string().min(1),
  studentName: z.string().min(1),
  rollNumber: z.union([z.string(), z.number()]).transform((v) => String(v)),
  class: z.string().min(1),
  status: z.string().optional(),
  subjects: z.array(
    z.object({
      name: z.string().optional(),
      totalMarks: z.number().nonnegative(),
      marksObtained: z.number().min(0),
    })
  ).min(1),
});

// Exam attendance payload validation
export const ExamAttendanceSchema = z.object({
  studentId: z.string().min(1),
  examId: z.string().min(1),
  class: z.string().min(1),
  examDate: z.string().or(z.date()).transform((v) => new Date(v)),
  subject: z.string().min(1),
  status: z.string().min(1),
});
