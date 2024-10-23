import PagedReq from "@/models/PagedRequest";
import Common from "@/util/Common";

export class CountrySearchReq extends PagedReq {
  // planId?: string;
  // userId?: string;
  constructor(
    {
      pageIndex: skip = 0,
      pageSize: take = Common.DEFAULT_PAGE_SIZE,
      orderBy = "",
      searchText = "",
    }: PagedReq,
    {
      // planId = "", userId = ""
    }
  ) {
    super({
      pageIndex: skip,
      pageSize: take,
      orderBy: orderBy,
      searchText: searchText,
    });
    // this.planId = planId;
    // this.userId = userId;
  }
}
