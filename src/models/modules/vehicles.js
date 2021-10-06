import { Model } from "../model";

export default class Vehicles extends Model {
  static ENDPOINT_PATH = "vehicles/";

  static NAME = "Vehicles";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    name: { type: Model.TYPES.String, default: "" },
  };

  constructor(obj) {
    super(Vehicles.MAPPING, Vehicles.ENDPOINT_PATH, obj);
  }
}
