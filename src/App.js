import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ModeratorPage from "./pages/ModeratorPage";
import UserPage from "./pages/UserPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/moderator">
          <ModeratorPage />
        </Route>
        <Route path="/">
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
