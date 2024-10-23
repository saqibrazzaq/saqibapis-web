import PagedReq from "@/models/PagedRequest";
import Common from "@/util/Common";

export class PersonSearchReq extends PagedReq {
  countryId?: string;
  stateId?: string;
  constructor(
    { pageIndex = 0, pageSize = Common.DEFAULT_PAGE_SIZE, orderBy = "", searchText = "" }: PagedReq,
    { countryId = "", stateId = "" }
  ) {
    super({
      pageIndex: pageIndex,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.countryId = countryId;
    this.stateId = stateId;
  }
}
