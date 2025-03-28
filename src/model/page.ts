export type Paging = {
  total: number;
  limit: number;
  page: number;
};

export type Pageable<T> = {
  data: Array<T>;
  paging: Paging;
};
