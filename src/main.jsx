import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Routers from "./componants/Routers.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "../auth_config.json";
createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Routers />
  </Auth0Provider>
);
