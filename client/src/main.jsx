import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Date from './pages/Date.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "date",
        element: <Date />
      },
      {
        path: "contact",
        element: <h1>Contact</h1>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
