export interface PaginatedRequest<T> {
  pagination: Pagination;
  models: T[];
}
export interface Pagination {
  previous_page: any
  next_page: any
  start_index: number
  end_index: number
  total_entries: number
  total_pages: number
  page: number
}