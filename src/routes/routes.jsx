import { createBrowserRouter } from "react-router-dom";
import Page404 from "../pages/Page404";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddChallengePage from "../pages/AddChallengePage";
import ProtectedRoute from "./ProtectedRoute";
import MyActivitiesPage from "../pages/MyActivitiesPage";
import MainLayout from "../layout/MainLayout";
import ChallengesPage from "../pages/ChallengesPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import ChallengeDetailPage from "../pages/ChallengeDetailPage";





const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "Register",
        element: <RegisterPage />,
      },
      {
        path: "Profile",
        element: <ProfilePage />,
      },
      {
        path: "challenges/:id",
        element: <ChallengeDetailPage />,
      },
      {
        path: "Forgot-Password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "challenges/add",
        element: (
          <ProtectedRoute>
            <AddChallengePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "challenges",
        element: (
          <ProtectedRoute>
            <ChallengesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-activities",
        element: (
          <ProtectedRoute>
            <MyActivitiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-activities/:id",
        element: (
          <ProtectedRoute>
            <MyActivitiesPage />
          </ProtectedRoute>
        ),
      },


    ],
  },
]);

export default router;