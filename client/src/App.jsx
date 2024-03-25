import "./styles/AppStyles.css"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"

export default function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main>
        <Outlet location={location} key={location.pathname} />
      </main>
    </>
  )
}
