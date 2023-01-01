// Refreshes the data by using router to push the same path to the client
export const refreshData = (router) => {
  router.replace(router.asPath);
};
