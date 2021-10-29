import { Model } from "../model";

export default class CalculationsMembers extends Model {
  static ENDPOINT_PATH = "calculations_members/";

  static NAME = "CalculationsMembers";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    calculation_id: { type: Model.TYPES.Number, default: undefined },
    created_at: { type: Model.TYPES.Date, default: "" },
    month: { type: Model.TYPES.Number, default: "" },
    year: { type: Model.TYPES.Number, default: "" },
    members_total: { type: Model.TYPES.Number, default: 0.0 },
    members_total_open: { type: Model.TYPES.Number, default: 0.0 },
    members_total_paid: { type: Model.TYPES.Number, default: 0.0 },
    emergencies_total: { type: Model.TYPES.Number, default: 0.0 },
    members: { type: Model.TYPES.Array, default: undefined },
  };

  constructor(obj) {
    super(CalculationsMembers.MAPPING, CalculationsMembers.ENDPOINT_PATH, obj);
  }
}
