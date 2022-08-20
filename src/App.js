import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { SessionContext } from "./store/SessionStore";

function App() {
  const {
    session: { isLoggedIn },
  } = useContext(SessionContext);

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
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
