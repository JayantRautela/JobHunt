import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "../src/components/auth/Login";
import Signup from "../src/components/auth/Signup";
import Home from "../src/components/Home";
import Jobs from "../src/components/Jobs";
import BrowseJobs from "../src/components/BrowseJobs";

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
  {
    path: '/jobs',
    element: <Jobs/>
  }, 
  {
    path: '/browseJobs',
    element: <BrowseJobs/>
  }
])

function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
