import { atom } from 'jotai';

// Atom to store the user details
export const userAtom = atom({
  isLoggedIn: false,
  user: null,
  addedFragment: false,
});
