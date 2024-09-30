import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";



export const publicNavigation = [
  {
    name: "Home",
    link: "/",
    current: false,
  },
  {
    name: "Service",
    link: "/all-service",
    current: false,
  },
  {
    name: "Register",
    link: "/register",
    current: false,
  },
  {
    name: "Login",
    link: "/login",
    current: false,
  },
]
export const userNavigation = [
  {
    name: "Home",
    link: "/",
    current: false,
  },
  {
    name: "Service",
    link: "/all-service",
    current: false,
  },
  {
    name: "User Dashboard",
    link: "/user-dashboard",
    current: false,
  },
]

export const adminNavigation = [
  // {
  //   name: "Dashboard",
  //   link: "/dashboard",
  //   current: false,
  // },
  {
    name: "Service Management",
    link: "/service-management",
    current: false,
  },
  {
    name: "Slot Management",
    link: "/slot-management",
    current: false,
    
  },
  {
    name: "User Management",
    link: "/user-management",
    current: false,
  },
  {
    name: "Users booking",
    link: "/user-booking",
    current: false,
  }

];


export const loginUserInfo = (dispatch:Dispatch) => [
    {
      key: "1",
      label: (
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700">
          Your Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/"
          onClick={() => dispatch(logout())}
          className="block px-4 py-2 text-sm text-gray-700"
        >
          Sign out
        </Link>
      ),
    },
  ]


  export const needUserInfo = [
    {
      key: "1",
      label: (
        <Link to="/login" className="block px-4 py-2 text-sm text-gray-700">
          Login
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/register" className="block px-4 py-2 text-sm text-gray-700">
          Register
        </Link>
      ),
    },
  ];