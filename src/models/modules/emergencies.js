import { Model } from "../model";

export default class Emergencies extends Model {
  static ENDPOINT_PATH = "emergencies/";

  static NAME = "Emergencies";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    name: { type: Model.TYPES.String, default: "" },
  };

  constructor(obj) {
    super(Emergencies.MAPPING, Emergencies.ENDPOINT_PATH, obj);
  }
}
