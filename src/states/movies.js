import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const moviesAtom = atom({
  key: "movies",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const filteredAtom = atom({
  key: "filtered",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const genresAtom = atom({
  key: "genres",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const favoritesAtom = atom({
  key: "favorites",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { moviesAtom, filteredAtom, favoritesAtom, genresAtom };
