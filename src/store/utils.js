export const onStartActions = [
  // "Emergencies/all"
];

export const doOnStartActions = (store) => {
  onStartActions.forEach((action) => {
    store.dispatch(action);
  });
};
