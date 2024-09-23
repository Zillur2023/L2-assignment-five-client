import { Link, useLocation } from "react-router-dom";
import { Avatar, Space, Dropdown, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { DownOutlined } from "@ant-design/icons";
import { loginUserInfo, navigation, needUserInfo } from "./constant";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

function DesktopMenu() {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {navigation.map((item) => (
          <div key={item.name} className="relative">
            {item.link ? (
              <Link
                to={item.link}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                {item.name}
              </Link>
            ) : item.subMenu ? (
              <Dropdown
                overlay={
                  <div className="bg-gray-700 rounded-md shadow-lg">
                    <div className="py-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.link}
                          className={classNames(
                            subItem.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-600 hover:text-white",
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
                  onClick={(e) => e.preventDefault()}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium"
                  )}
                >
                  {item.name}
                  <ChevronDownIcon
                    className={`ml-1 h-5 w-5 transition-transform duration-300`}
                  />
                </a>
              </Dropdown>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// const MobileMenu = ({ open }: { open: boolean }) => {
const MobileMenu = () => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <Disclosure as="div" key={item.name} className="relative">
            {item.link ? (
              <Disclosure.Button
                as={Link}
                to={item.link}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </Disclosure.Button>
            ) : item.subMenu ? (
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
                            subItem.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
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
                  onClick={(e) => e.preventDefault()}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "flex items-center px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                  <ChevronDownIcon
                    className={`ml-1 h-5 w-5 transition-transform duration-300`}
                  />
                </a>
              </Dropdown>
            ) : null}
          </Disclosure>
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export default function Navbar() {
  const location = useLocation();
  const { state } = location;
  const { countdown } = state || {};
  console.log('navbar---coundown', countdown)
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const items = user ? loginUserInfo(dispatch) : needUserInfo;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {/* {({ open }) => ( */}
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      alt="Your Company"
                      src="https://i.ibb.co.com/RDDtHYv/logo-GOCar-Wash.png"
                      className="h-12 w-auto "
                    />
                  </div>
                </Link>

                {/* Desktop Menu */}
                <DesktopMenu />
              </div>

              {/* Cart and Profile dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {countdown ? <Tag color="red">{countdown}</Tag> : ''}
                {/* Profile dropdown */}
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

          {/* Mobile menu */}
          {/* <MobileMenu open={open} /> */}
          <MobileMenu />
        </>
      )}
    </Disclosure>
  );
}
