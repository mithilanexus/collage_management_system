"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useStudents({ id, page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.students({ id, page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => {
      if (id) {
        return http.get(`${adminApi.students}/${id}`);
      }
      return http.get(adminApi.students, { params: { page, limit: pageSize, search } });
    },
    enabled: options.enabled ?? (!!id || page > 0),
    ...options,
  });
}

export function useUpdateStudent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ studentId, payload }) => http.put(`${adminApi.students}/${studentId}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.students({ id: variables.studentId }) });
        await qc.invalidateQueries({ queryKey: adminKeys.students({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteStudent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (studentId) => http.del(`${adminApi.students}/${studentId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.students({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
