export interface IReturnInfinity {
  countAll: number;
  results: never[];
  next: number | undefined;
}

export interface InfiniteQueryResult<T> {
  result: T[];
  count: number;
  countAll: number;
  currentPage: number | null;
  nextPage: boolean;
  totalPages: number;
}