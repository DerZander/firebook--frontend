import { Model } from "../model";
import { Emergencies } from "@/models";

export default class Calculations extends Model {
  static ENDPOINT_PATH = "calculations/";

  static NAME = "Calculations";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    created: { type: Model.TYPES.Date, default: "" },
    month: { type: Model.TYPES.Number, default: "" },
    year: { type: Model.TYPES.Number, default: "" },
    members_total: { type: Model.TYPES.Number, default: 0.0 },
    emergencies_total: { type: Model.TYPES.Number, default: 0.0 },
    emergencies: {
      type: Emergencies,
      default: [],
      isArray: true,
      isNested: true,
    },
    members: { type: Model.TYPES.Array, default: undefined },
  };

  constructor(obj) {
    super(Calculations.MAPPING, Calculations.ENDPOINT_PATH, obj);
  }

  getCalcName() {
    return this.getMonth(this.month) + " " + this.year;
  }

  getMonth(number) {
    switch (number) {
      case 1:
        return "Januar";
      case 2:
        return "Februar";
      case 3:
        return "März";
      case 4:
        return "Arpil";
      case 5:
        return "Mai";
      case 6:
        return "Juni";
      case 7:
        return "Juli";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "Oktober";
      case 11:
        return "November";
      case 12:
        return "Dezember";
      default:
        return "";
    }
  }
}
