"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExitIcon,
  PersonIcon,
  GearIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";
import { getIcon } from "@/components/icons";

// Hardcoded BHG departments (from bhg.json)
const departments = [
  {
    id: "sales",
    name: "Sales",
    icon: "TrendingUp",
    modules: [
      { name: "Dashboard", path: "/dashboard", icon: "Dashboard", description: "6P Overview" },
      { name: "CPQ", path: "/cpq", icon: "DollarSign", description: "Configure, price & quote" },
      { name: "Pipeline", path: "/pipeline", icon: "BarChart2", description: "Sales pipeline analytics" },
      { name: "Forecasting", path: "/forecasting", icon: "TrendingUp", description: "Revenue forecasting" },
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "Share2",
    modules: [
      { name: "Campaigns", path: "/campaigns", icon: "Briefcase", description: "Campaign management" },
      { name: "Social Media", path: "/social-media", icon: "Share2", description: "Content marketing" },
      { name: "Content Hub", path: "/content", icon: "FileText", description: "Content library" },
    ]
  },
  {
    id: "delivery",
    name: "Delivery",
    icon: "Settings",
    modules: [
      { name: "Delivery", path: "/delivery", icon: "Package", description: "Project delivery control room" },
      { name: "Scoping Tool", path: "/scoping", icon: "CheckSquare", description: "Project scoping & estimation" },
      { name: "Assets & Playbooks", path: "/assets", icon: "BookOpen", description: "Consulting asset library" },
      { name: "AI Workbench", path: "/ai-workbench", icon: "Zap", description: "AI recipe workbench", badge: "NEW" },
    ]
  },
  {
    id: "operations",
    name: "Operations",
    icon: "Server",
    modules: [
      { name: "IT Systems", path: "/it-systems", icon: "Server", description: "IT infrastructure" },
      { name: "Finance", path: "/finance", icon: "PieChart", description: "Financial planning" },
      { name: "Team Directory", path: "/team", icon: "Users", description: "Team members & expertise" },
    ]
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Determine which department tab should be active based on current path
  useEffect(() => {
    departments.forEach((dept, index) => {
      const isInDepartment = dept.modules.some((item) => pathname === item.path);
      if (isInDepartment) {
        setSelectedDepartment(index);
      }
    });
  }, [pathname]);

  const currentDept = departments[selectedDepartment];

  const SidebarContent = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity no-underline"
          >
            <div className="w-8 h-8 text-orange-500">
              {React.createElement(getIcon(currentDept.icon), { className: "w-full h-full" })}
            </div>
            {isExpanded && (
              <div className="flex flex-col">
                <h2 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  BHG Edge
                </h2>
                <p className="text-xs text-gray-500">Professional Services OS</p>
              </div>
            )}
          </Link>
          <hr className="border-gray-200" />
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="flex flex-col gap-1">
            {currentDept.modules.map((module) => {
              const isActive = pathname === module.path;
              const ModuleIcon = getIcon(module.icon);

              return (
                <Link
                  key={module.path}
                  href={module.path}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium no-underline
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "text-gray-700 hover:bg-orange-50"
                    }
                  `}
                  title={module.description}
                >
                  <span className="flex-shrink-0">
                    {React.createElement(ModuleIcon, { className: "w-5 h-5" })}
                  </span>
                  {isExpanded && (
                    <>
                      <span className="flex-1">{module.name}</span>
                      {module.badge && (
                        <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">
                          {module.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <Cross1Icon className="w-4 h-4" />
            ) : (
              <HamburgerMenuIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block bg-white border-r border-gray-200 transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Cross1Icon className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </button>

              {/* Department Tabs */}
              <div className="flex gap-2">
                {departments.map((dept, index) => {
                  const DeptIcon = getIcon(dept.icon);
                  const isSelected = selectedDepartment === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDepartment(index)}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                        ${
                          isSelected
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      {React.createElement(DeptIcon, { className: "w-4 h-4" })}
                      <span className="hidden md:block">{dept.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <SunIcon className="w-4 h-4" />
                ) : (
                  <MoonIcon className="w-4 h-4" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3"
                >
                  <div className="hidden md:flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-800">Demo User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                    DU
                  </div>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <PersonIcon className="w-4 h-4" />
                        Profile
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <GearIcon className="w-4 h-4" />
                        Settings
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <ExitIcon className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
