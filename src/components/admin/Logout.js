import { useHistory } from "react-router-dom";
import { auth } from "../../services/firebase";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/admin/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
      <br />
      <p>
        ※ログアウトボタンを押すと管理者画面・司会者画面のログアウトが実装されます
      </p>
    </div>
  );
};

export default Logout;
