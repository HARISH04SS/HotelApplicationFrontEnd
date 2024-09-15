import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeNav from './wrappers/HomeNav';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import UserDashboardNav from './wrappers/UserDashboardNav';

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
  }
]);
const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;