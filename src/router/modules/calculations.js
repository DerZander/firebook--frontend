import AdminCalculationsIndex from "@/views/admin/calculations";
import CalculationsIndex from "@/views/calculations";
import CalculationsMemberList from "@/views/admin/calculations/members/list";

export default [
  {
    path: "/admin/calculations",
    name: "AdminCalculationsIndex",
    component: AdminCalculationsIndex,
    meta: {
      unauthenticated: false,
      allowedRoles: [1, 2, 3],
    },
  },
  {
    path: "/calculations",
    name: "CalculationsIndex",
    component: CalculationsIndex,
    meta: {
      unauthenticated: false,
    },
  },
  {
    path: "/calculations/:id/members",
    name: "CalculationsMemberList",
    component: CalculationsMemberList,
    meta: {
      unauthenticated: false,
      allowedRoles: [1, 2, 3],
    },
  },
];
