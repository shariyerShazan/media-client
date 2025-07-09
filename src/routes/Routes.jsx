import { createBrowserRouter } from "react-router";

import React from "react";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
// import Message from "../pages/Message";
import OthersProfile from "../pages/OthersProfile";
import SinglePost from "../pages/SinglePost";
import EditProfile from "../pages/EditProfile";
import MessageHome from "../pages/MessageHome";
import MessageSwap from "../components/MessageSwap";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage /> ,
    children : [
      {
        index: true ,
        element: <HomePage />
      },
    {
      path : "create-post",
      element : <CreatePost />
    },
    {
      path : "profile/:id",
      element : <Profile />
    },
    {
      path : "othersProfile/:id",
      element : <OthersProfile />
    },
    {
      path : "message/",
      element : <MessageHome /> ,
      children : [
        {
          path : "/message/:id" ,
          element: <MessageSwap />
        }
      ]
    },
    {
      path : "post/:postId",
      element : <SinglePost />

    },
    {
      path : "/profile/edit",
      element : <EditProfile />
    }
    ]
  },
      {
        path : "login",
        element: <Login />
      },
      {
        path : "register",
        element: <Register />
      }
]);
