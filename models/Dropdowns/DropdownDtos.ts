export class DropdownReq {
  searchText?: string = "";
  id?: string = "";
  /**
   *
   */
  constructor(searchText?: string, id?: string) {
    this.searchText = searchText;
    this.id = id;
  }
}

export class DropdownRes {
  value: string = "";
  label: string = "";
}
