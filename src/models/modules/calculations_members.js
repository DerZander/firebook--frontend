import { Model } from "../model";

export default class CalculationsMembers extends Model {
  static ENDPOINT_PATH = "calculation_member/";

  static NAME = "CalculationsMembers";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    month: { type: Model.TYPES.Number, default: "" },
    year: { type: Model.TYPES.Number, default: "" },
    member_id: { type: Model.TYPES.Number, default: undefined },
    drink_amount: { type: Model.TYPES.Number, default: 0 },
    drink_price: { type: Model.TYPES.Number, default: 0 },
    coffee_amount: { type: Model.TYPES.Number, default: 0 },
    coffee_price: { type: Model.TYPES.Number, default: 0 },
    chips_amount: { type: Model.TYPES.Number, default: 0 },
    chips_price: { type: Model.TYPES.Number, default: 0 },
    paid_opportunity: { type: Model.TYPES.Number, default: 0 }, //0=Nichts, 1=Bar, 2=Paypal
    paid_date: { type: Model.TYPES.Date, default: undefined },
    approved: { type: Model.TYPES.Boolean, default: false },
    created_at: { type: Model.TYPES.Date, default: undefined },
    open_at: { type: Model.TYPES.Date, default: undefined },
    closed_at: { type: Model.TYPES.Date, default: undefined },
  };

  // member() {
  //   return this.member_id;
  // }

  constructor(obj) {
    super(CalculationsMembers.MAPPING, CalculationsMembers.ENDPOINT_PATH, obj);
  }

  getMonthYear() {
    return this.getMonth() + " " + this.year;
  }

  getMonth() {
    switch (this.month) {
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
      1: { name: "Januar", value: 1, short_name: "JAN" },
      2: { name: "Februar", value: 2, short_name: "FEB" },
      3: { name: "März", value: 3, short_name: "MÄR" },
      4: { name: "April", value: 4, short_name: "APR" },
      5: { name: "Mai", value: 5, short_name: "MAI" },
      6: { name: "Juni", value: 6, short_name: "JUN" },
      7: { name: "Juli", value: 7, short_name: "JUL" },
      8: { name: "August", value: 8, short_name: "AUG" },
      9: { name: "September", value: 9, short_name: "SEP" },
      10: { name: "Oktober", value: 10, short_name: "OKT" },
      11: { name: "November", value: 11, short_name: "NOV" },
      12: { name: "Dezember", value: 12, short_name: "DEZ" },
    };
  }

  static getMonthName(month) {
    switch (month) {
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
}
