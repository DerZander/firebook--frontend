import Vehicles from "@/views/vehicles";

export default [
  {
    path: "/vehicles",
    name: "Vehicles",
    component: Vehicles,
    meta: {
      unauthenticated: false,
    },
  },
];
