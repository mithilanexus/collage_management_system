export function parsePageParams(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const pageSize = Math.min(
    Math.max(parseInt(searchParams.get("limit") || searchParams.get("pageSize") || "10", 10), 1),
    100
  );
  const search = (searchParams.get("search") || "").trim();
  return { page, pageSize, search };
}

export async function paginateQuery(query, page, pageSize) {
  const skip = (page - 1) * pageSize;
  const [data, total] = await Promise.all([
    query.skip(skip).limit(pageSize),
    query.model.countDocuments(query.getQuery()),
  ]);
  return { data, total, page, pageSize };
}
