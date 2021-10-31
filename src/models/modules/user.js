import { Model } from "../model";
// import { Members } from "@/models";

export default class User extends Model {
  static ENDPOINT_PATH = "users/";

  static NAME = "Users";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    first_name: { type: Model.TYPES.String, default: "" },
    last_name: { type: Model.TYPES.String, default: "" },
    email: { type: Model.TYPES.String, default: "" },
    member_id: { type: Model.TYPES.Number, default: undefined },
    role: { type: Model.TYPES.Number, default: 0 },
  };

  constructor(obj) {
    super(User.MAPPING, User.ENDPOINT_PATH, obj);
  }

  getFullname() {
    return this.first_name + " " + this.last_name;
  }

  Calculations() {
    if (this.member_id) {
      console.log("K", this.member_id);
      console.log("Mem", window.app.$store.getters["Members/all"]);
      const res = window.app.$store.getters["CalculationMembers/all"](
        this.member_id
      );
      console.log("Result", res);
      return res;
    }
    return [];
  }
}
