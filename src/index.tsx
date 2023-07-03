import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthUseCase } from "./application/usecases/AuthUseCase";
import { persistor, store } from "./presentation/redux/store";
import { AuthAPI } from "./infrastructure/api/Auth";
import { UserStorage } from "./infrastructure/storage/UserStorage";
import { UserStorageUseCase } from "./application/usecases/UserStorageUseCase";
import { TestAPI } from "./infrastructure/api/TestAPI";
import { TestUseCase } from "./application/usecases/TestUseCase";

const authRepository = new AuthAPI();
const userStorage = new UserStorage();
const testRepository = new TestAPI();

const testUseCase = new TestUseCase(testRepository);
const userStorageUseCase = new UserStorageUseCase(userStorage);
const authUseCase = new AuthUseCase(authRepository);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App
            userStorageUseCase={userStorageUseCase}
            testUseCase={testUseCase}
            authUseCase={authUseCase}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
