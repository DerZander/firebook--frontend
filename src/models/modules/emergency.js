import { Model } from "../model";

export default class Emergency extends Model {
  static ENDPOINT_PATH = "emergencies/";

  static NAME = "Emergency";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    date: { type: Model.TYPES.Date, default: "" },
    keyword: { type: Model.TYPES.String, default: "" },
    e_number: { type: Model.TYPES.String, default: "" },
    vehicles: { type: Model.TYPES.Array, default: [] },
  };

  constructor(obj) {
    super(Emergency.MAPPING, Emergency.ENDPOINT_PATH, obj);
  }
}
