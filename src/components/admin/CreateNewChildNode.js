import { ref, set } from "firebase/database";
import { db } from "../../services/firebase";

export const createVotesNode = () => {
  set(ref(db, "/votes"), {
    test: "hoge",
  });
};
