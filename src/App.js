import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./pages/adminPages/AuthContext";

import AdminPage from "./pages/adminPages/AdminPage";
import ModeratorPage from "./pages/ModeratorPage";
import UserPage from "./pages/UserPage";
//import SignUpPage from "./pages/adminPages/SignUpPage";
import LoginPage from "./pages/adminPages/LoginPage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={UserPage} />
          <Route path="/moderator" component={ModeratorPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route path="/admin/login" component={LoginPage} />
          {/* <Route path="/admin/signup" component={SignUpPage} /> */}
        </Switch>
      </Router>
    </AuthProvider>

  );
}

export default App;
