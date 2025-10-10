"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

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

export function useResource(id, options = {}) {
  const queryKey = adminKeys.resources({ id });
  return useQuery({
    queryKey,
    queryFn: () => http.get(`${adminApi.resources}/${id}`),
    enabled: options.enabled ?? !!id,
    ...options,
  });
}

export function useCreateResource(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.resources, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.resources({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useUpdateResource(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => http.put(`${adminApi.resources}/${id}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.resources({ id: variables.id }) });
        await qc.invalidateQueries({ queryKey: adminKeys.resources({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteResource(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => http.del(`${adminApi.resources}/${id}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.resources({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
