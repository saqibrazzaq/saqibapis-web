import PagedReq from "@/models/PagedRequest";
import Common from "@/util/Common";

export class StateSearchReq extends PagedReq {
  countryId?: string;
  // userId?: string;
  constructor(
    {
      pageIndex: skip = 0,
      pageSize: take = Common.DEFAULT_PAGE_SIZE,
      orderBy = "",
      searchText = "",
    }: PagedReq,
    { countryId = "" }
  ) {
    super({
      pageIndex: skip,
      pageSize: take,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.countryId = countryId;
    // this.userId = userId;
  }
}
