"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExitIcon,
  PersonIcon,
  GearIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  MoonIcon,
  SunIcon,
  DashboardIcon,
  TableIcon,
} from "@/components/icons";
import { getIcon } from "@/components/icons";
import TileViewDashboard from "@/components/TileViewDashboard";

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
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"sidebar" | "tiles">("sidebar");
  const [activeWorkflow, setActiveWorkflow] = useState<string[]>([]);
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(-1);

  // Touch gesture state for swipe navigation
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Load view mode preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bhg-view-mode");
    if (stored === "tiles" || stored === "sidebar") {
      setViewMode(stored);
    }

    // Check for active workflow from sessionStorage
    const workflowData = sessionStorage.getItem("bhg-active-workflow");
    const currentPath = sessionStorage.getItem("bhg-workflow-current");

    if (workflowData && currentPath) {
      const workflow = JSON.parse(workflowData);
      setActiveWorkflow(workflow);
      const index = workflow.indexOf(pathname);
      setCurrentWorkflowIndex(index);
    }
  }, [pathname]);

  // Save view mode preference
  const toggleViewMode = () => {
    const newMode = viewMode === "sidebar" ? "tiles" : "sidebar";
    setViewMode(newMode);
    localStorage.setItem("bhg-view-mode", newMode);
  };

  // Touch gesture handlers for workflow navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isInWorkflow) return;

    const swipeThreshold = 75; // minimum swipe distance in pixels
    const swipeDistance = touchStart - touchEnd;

    // Swiped left (next page)
    if (swipeDistance > swipeThreshold && currentWorkflowIndex < activeWorkflow.length - 1) {
      router.push(activeWorkflow[currentWorkflowIndex + 1]);
    }

    // Swiped right (previous page)
    if (swipeDistance < -swipeThreshold && currentWorkflowIndex > 0) {
      router.push(activeWorkflow[currentWorkflowIndex - 1]);
    }

    // Reset touch state
    setTouchStart(0);
    setTouchEnd(0);
  };

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

  // If in tile view mode and on a page (not the main dashboard), show traditional layout with back button
  const isOnTileDashboard = pathname === "/dashboard" || pathname === "/";
  const showTileView = viewMode === "tiles" && isOnTileDashboard;
  const isInWorkflow = activeWorkflow.length > 0 && currentWorkflowIndex >= 0;
  const showFullWidth = viewMode === "tiles" && !isOnTileDashboard;

  if (showTileView) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Simple Header for Tile View */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 no-underline"
              >
                <div className="w-8 h-8 text-orange-500">
                  {React.createElement(DashboardIcon, { className: "w-full h-full" })}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    BHG Edge
                  </h2>
                  <p className="text-xs text-gray-500">Professional Services OS</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg hover:from-purple-200 hover:to-pink-200 transition-colors"
                title="Switch to traditional navigation"
              >
                <TableIcon className="w-4 h-4" />
                <span className="text-sm font-medium hidden md:block">Traditional Nav</span>
              </button>

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

        {/* Tile View Dashboard */}
        <TileViewDashboard />
      </div>
    );
  }

  // Full-width view for pages from dynamic dashboard
  if (showFullWidth) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Workflow Navigation Bar */}
        {isInWorkflow && (
          <div className="bg-purple-600 text-white px-4 py-3 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {currentWorkflowIndex + 1}
                  </div>
                  <span className="font-medium">
                    Step {currentWorkflowIndex + 1} of {activeWorkflow.length}
                  </span>
                </div>
                {/* Previous/Next Navigation */}
                <div className="flex items-center gap-2">
                  {currentWorkflowIndex > 0 && (
                    <Link
                      href={activeWorkflow[currentWorkflowIndex - 1]}
                      className="px-3 py-1 bg-white text-purple-600 rounded hover:bg-purple-100 transition-colors text-sm font-medium no-underline"
                    >
                      ← Previous
                    </Link>
                  )}
                  {currentWorkflowIndex < activeWorkflow.length - 1 && (
                    <Link
                      href={activeWorkflow[currentWorkflowIndex + 1]}
                      className="px-3 py-1 bg-white text-purple-600 rounded hover:bg-purple-100 transition-colors text-sm font-medium no-underline"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              </div>
              <Link
                href="/dashboard"
                className="px-3 py-1 bg-purple-700 hover:bg-purple-800 rounded transition-colors text-sm font-medium no-underline"
              >
                Exit Workflow
              </Link>
            </div>
          </div>
        )}

        {/* Regular Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 no-underline"
              >
                <div className="w-8 h-8 text-orange-500">
                  {React.createElement(DashboardIcon, { className: "w-full h-full" })}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    BHG Edge
                  </h2>
                  <p className="text-xs text-gray-500">Professional Services OS</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity no-underline"
                title="Back to tile dashboard"
              >
                <DashboardIcon className="w-4 h-4" />
                <span className="text-sm font-medium hidden md:block">Back to Tiles</span>
              </Link>

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

        {/* Full Width Page Content */}
        <div
          className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>
    );
  }

  // Traditional sidebar view
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
              {/* Back to Tile Dashboard button (only show if in tile view mode but not on dashboard) */}
              {viewMode === "tiles" && !isOnTileDashboard && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity no-underline"
                  title="Back to tile dashboard"
                >
                  <DashboardIcon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden md:block">Back to Tiles</span>
                </Link>
              )}

              {/* View Mode Toggle (only show on dashboard) */}
              {isOnTileDashboard && (
                <button
                  onClick={toggleViewMode}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg hover:from-purple-200 hover:to-pink-200 transition-colors"
                  title="Switch to AI-adaptive tile view"
                >
                  <DashboardIcon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden md:block">AI Tiles</span>
                </button>
              )}

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
