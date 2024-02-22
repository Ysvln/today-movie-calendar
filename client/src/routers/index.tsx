/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout";
import Private from "./Private";
import NotFound from "@/components/NotFound";

import Main from "@/pages/Main";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";

const MyWatch = lazy(() => import("@/pages/MyPage/MyWatch"));
const MyComment = lazy(() => import("@/pages/MyPage/MyComment"));
const MyRating = lazy(() => import("@/pages/MyPage/MyRating"));
const MyContent = lazy(() => import("@/pages/MyPage/MyContent"));
const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const Search = lazy(() => import("@/pages/Search"));
const MovieDetail = lazy(() => import("@/pages/MovieDetail"));
const MyPage = lazy(() => import("@/pages/MyPage"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    // 로그인 유저 열람 가능 페이지
    element: (
      <Private>
        <Layout />
      </Private>
    ),
    children: [
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "/my",
        element: <MyPage />,
        children: [
          {
            path: "",
            element: <MyContent />,
          },
          {
            path: "watched",
            element: <MyWatch />,
          },
          {
            path: "commented",
            element: <MyComment />,
          },
          {
            path: "rating",
            element: <MyRating />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

export default router;
