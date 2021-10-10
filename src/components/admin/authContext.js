import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../../services/firebase";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const value = {
    user,
    loading,
  };
  console.log(children);

  useEffect(() => {
    // onAuthStateChanged: ユーザーがサインイン、サインアウトを監視するメソッド
    const unsbscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log(user);
    });
    return () => {
      unsbscribed();
    };
  }, []);

  if (loading) {
    return <p>loading...</p>;
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
};
