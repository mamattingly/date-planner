import "./styles/AppStyles.css";
import { Outlet, useLocation } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import store from "./utils/redux/store";
import Header from "./components/Header";

export default function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <div>
        <Header />
        <main>
          <Outlet location={location} key={location.pathname} />
        </main>
      </div>
    </Provider>
  );
}
