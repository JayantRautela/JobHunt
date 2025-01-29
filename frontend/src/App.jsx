import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "../src/components/auth/Login";
import Signup from "../src/components/auth/Signup";
import Home from "../src/components/Home";
import Jobs from "../src/components/Jobs";
import BrowseJobs from "../src/components/BrowseJobs";
import Profile from '../src/components/Profile';
import JobDescription from "../src/components/JobDescription";
import Comapnies from "../src/components/admin/Companies";
import CreateCompany from "../src/components/admin/CreateCompany";
import CompanySetup from "../src/components/admin/CompanySetup";

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
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  //admin routes
  {
    path: "/admin/companies",
    element: <Comapnies />
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />
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
