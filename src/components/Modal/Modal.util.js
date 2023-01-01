import { deleteDoc, doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../config/firebase";

export const handleList = async (userId, currentMovie, addedState) => {
  if (addedState) {
    await deleteDoc(
      doc(db, "customers", userId, "myList", currentMovie.id.toString())
    );
    toast(
      `${
        currentMovie?.title || currentMovie?.original_name
      } has been removed from my list ❌`,
      {
        duration: 3000,
      }
    );
  } else {
    await setDoc(
      doc(db, "customers", userId, "myList", currentMovie.id.toString()),
      { ...currentMovie }
    );
    toast(
      `${
        currentMovie.title || currentMovie.original_name
      } has been added to my list ✅`,
      {
        duration: 3000,
      }
    );
  }
};
