import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeNav from './wrappers/HomeNav';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import UserDashboardNav from './wrappers/UserDashboardNav';
import Logout from './components/Logout';
import AdminRegister from './components/Admin/AdminRegister';
import AdminLogin from './components/Admin/AdminLogin';
import AdminNav from './wrappers/AdminNav';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeNav />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"register",
        element:<Register />
      },
      {
        path:"login",
        element:<Login />
      }
    ]
  },
  {
    path:"dashboard",
    element:<UserDashboardNav />
  },
  {
    path:"logout",
    element:<Logout />
  },
  {
    path: "admin", // Base path for all admin routes
    element: <AdminNav />, // Admin navigation or layout wrapper
    children: [
      {
        path: "login",
        element: <AdminLogin /> // Admin login route
      },
      {
        path: "register",
        element: <AdminRegister /> // Admin registration route
      }
    ]
  }
]);
const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;