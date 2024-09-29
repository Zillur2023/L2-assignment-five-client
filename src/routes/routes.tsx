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
          <ProtectedRoute role="ADMIN">
            <AddServicePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "service-management",
        element: (
          <ProtectedRoute role="ADMIN">
            <ServiceManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-slot",
        element: (
          <ProtectedRoute role="ADMIN">
            <CreateSlotPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "slot-management",
        element: (
          <ProtectedRoute role="ADMIN">
            <SlotManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <ProtectedRoute role="ADMIN">
            <UserManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "user-booking",
        element: (
          <ProtectedRoute role="USER">
            <UserBookingManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-dashboard",
        element: (
          <ProtectedRoute role="USER">
            <UserDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "reviews",
        element: <AllReviewPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
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
]);

export default router;
