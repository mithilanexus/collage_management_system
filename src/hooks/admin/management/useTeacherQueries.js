"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useTeachers({ id, page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.teachers({ id, page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => {
      if (id) {
        return http.get(`${adminApi.teachers}/primary/${id}`);
      }
      return http.get(adminApi.teachers + "/primary", { params: { page, limit: pageSize, search } });
    },
    enabled: options.enabled ?? (!!id || page > 0),
    ...options,
  });
}

export function useUpdateTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, payload }) => http.put(`${adminApi.teachers}/primary/${teacherId}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({ id: variables.teacherId }) });
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (teacherId) => http.del(`${adminApi.teachers}/primary/${teacherId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useCreateTeacher(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.teachers+"/primary", payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.teachers({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
