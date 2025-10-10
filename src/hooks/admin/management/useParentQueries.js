"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useParents({ id, page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.parents({ id, page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => {
      if (id) {
        return http.get(`${adminApi.parents}/${id}`);
      }
      return http.get(adminApi.parents, { params: { page, limit: pageSize, search } });
    },
    enabled: options.enabled ?? (!!id || page > 0),
    ...options,
  });
}

export function useDeleteParent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (parentId) => http.del(`${adminApi.parents}/${parentId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.parents({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useRemoveStudentFromParent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ parentId, studentId }) => http.del(`${adminApi.parents}/${parentId}/students/${studentId}`),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.parents({ id: variables.parentId }) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useAddStudentToParent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ parentId, studentIds }) => http.post(`${adminApi.parents}/${parentId}/add-student/${studentIds}`),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.parents({ id: variables.parentId }) });
        await qc.invalidateQueries({ queryKey: adminKeys.students({}) });
      } catch (_) { }
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useCreateParent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.parents, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.parents({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useAddStudents({ parentId, search = "" } = {}, options = {}) {
  return useQuery({
    // Use students key with a scope to prevent colliding with parent detail cache
    queryKey: adminKeys.students({ scope: "add-to-parent", parentId, search }),
    queryFn: () =>
      http.get(`${adminApi.parents}/${parentId}/add-student`, {
        params: { search },
      }),
    enabled: options.enabled ?? !!parentId,
    ...options,
  });
}