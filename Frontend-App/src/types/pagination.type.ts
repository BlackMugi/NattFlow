export interface PaginationDTO<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}