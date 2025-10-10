"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useCoursesPrimaryClasses(
) {
  return useQuery({
    queryKey: ["pirmaryLevelClasses"],
    queryFn: () => http.get(adminApi.courses + "/primary/classes",),
    keepPreviousData: true, 
  });
}

export function useCourseLevelsPrimary(options = {}) {
  const queryKey = adminKeys.courseLevels();
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.courseLevels),
    keepPreviousData: true,
    staleTime: 300_000,
    ...options,
  });
}

export function useCreateCoursePrimary(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.courses, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.courses({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// ---------- Primary class by ID ----------
export function usePrimaryClass({ id } = {}, options = {}) {
  const queryKey = adminKeys.classes({ id });
  return useQuery({
    queryKey,
    queryFn: () => http.get(`${adminApi.classes}/${id}`),
    enabled: options.enabled ?? !!id,
    ...options,
  });
}

// Create a primary class (separate endpoint)
export function useCreatePrimaryClass(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(`${adminApi.courses}/primary/add`, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.classes({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// Update a primary class
export function useUpdatePrimaryClass(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => http.put(`${adminApi.classes}/${id}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.classes({ id: variables.id }) });
        await qc.invalidateQueries({ queryKey: adminKeys.classes({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

// Create a primary subject
export function useCreateSubject(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.subjects, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.subjects({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// ---------- Primary classes ----------
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

export function useDeleteClass(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (classId) => http.del(`${adminApi.classes}/${classId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.classes({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// ---------- Primary subjects ----------
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

export function useAssignTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ subject, teacher, classId, classGrade }) =>
      http.post(`/api/admin/courses/primary/add/${subject._id}/assigned-classes`, {
        teacher: teacher.name,
        teacherId: teacher._id,
        classId,
        subjectId: subject._id,
        classGrade,
      }),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.subjects({}) });
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useRemoveTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ subject, classId }) =>
      http.del(`/api/admin/courses/primary/add/${subject._id}/assigned-classes/${classId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.subjects({}) });
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// ---------- Primary schedules ----------
export function useSchedules({ classId, level = "primary" } = {}, options = {}) {
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
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}
