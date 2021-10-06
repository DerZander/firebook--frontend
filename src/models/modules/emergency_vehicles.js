import { Model } from "../model";
import { Emergencies } from "@/models";
import { Vehicles } from "@/models";

export default class EmergencyVehicles extends Model {
  static ENDPOINT_PATH = "emergency_vehicles/";

  static NAME = "EmergencyVehicles";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined },
    emergency_id: { type: Emergencies, default: undefined },
    vehicle_id: { type: Vehicles, default: undefined },
  };

  constructor(obj) {
    super(EmergencyVehicles.MAPPING, EmergencyVehicles.ENDPOINT_PATH, obj);
  }
}
