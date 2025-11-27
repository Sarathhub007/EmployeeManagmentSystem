import React, { Fragment, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import {
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();

  const unreadCount = useMemo(
    () =>
      (notifications || []).filter(
        (n) => !n.read && n.userId === user?.id
      ).length,
    [notifications, user?.id]
  );

  const handleLogout = useCallback(() => {
    navigate("/", { replace: true });
    setTimeout(() => {
      try {
        logout();
      } catch {}
    }, 120);
  }, [navigate, logout]);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT — Empty but keeps structure aligned */}
          <div className="flex items-center min-w-0 flex-shrink-0"></div>

          {/* RIGHT — Notifications + Profile */}
          <div className="flex items-center space-x-4 flex-shrink-0">

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
              <BellIcon className="h-6 w-6" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 px-2 py-1 rounded-xl hover:bg-gray-100 transition group">
                <UserCircleIcon className="h-8 w-8 text-gray-500 group-hover:text-gray-600" />

                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>

                <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-500 hidden sm:block" />
              </Menu.Button>

              {/* DROPDOWN MENU */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-xl border border-gray-100 focus:outline-none py-2 origin-top-right">
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/profile")}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Your Profile
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/settings")}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Settings
                      </button>
                    )}
                  </Menu.Item>

                  <div className="border-t border-gray-200 my-1"></div>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } w-full text-left px-4 py-2 text-sm text-red-600`}
                      >
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>

                </Menu.Items>
              </Transition>
            </Menu>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
