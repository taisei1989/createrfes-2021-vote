import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

import PreparationPage from "./userPages/PreparationPage";
import VotePage from "./userPages/VotePage";
import CountPage from "./userPages/CountPage";
import TallyPage from "./userPages/TallyPage";
import ResultPage from "./userPages/ResultPage";

const UserPage = () => {
  const [currentPhase, setCurrentPhase] = useState("");

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const getPhase = async() => {
      get(child(dbRef, '/progress/')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setCurrentPhase(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, []);

  const progress = () => {
    switch(currentPhase) {
      case 'preparing':
        return (
          <PreparationPage />
        );
      case 'voting':
        return (
          <VotePage />
        );
      case 'counting':
        return (
          <CountPage />
        );
      case 'tallying':
        return (
          <TallyPage />
        );
      case 'resulting':
        return (
          <ResultPage />
        );
      default:
        return(<p>ページが存在しないよ！</p>);
    }
  }
};

export default UserPage;