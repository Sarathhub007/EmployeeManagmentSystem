import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UsersIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const adminNavigation = [
    { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
    { name: "Employees", icon: UsersIcon, path: "/admin/employees" },
    {
      name: "Departments",
      icon: BuildingOfficeIcon,
      path: "/admin/department",
      hasSubmenu: true,
      submenu: [
        { name: "All Departments", path: "/admin/department" },
        { name: "Add Department", path: "/admin/department/add" },
        { name: "Department Analytics", path: "/admin/department/analytics" },
      ]
    },
    { name: "Attendance", icon: ClockIcon, path: "/attendance" },
    { name: "Attendance List", icon: ClockIcon, path: "/admin/attendancelist" },
    {
      name: "Leave Requests",
      icon: DocumentTextIcon,
      path: "/admin/leave-requests",
    },
    { name: "Payroll", icon: CurrencyDollarIcon, path: "/admin/payroll" },
    { name: "Performance", icon: ChartBarIcon, path: "/admin/performance" },
    { name: "Reports", icon: DocumentTextIcon, path: "/admin/report" },
    { name: "My Profile", icon: UsersIcon, path: "/profile" },
  ];

  const employeeNavigation = [
    { name: "Dashboard", icon: HomeIcon, path: "/employee/dashboard" },
    { name: "My Profile", icon: UsersIcon, path: "/profile" },
    { name: "Attendance", icon: ClockIcon, path: "/attendance" },
    {
      name: "Leave Requests",
      icon: DocumentTextIcon,
      path: "/employee/leave-requests",
    },
    { name: "Payslips", icon: CurrencyDollarIcon, path: "/employee/payslips" },
    { name: "Performance", icon: ChartBarIcon, path: "/employee/performance" },
  ];

  const navigation =
    user?.role === "admin" ? adminNavigation : employeeNavigation;

  const isActive = (path) => location.pathname === path;
const SidebarContent = () => (
  <div className="flex flex-col h-full">
    <div className="space-y-1 px-3 py-2">
      {navigation.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setOpen(false)} // <-- Close sidebar on click
            className={`
              group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
              transition-all duration-200 ease-in-out
              ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }
            `}
          >
            <item.icon
              className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                active ? "text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
            <span className="flex-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  </div>
);


  return (
    <>
      {/* Toggle Button - Always Visible */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 shadow-lg"
      >
        {open ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <Bars3Icon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle navigation</span>
      </Button>

      {/* Sheet Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="text-left font-semibold">
              {user?.role === "admin" ? "Admin Panel" : "Employee Portal"}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-5rem)] px-3 py-4">
            <SidebarContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar; 