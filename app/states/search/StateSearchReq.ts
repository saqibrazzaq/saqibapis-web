import PagedReq from "@/models/PagedRequest";
import Common from "@/util/Common";

export class StateSearchReq extends PagedReq {
  countryId?: string;
  // userId?: string;
  constructor(
    { skip = 0, take = Common.DEFAULT_PAGE_SIZE, orderBy = "", searchText = "" }: PagedReq,
    { countryId = "" }
  ) {
    super({
      skip,
      take,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.countryId = countryId;
    // this.userId = userId;
  }
}
