export const onStartActions = [
  "Emergencies/all",
  "Calculations/all",
  "Members/all",
  "Vehicles/all",
];

export const doOnStartActions = (store) => {
  onStartActions.forEach((action) => {
    store.dispatch(action);
  });
};
