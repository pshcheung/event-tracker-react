import { useEffect } from "react";
import "./App.css";
import Cars from "./Cars";
import keycloak from "./keycloak";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import {Provider} from "react-redux";
import {persistor, store} from "./store/reducers/store.ts";
import {PersistGate} from "redux-persist/integration/react";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <SecuredContent />
    </ReactKeycloakProvider>
  );
}
const SecuredContent = () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  useEffect(() => {
    if (isLoggedIn === false) keycloak?.login();
  }, [isLoggedIn, keycloak]);
  if (!isLoggedIn) return <div>Loading...</div>;
  
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <div>
                  <h2>Springboot app using Keycloak authentication provider</h2>
                  <Cars />
              </div>
          </PersistGate>
      </Provider>
  );
};
export default App;