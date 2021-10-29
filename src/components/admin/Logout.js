import { useHistory } from "react-router-dom";
import { auth } from "../../services/firebase";
import styles from "../../pages/AdminPage.module.scss";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/admin/login");
  };

  return (
    <div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        ログアウト
      </button>
      <br />
      <p>
        ※ログアウトボタンを押すと管理者画面・司会者画面のログアウトが実装されます
      </p>
    </div>
  );
};

export default Logout;
