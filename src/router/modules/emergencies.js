import EmergenciesIndex from "@/views/emergencies";
import AdminEmergenciesEdit from "@/views/emergencies/edit";
import AdminEmergenciesList from "@/views/emergencies/list";

export default [
  {
    path: "/emergencies",
    name: "EmergenciesIndex",
    component: EmergenciesIndex,
    meta: {
      unauthenticated: true,
      allowedRoles: [0, 1, 2, 3],
    },
  },
  {
    path: "/admin/emergencies/:id",
    name: "EmergenciesEdit",
    component: AdminEmergenciesEdit,
    meta: {
      unauthenticated: false,
      allowedRoles: [1, 2, 3],
    },
  },
  {
    path: "/admin/emergencies",
    name: "EmergenciesList",
    component: AdminEmergenciesList,
    meta: {
      unauthenticated: false,
      allowedRoles: [1, 2, 3],
    },
  },
];
