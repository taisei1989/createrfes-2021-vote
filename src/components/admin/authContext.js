import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

// createContextの際に初期値を代入
export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged: ユーザーの認証状態を監視するオブザーバーを追加するメソッド
    const unsbscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsbscribed();
    };
  }, []);

  if (loading) {
    return <p>loading...</p>;
  } else {
    return (
      <AuthContext.Provider value={user}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
