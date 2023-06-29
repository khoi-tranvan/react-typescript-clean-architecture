import { Route, Routes } from "react-router-dom";
import ErrorSite from "./Error";
import NotFound from "./NotFound";
import SigninPage from "../pages/siginin";
import SignupPage from "../pages/signup";
import { PrivateRoute } from "./PrivateRoute";
import CounterPage from "../pages/counter";
import HomePage from "../pages/home";

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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
