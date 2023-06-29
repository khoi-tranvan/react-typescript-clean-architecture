import { Route, Routes } from "react-router-dom";
import ErrorSite from "./Error";
import NotFound from "./NotFound";
import SigninPage from "../pages/siginin";
import SignupPage from "../pages/signup";
import { PrivateRoute } from "./PrivateRoute";
import CounterPage from "../pages/counter";
import HomePage from "../pages/home";
import { AdminContainer } from "../pages/authorization/AdminContainer";
import { UserContainer } from "../pages/authorization/UserContainer";
import { ModeratorContainer } from "../pages/authorization/ModContainer";

const Router = () => {
  return (
    <Routes>
      <Route path="/" errorElement={<ErrorSite />} element={<HomePage />} />

      <Route path="/authen">
        <Route
          path="signin"
          errorElement={<ErrorSite />}
          element={<SigninPage />}
        />
        <Route
          path="signup"
          errorElement={<ErrorSite />}
          element={<SignupPage />}
        />
      </Route>
      <Route path="/app" element={<PrivateRoute />}>
        <Route
          path="counter"
          errorElement={<ErrorSite />}
          element={<CounterPage />}
        />
        <Route
          path="admin"
          errorElement={<ErrorSite />}
          element={<AdminContainer />}
        />
        <Route
          path="user"
          errorElement={<ErrorSite />}
          element={<UserContainer />}
        />
        <Route
          path="mod"
          errorElement={<ErrorSite />}
          element={<ModeratorContainer />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
