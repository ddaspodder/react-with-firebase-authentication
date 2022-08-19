import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserStore from "./store/SessionStore";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserStore>
      <App />
    </UserStore>
  </BrowserRouter>
);
