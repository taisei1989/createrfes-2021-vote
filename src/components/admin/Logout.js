import { useHistory } from "react-router-dom";
import { auth } from "../../services/firebase";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/admin/login");
  };

  return <button onClick={handleLogout}>ログアウト</button>;
};

export default Logout;
