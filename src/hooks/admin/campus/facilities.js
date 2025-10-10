"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useFacilities({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.resources({ page, pageSize, search }); // reuse resources keyspace for campus list
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.facilities, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useFacility(id, options = {}) {
  const queryKey = adminKeys.resources({ id });
  return useQuery({
    queryKey,
    queryFn: () => http.get(`${adminApi.facilities}/${id}`),
    enabled: options.enabled ?? !!id,
    ...options,
  });
}

export function useCreateFacility(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.facilities, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.resources({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useUpdateFacility(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => http.put(`${adminApi.facilities}/${id}`, payload),
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

export function useDeleteFacility(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => http.del(`${adminApi.facilities}/${id}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.resources({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
