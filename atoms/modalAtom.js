import { atom } from "recoil";

export const modalAtomState = atom({
  key: 'modalState',
  default: false,
})

export const movieAtomState = atom({
  key: 'movieState',
  default: null,
})

export const commentsAtomState = atom({
  key: 'commentsState',
  default: null
})