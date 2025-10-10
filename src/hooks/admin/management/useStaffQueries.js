"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useStaff({ id, page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.staff({ id, page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => {
      if (id) {
        return http.get(`${adminApi.staff}/${id}`);
      }
      return http.get(adminApi.staff, { params: { page, limit: pageSize, search } });
    },
    enabled: options.enabled ?? (!!id || page > 0),
    ...options,
  });
}

export function useUpdateStaff(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ staffId, payload }) => http.put(`${adminApi.staff}/${staffId}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.staff({ id: variables.staffId }) });
        await qc.invalidateQueries({ queryKey: adminKeys.staff({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteStaff(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (staffId) => http.del(`${adminApi.staff}/${staffId}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.staff({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useCreateStaff(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.staff, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.staff({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
