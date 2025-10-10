"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useEvents({ page = 1, pageSize = 10, search = "" } = {}, options = {}) {
  const queryKey = adminKeys.events({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.events, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useEvent(id, options = {}) {
  const queryKey = adminKeys.events({ id });
  return useQuery({
    queryKey,
    queryFn: () => http.get(`${adminApi.events}/${id}`),
    enabled: options.enabled ?? !!id,
    ...options,
  });
}

export function useCreateEvent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.events, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.events({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useUpdateEvent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => http.put(`${adminApi.events}/${id}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.events({ id: variables.id }) });
        await qc.invalidateQueries({ queryKey: adminKeys.events({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteEvent(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => http.del(`${adminApi.events}/${id}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.events({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
