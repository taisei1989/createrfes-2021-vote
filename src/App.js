import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./components/admin/authContext";

import AdminPage from "./pages/AdminPage";
import ModeratorPage from "./pages/ModeratorPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={UserPage} />
          <Route path="/moderator" component={ModeratorPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route path="/admin/login" component={LoginPage} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
