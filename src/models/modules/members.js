import { Model } from "../model";

export default class Members extends Model {
  static ENDPOINT_PATH = "members/";

  static NAME = "Members";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    first_name: { type: Model.TYPES.String, default: "" },
    last_name: { type: Model.TYPES.String, default: "" },
    email: { type: Model.TYPES.String, default: "" },
  };

  constructor(obj) {
    super(Members.MAPPING, Members.ENDPOINT_PATH, obj);
  }

  getFullname() {
    return this.first_name + " " + this.last_name;
  }
}
