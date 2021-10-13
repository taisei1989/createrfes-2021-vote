import { ref, set, update } from "firebase/database";
import { db } from "../../services/firebase";

export const createVotesNode = () => {
  set(ref(db, "/votes"), {
    test: "hoge",
  });
};

export const createCountNode = () => {
  const postData = {
    count: 60,
  };
  const updates = {};
  updates["/timer/"] = postData;
  return update(ref(db), updates);
};
