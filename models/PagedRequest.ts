import Common from "@/util/Common";

export default class PagedReq {
  pageIndex?: number = 0;
  pageSize?: number = Common.DEFAULT_PAGE_SIZE;
  orderBy?: string = "";
  searchText?: string = "";

  constructor({
    pageIndex = 0,
    pageSize = Common.DEFAULT_PAGE_SIZE,
    orderBy = "",
    searchText = "",
  }: PagedReq) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
    this.searchText = searchText;
  }
}
