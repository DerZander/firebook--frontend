import { Model } from "../model";

export default class Beverages extends Model {
  static ENDPOINT_PATH = "beverages/";

  static NAME = "Beverages";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    name: { type: Model.TYPES.String, default: "" },
    price: { type: Model.TYPES.Number, default: "" },
    isActive: { type: Model.TYPES.Boolean, default: true },
  };

  constructor(obj) {
    super(Beverages.MAPPING, Beverages.ENDPOINT_PATH, obj);
  }
}
