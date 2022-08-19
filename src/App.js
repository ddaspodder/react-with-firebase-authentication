import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { UserContext } from "./store/UserStore";

function App() {
  const {
    user: { isLoggedIn },
  } = useContext(UserContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/auth">
          {!isLoggedIn ? <AuthPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {isLoggedIn ? <UserProfile /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
