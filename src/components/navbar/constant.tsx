import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const navigation = [
  // {
  //   name: "Dashboard",
  //   link: "/dashboard",
  //   current: false,
  // },
  {
    name: "User Dashboard",
    link: "/user-dashboard",
    current: false,
  },
  {
    name: "Service Management",
    link: null,
    current: false,
    subMenu: [
      {
        name: "Add Service",
        link: "/add-service",
        current: false,
      },
      {
        name: "Services",
        link: "/services",
        current: false,
      },
      {
        name: "Manage Services",
        link: "/service-management",
        current: false,
      },
    ],
  },
  {
    name: "Slot Management",
    link: null,
    current: false,
    subMenu: [
      {
        name: "Create Slot",
        link: "/create-slot",
        current: false,
      },
      {
        name: "Manage Slots",
        link: "/slot-management",
        current: false,
      },
    ],
  },
  {
    name: "User Management",
    link: null,
    current: false,
    subMenu: [
      {
        name: "Users booking",
        link: "/user-booking",
        current: false,
      },
      {
        name: "Manage Users",
        link: "/user-management",
        current: false,
      },
    ],
  },

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
        <Link to="/auth/login" className="block px-4 py-2 text-sm text-gray-700">
          Login
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/auth/register" className="block px-4 py-2 text-sm text-gray-700">
          Register
        </Link>
      ),
    },
  ];