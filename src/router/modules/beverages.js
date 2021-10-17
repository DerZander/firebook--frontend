import Beverages from "@/views/beverages";

export default [
  {
    path: "/beverages",
    name: "Beverages",
    component: Beverages,
    meta: { unauthenticated: false, allowedRoles: [1, 2, 3] },
  },
];
