import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuthContext } from "./AuthContext";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <label>
          メールアドレス：
          <input
            name="email"
            type="email"
            placeholder="メールアドレスを入力"
            onChange={handleChangeEmail}
          />
          <br />
        </label>
        <label>
          パスワード：
          <input
            name="password"
            type="password"
            placeholder="パスワードを入力"
            onChange={handleChangePassword}
          />
          <br />
        </label>
        <button>登録</button>
      </form>
    </div>
  );
};

export default SignUpPage;
