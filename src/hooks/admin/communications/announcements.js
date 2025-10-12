"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/admin/http";
import { adminApi } from "@/lib/admin/endpoints";
import { adminKeys } from "@/lib/admin/queryKeys";

export function useAnnouncements(params = { page: 1, pageSize: 10, search: "" }, options = {}) {
  const { page = 1, pageSize = 10, search = "" } = params || {};
  const queryKey = adminKeys.announcements({ page, pageSize, search });
  return useQuery({
    queryKey,
    queryFn: () => http.get(adminApi.announcements, { params: { page, limit: pageSize, search } }),
    keepPreviousData: true,
    staleTime: 60_000,
    ...options,
  });
}

export function useAnnouncement(id, options = {}) {
  const queryKey = adminKeys.announcements({ id });
  return useQuery({
    queryKey,
    queryFn: () => http.get(`${adminApi.announcements}/${id}`),
    enabled: options.enabled ?? !!id,
    ...options,
  });
}

export function useCreateAnnouncement(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => http.post(adminApi.announcements, payload),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.announcements({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}

export function useUpdateAnnouncement(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => http.put(`${adminApi.announcements}/${id}`, payload),
    onSuccess: async (data, variables, context) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.announcements({ id: variables.id }) });
        await qc.invalidateQueries({ queryKey: adminKeys.announcements({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export function useDeleteAnnouncement(options = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => http.del(`${adminApi.announcements}/${id}`),
    onSuccess: async (...args) => {
      try {
        await qc.invalidateQueries({ queryKey: adminKeys.announcements({}) });
      } catch (_) {}
      if (options.onSuccess) return options.onSuccess(...args);
    },
    ...options,
  });
}
