export interface PagedResponse<T> {
  totalRows: number;
  data?: T[];
}
