import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "../src/components/auth/Login";
import Signup from "../src/components/auth/Signup";
import Home from "../src/components/Home";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
])

function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
