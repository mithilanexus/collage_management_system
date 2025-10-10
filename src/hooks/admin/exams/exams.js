"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

// Exam Schedules
export function useExamSchedules(options = {}) {
  const queryKey = adminKeys.examSchedule({});
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.examSchedule),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useSaveExamSchedule(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.examSchedule, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.examSchedule({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// Exam Results
export function useExamResults(params = {}, options = {}) {
  const queryKey = adminKeys.examResults(params);
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.examResults, { params }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useSaveExamResult(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    // Accepts { payload, method } to support POST and PUT like the current page does
    mutationFn: ({ payload, method = "POST" }) =>
      http.request({ url: adminApi.examResults, method, data: payload }),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.examResults({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useDeleteExamResult(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => http.del(`${adminApi.examResults}?id=${encodeURIComponent(id)}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.examResults({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

// Exam Attendance
export function useExamAttendance(params = {}, options = {}) {
  const queryKey = adminKeys.examAttendance(params);
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.examAttendance, { params }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useSaveExamAttendance(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.examAttendance, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.examAttendance({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
