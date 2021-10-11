import { ref, set } from "firebase/database";
import { db } from "../../services/firebase";

const CreateNewChildNode = () => {
  set(ref(db, "/" + "votes"), {
    test: "hoge",
  });
};

export default CreateNewChildNode;
