import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error.message);
    });
    if (location.pathname === "/moderator/login") {
      history.push("/moderator");
    } else if (location.pathname === "/admin/login") {
      history.push("/admin");
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス：</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChangeEmail}
          />
          <br />
        </div>
        <div>
          <label>パスワード：</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChangePassword}
          />
          <br />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
