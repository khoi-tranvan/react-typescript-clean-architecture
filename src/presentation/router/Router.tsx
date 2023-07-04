import { Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { HomePage } from "../pages/HomePage";
import { CounterPage } from "../pages/CounterPage";
import { AdminPage } from "../pages/AdminPage";
import { UserPage } from "../pages/UserPage";
import { ModeratorPage } from "../pages/ModeratorPage";
import { TimeSleepPage } from "../pages/TimeSleepPage";
import LoadingComponent from "./components/Loading";
import { PrivateRoute } from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { AppProps } from "../App";
import ErrorSite from "./components/Error";

const Router = (props: AppProps) => {
  return (
    <LoadingComponent>
      <Routes>
        <Route
          path="/"
          errorElement={<ErrorSite />}
          element={<HomePage userStorageUseCase={props.userStorageUseCase} />}
        />
        <Route path="/authen">
          <Route
            path="signin"
            errorElement={<ErrorSite />}
            element={
              <SignInPage
                userStorage={props.userStorageUseCase}
                authenUseCase={props.authUseCase}
              />
            }
          />
          <Route
            path="signup"
            errorElement={<ErrorSite />}
            element={<SignUpPage authenUseCase={props.authUseCase} />}
          />
        </Route>
        <Route
          path="/app"
          element={
            <PrivateRoute userStorageUseCase={props.userStorageUseCase} />
          }
        >
          <Route
            path="counter"
            errorElement={<ErrorSite />}
            element={<CounterPage />}
          />
          <Route
            path="admin"
            errorElement={<ErrorSite />}
            element={<AdminPage testUseCase={props.testUseCase} />}
          />
          <Route
            path="user"
            errorElement={<ErrorSite />}
            element={<UserPage testUseCase={props.testUseCase} />}
          />
          <Route
            path="mod"
            errorElement={<ErrorSite />}
            element={<ModeratorPage testUseCase={props.testUseCase} />}
          />
          <Route
            path="time"
            errorElement={<ErrorSite />}
            element={<TimeSleepPage testUseCase={props.testUseCase} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LoadingComponent>
  );
};

export default Router;
