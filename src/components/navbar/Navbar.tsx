import { Link, useLocation } from "react-router-dom";
import { Avatar, Space, Dropdown, Tooltip } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { adminNavigation, loginUserInfo, needUserInfo, publicNavigation, userNavigation } from "./constant";
import { useState } from "react";
import Countdown from "../user/Countdown";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

function DesktopMenu({ navigation }: { navigation: any[] }) {
  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        {navigation.map((item) => (
          <div key={item.name} className="relative mt-2">
            {item.link ? (
              <Link
                to={item.link}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-4 py-2 text-lg font-semibold leading-7 tracking-wider"
                )}
              >
                {item.name}
              </Link>
            ) : item.subMenu && (
              <Dropdown
                overlay={
                  <div className="bg-gray-700 rounded-md shadow-lg">
                    <div className="py-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.link}
                          className={classNames(
                            subItem.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-600 hover:text-white",
                            "block px-3 py-2 text-sm"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                }
                trigger={["hover"]}
              >
                <a
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                  <ChevronDownIcon className="ml-1 h-5 w-5" />
                </a>
              </Dropdown>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ navigation }: { navigation: any[] }) {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <Disclosure key={item.name} as="div" className="relative">
            {item.link ? (
              <Disclosure.Button
                as={Link}
                to={item.link}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-base font-medium"
                )}
              >
                {item.name}
              </Disclosure.Button>
            ) : item.subMenu && (
              <Dropdown
                overlay={
                  <div className="bg-gray-700 rounded-md shadow-lg">
                    <div className="py-2">
                      {item.subMenu.map((subItem) => (
                        <Disclosure.Button
                          key={subItem.name}
                          as={Link}
                          to={subItem.link}
                          className={classNames(
                            subItem.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block px-3 py-2 rounded-md text-base font-medium"
                          )}
                        >
                          {subItem.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                }
                trigger={["hover"]}
              >
                <a
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                  <ChevronDownIcon className="ml-1 h-5 w-5" />
                </a>
              </Dropdown>
            )}
          </Disclosure>
        ))}
      </div>
    </Disclosure.Panel>
  );
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user,  } = useAppSelector((state: RootState) => state.auth);
  const navigation = !user ? publicNavigation : user.role === "ADMIN" ? adminNavigation : userNavigation;
  const items = user ? loginUserInfo(dispatch) : needUserInfo;

  return (
    <Disclosure as="nav" className="bg-gray-800">
    {() => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white">
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
  
            {/* Logo and Menu */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* Add margin-left to the logo to create space between it and the menu button */}
              <Link to="/" className="flex items-center ml-10 sm:ml-0">
                <img src="https://i.ibb.co/RDDtHYv/logo-GOCar-Wash.png" className="h-12 w-auto" alt="Your Company" />
              </Link>
  
              <DesktopMenu navigation={navigation} />
            </div>
  
            {/* Countdown and Profile Section */}
            <div className="flex items-center">
              {/* Countdown Timer */}
            
              <Countdown/>
  
              {/* Profile Dropdown */}
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {user ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white">
                        {user.email[0].toUpperCase()}
                      </div>
                    ) : (
                      <Avatar size="large" icon={<UserOutlined />} />
                    )}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
  
        <MobileMenu navigation={navigation} />
      </>
    )}
  </Disclosure>
  );
} 