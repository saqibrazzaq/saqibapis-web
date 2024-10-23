import PagedReq from "@/models/PagedRequest";
import Common from "@/util/Common";

export class PersonSearchReq extends PagedReq {
  // planId?: string;
  // userId?: string;
  constructor(
    { pageIndex = 0, pageSize = Common.DEFAULT_PAGE_SIZE, orderBy = "", searchText = "" }: PagedReq,
    {
      // planId = "", userId = ""
    }
  ) {
    super({
      pageIndex: pageIndex,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    // this.planId = planId;
    // this.userId = userId;
  }
}
