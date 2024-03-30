import "./styles/AppStyles.css";
import { Outlet, useLocation } from "react-router-dom";
import { GlobalStateProvider } from "./utils/redux/globalState";
import store from "./utils/redux/store";
import Header from "./components/Header";

export default function App() {
  const location = useLocation();

  return (
    <GlobalStateProvider store={store}>
      <Header />
      <main>
        <Outlet location={location} key={location.pathname} />
      </main>
    </GlobalStateProvider>
  );
}
