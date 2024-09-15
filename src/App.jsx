import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeNav from './wrappers/HomeNav';
import Register from './components/Register';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeNav />,
    children:[
      {
        path:"register",
        element:<Register />
      },
      {
        path:"login",
        element:<Login />
      }
    ]
  }
]);
const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;