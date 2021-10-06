import { Model } from "../model";
// import { Vehicles } from "@/models";

export default class Emergencies extends Model {
  static ENDPOINT_PATH = "emergencies/";

  static NAME = "Emergencies";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    date: { type: Model.TYPES.Date, default: "" },
    keyword: { type: Model.TYPES.String, default: "" },
    e_number: { type: Model.TYPES.String, default: "" },
    vehicles: { type: Model.TYPES.Array, default: [] },
  };

  constructor(obj) {
    super(Emergencies.MAPPING, Emergencies.ENDPOINT_PATH, obj);
  }
}
