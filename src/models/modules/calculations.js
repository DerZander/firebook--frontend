import { Model } from "../model";
import { Emergency } from "@/models";

export default class Calculations extends Model {
  static ENDPOINT_PATH = "calculations/";

  static NAME = "Calculations";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    created_at: { type: Model.TYPES.Date, default: "" },
    month: { type: Model.TYPES.Number, default: "" },
    year: { type: Model.TYPES.Number, default: "" },
    members_total: { type: Model.TYPES.Number, default: 0.0 },
    members_total_open: { type: Model.TYPES.Number, default: 0.0 },
    members_total_paid: { type: Model.TYPES.Number, default: 0.0 },
    emergencies_total: { type: Model.TYPES.Number, default: 0.0 },
    emergencies: {
      type: Emergency,
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
        return "April";
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

  static getAllMonths() {
    return {
      1: { name: "Januar", value: 1 },
      2: { name: "Februar", value: 2 },
      3: { name: "März", value: 3 },
      4: { name: "April", value: 4 },
      5: { name: "Mai", value: 5 },
      6: { name: "Juni", value: 6 },
      7: { name: "Juli", value: 7 },
      8: { name: "August", value: 8 },
      9: { name: "September", value: 9 },
      10: { name: "Oktober", value: 10 },
      11: { name: "November", value: 11 },
      12: { name: "Dezember", value: 12 },
    };
  }
}
