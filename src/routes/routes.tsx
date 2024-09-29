import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";
import ServiceManagementPage from "../pages/ServiceManagementPage";
import AddServicePage from "../pages/AddServicePage";
import CreateSlotPage from "../pages/CreateSlotPage";
import SlotManagementPage from "../pages/SlotManagementPage";
import BookingPage from "../pages/BookingPage";
import UserBookingManagementPage from "../pages/UserBookingManagementPage";
import UserManagementPage from "../pages/UserManagementPage";
import UserDashboardPage from "../pages/UserDashboardPage";
import AllReviewPage from "../pages/AllReviewPage";
import Profile from "../components/user/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "all-service",
        element: <ServicePage />,
      },

      {
        path: "add-service",
        element: (
          <ProtectedRoute>
            <AddServicePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "service-management",
        element: <ServiceManagementPage />,
      },
      {
        path: "create-slot",
        element: <CreateSlotPage />,
      },
      {
        path: "slot-management",
        element: <SlotManagementPage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "user-booking",
        element: <UserBookingManagementPage />,
      },
      {
        path: "user-management",
        element: <UserManagementPage />,
      },
      {
        path: "user-dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "reviews",
        element: <AllReviewPage />,
      },

      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
