import Common from "@/util/Common";

export default class PagedReq {
  skip?: number = 0;
  take?: number = Common.DEFAULT_PAGE_SIZE;
  orderBy?: string = "";
  searchText?: string = "";

  constructor({
    skip = 0,
    take = Common.DEFAULT_PAGE_SIZE,
    orderBy = "",
    searchText = "",
  }: PagedReq) {
    this.skip = skip;
    this.take = take;
    this.orderBy = orderBy;
    this.searchText = searchText;
  }
}
