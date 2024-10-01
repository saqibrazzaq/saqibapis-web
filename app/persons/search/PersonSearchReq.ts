import PagedReq from "@/models/PagedRequest";
import Common from "@/util/Common";

export class PersonSearchReq extends PagedReq {
  // planId?: string;
  // userId?: string;
  constructor(
    { skip = 0, take = Common.DEFAULT_PAGE_SIZE, orderBy = "", searchText = "" }: PagedReq,
    {
      // planId = "", userId = ""
    }
  ) {
    super({
      skip,
      take,
      orderBy: orderBy,
      searchText: searchText,
    });
    // this.planId = planId;
    // this.userId = userId;
  }
}
