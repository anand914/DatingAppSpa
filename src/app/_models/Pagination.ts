export interface Pagination {
 currentpPage: number;
 itemsPerPage: number;
 totalItems: number;
 totalPages: number;
}

export class PaginationResult<T> {
    result: T;
    Pagination: Pagination;
}
