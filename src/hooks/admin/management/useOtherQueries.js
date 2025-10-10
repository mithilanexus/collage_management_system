"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useAnnouncements({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.announcements({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.announcements, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useResources({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.resources({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.resources, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useEvents({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.events({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.events, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,

    staleTime: 60_000, // 1 minute
    ...options,
  });
}

export function useSubjects({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.subjects({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.subjects, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useAttendance({ page = 1, pageSize = 10, search = '', classId = '', date = '' } = {}, options = {}) {
  const queryKey = adminKeys.attendance({ page, pageSize, search, classId, date });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.attendance, { params: { page, limit: pageSize, search, classId, date } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useGrades({ page = 1, pageSize = 10, search = '', classId = '', semester = '' } = {}, options = {}) {
  const queryKey = adminKeys.grades({ page, pageSize, search, classId, semester });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.grades, { params: { page, limit: pageSize, search, classId, semester } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useTranscripts({ page = 1, pageSize = 10, search = '', program = '', batch = '', status = '' } = {}, options = {}) {
  const queryKey = adminKeys.transcripts({ page, pageSize, search, program, batch, status });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.transcripts, { params: { page, limit: pageSize, search, program, batch, status } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useAcademicStats(options = {}) {
  const queryKey = adminKeys.academicStats();
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.academicStats),
    keepPreviousData: true,
    staleTime: 300_000, // 5 minutes for stats
    ...options,
  });
}

export function useCourses({ page = 1, pageSize = 10, search = '', level = '' } = {}, options = {}) {
  const queryKey = adminKeys.courses({ page, pageSize, search, level });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.courses, { params: { page, limit: pageSize, search, level } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useCourseLevels(options = {}) {
  const queryKey = adminKeys.courseLevels();
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.courseLevels),
    keepPreviousData: true,
    staleTime: 300_000, // 5 minutes for course levels
    ...options,
  });
}

export function useCreateCourse(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.courses, payload),
    onSuccess: async (...args) => {
      try {
        // Invalidate any cached course lists
        await qc.invalidateQueries({ queryKey: adminKeys.courses({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useDeleteClass(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (classId) => http.del(`${adminApi.classes}/${classId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.classes({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// Fetch list of classes (primary)
export function useClasses({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.classes({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.classes, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useAssignTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(`${adminApi.subjects}/assign-teacher`, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.subjects({}) });
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useRemoveTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ subjectId, classId }) => http.del(`${adminApi.subjects}/${subjectId}/assigned-classes/${classId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.subjects({}) });
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useRemoveSubject(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (subjectId) => http.del(`${adminApi.subjects}/${subjectId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.subjects({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useSchedules({ classId, level } = {}, options = {}) {
  const queryKey = adminKeys.schedules({ classId, level });
  return useQuery({
    queryKey,
    queryFn: () => http.get(`${adminApi.schedules}/${classId}`),
    enabled: !!classId,
    ...options,
  });
}

export function useSaveSchedule(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.schedules, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.schedules({ classId: variables.classId }) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}
