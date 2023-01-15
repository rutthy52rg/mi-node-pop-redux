export const getIsLogged = (state) => state.auth;
export const getAdverts = (state) => state.adverts.data;
export const areAdvertsLoaded = (state) => state.adverts.areLoaded;
export const areTagsLoaded = (state) => state.tags.areLoaded;

export const getAdvertDetail = (id) => (state) =>
  state.adverts.data.find((advert) => advert.id.toString() === id);
export const getUi = (state) => state.ui;
