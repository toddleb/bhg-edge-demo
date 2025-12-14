"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIcon } from "@/components/icons";
import { LightningBoltIcon, LockClosedIcon, LockOpen1Icon } from "@/components/icons";

// Module metrics data
const moduleMetrics: Record<string, { label: string; value: string; trend?: string }[]> = {
  "/dashboard": [
    { label: "Active Projects", value: "5", trend: "+2" },
    { label: "Team Utilization", value: "92%", trend: "+7%" },
  ],
  "/cpq": [
    { label: "Active Quotes", value: "12", trend: "+3" },
    { label: "Avg Close Time", value: "8 days", trend: "-2d" },
  ],
  "/pipeline": [
    { label: "Opportunities", value: "8", trend: "+2" },
    { label: "Forecast", value: "$995K", trend: "+12%" },
  ],
  "/forecasting": [
    { label: "Q1 Target", value: "$1.2M", trend: "on track" },
    { label: "Confidence", value: "87%", trend: "+5%" },
  ],
  "/campaigns": [
    { label: "Active", value: "3", trend: "+1" },
    { label: "Reach", value: "12.4K", trend: "+8%" },
  ],
  "/social-media": [
    { label: "Posts This Week", value: "14", trend: "+3" },
    { label: "Engagement", value: "4.2%", trend: "+0.5%" },
  ],
  "/content": [
    { label: "Total Assets", value: "248", trend: "+8" },
    { label: "Downloads", value: "12.8K", trend: "+15%" },
  ],
  "/delivery": [
    { label: "Projects", value: "5", trend: "0" },
    { label: "On Track", value: "3", trend: "+1" },
  ],
  "/scoping": [
    { label: "Active Scopes", value: "2", trend: "+1" },
    { label: "Avg Duration", value: "12 days", trend: "-3d" },
  ],
  "/assets": [
    { label: "Playbooks", value: "8", trend: "+1" },
    { label: "Templates", value: "42", trend: "+5" },
  ],
  "/ai-workbench": [
    { label: "Recipes", value: "6", trend: "+2" },
    { label: "Uses This Week", value: "34", trend: "+12" },
  ],
  "/it-systems": [
    { label: "Systems", value: "8", trend: "0" },
    { label: "Uptime", value: "99.8%", trend: "+0.1%" },
  ],
  "/finance": [
    { label: "Revenue YTD", value: "$2.4M", trend: "+18%" },
    { label: "Margin", value: "45%", trend: "+2%" },
  ],
  "/team": [
    { label: "Team Size", value: "10", trend: "+2" },
    { label: "Utilization", value: "92%", trend: "+7%" },
  ],
  "/process": [
    { label: "Active Stages", value: "5", trend: "0" },
    { label: "Avg Cycle", value: "90 days", trend: "-5d" },
  ],
  "/products": [
    { label: "Products", value: "6", trend: "+1" },
    { label: "Client Adoption", value: "87%", trend: "+4%" },
  ],
  "/performance": [
    { label: "Projects On Track", value: "3", trend: "+1" },
    { label: "Total Pipeline", value: "$995K", trend: "+12%" },
  ],
};

// All available modules across all departments
const allModules = [
  { name: "Dashboard", path: "/dashboard", icon: "Dashboard", department: "Sales", description: "6P Overview" },
  { name: "CPQ", path: "/cpq", icon: "DollarSign", department: "Sales", description: "Configure, price & quote" },
  { name: "Pipeline", path: "/pipeline", icon: "BarChart2", department: "Sales", description: "Sales pipeline analytics" },
  { name: "Forecasting", path: "/forecasting", icon: "TrendingUp", department: "Sales", description: "Revenue forecasting" },
  { name: "Campaigns", path: "/campaigns", icon: "Briefcase", department: "Marketing", description: "Campaign management" },
  { name: "Social Media", path: "/social-media", icon: "Share2", department: "Marketing", description: "Content marketing" },
  { name: "Content Hub", path: "/content", icon: "FileText", department: "Marketing", description: "Content library" },
  { name: "Delivery", path: "/delivery", icon: "Package", department: "Delivery", description: "Project delivery control room" },
  { name: "Scoping Tool", path: "/scoping", icon: "CheckSquare", department: "Delivery", description: "Project scoping & estimation" },
  { name: "Assets & Playbooks", path: "/assets", icon: "BookOpen", department: "Delivery", description: "Consulting asset library" },
  { name: "AI Workbench", path: "/ai-workbench", icon: "Zap", department: "Delivery", description: "AI recipe workbench", badge: "AI" },
  { name: "IT Systems", path: "/it-systems", icon: "Server", department: "Operations", description: "IT infrastructure" },
  { name: "Finance", path: "/finance", icon: "PieChart", department: "Operations", description: "Financial planning" },
  { name: "Team Directory", path: "/team", icon: "Users", department: "Operations", description: "Team members & expertise" },
  { name: "Process", path: "/process", icon: "Activity", department: "Delivery", description: "Engagement methodology" },
  { name: "Products", path: "/products", icon: "Box", department: "Delivery", description: "Product offerings" },
  { name: "Performance", path: "/performance", icon: "BarChart", department: "Operations", description: "Performance metrics" },
];

const departmentColors: Record<string, string> = {
  Sales: "from-red-500 to-orange-500",
  Marketing: "from-blue-500 to-cyan-500",
  Delivery: "from-orange-500 to-pink-500",
  Operations: "from-purple-500 to-indigo-500",
};

interface UsageData {
  [path: string]: number;
}

interface LockedState {
  [path: string]: boolean;
}

export default function TileViewDashboard() {
  const pathname = usePathname();
  const [usageData, setUsageData] = useState<UsageData>({});
  const [lockedTiles, setLockedTiles] = useState<LockedState>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load usage data and locked state from localStorage
  useEffect(() => {
    const storedUsage = localStorage.getItem("bhg-module-usage");
    const storedLocked = localStorage.getItem("bhg-locked-tiles");

    if (storedUsage) {
      setUsageData(JSON.parse(storedUsage));
    }
    if (storedLocked) {
      setLockedTiles(JSON.parse(storedLocked));
    }
    setIsLoading(false);
  }, []);

  // Track module clicks
  const trackClick = (path: string) => {
    const newUsageData = {
      ...usageData,
      [path]: (usageData[path] || 0) + 1,
    };
    setUsageData(newUsageData);
    localStorage.setItem("bhg-module-usage", JSON.stringify(newUsageData));
  };

  // Toggle lock state
  const toggleLock = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newLockedState = {
      ...lockedTiles,
      [path]: !lockedTiles[path],
    };
    setLockedTiles(newLockedState);
    localStorage.setItem("bhg-locked-tiles", JSON.stringify(newLockedState));
  };

  // Sort modules: locked tiles maintain position, others sort by usage
  const sortedModules = React.useMemo(() => {
    // Separate locked and unlocked tiles
    const locked = allModules.filter((m) => lockedTiles[m.path]);
    const unlocked = allModules.filter((m) => !lockedTiles[m.path]);

    // Sort unlocked by usage
    const sortedUnlocked = unlocked.sort((a, b) => {
      const usageA = usageData[a.path] || 0;
      const usageB = usageData[b.path] || 0;
      return usageB - usageA;
    });

    // Merge: locked tiles stay in their original order, unlocked fill in
    return [...locked, ...sortedUnlocked];
  }, [usageData, lockedTiles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const lockedCount = Object.values(lockedTiles).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with OpsChief Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                BHG Edge
              </h1>
              <p className="text-gray-600 mt-1">Professional Services OS</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
              <LightningBoltIcon className="w-5 h-5 text-purple-600" />
              <div className="text-sm">
                <div className="font-semibold text-purple-900">OpsChief Active</div>
                <div className="text-purple-700 text-xs">
                  {lockedCount > 0 ? `${lockedCount} pinned • ` : ""}AI-optimizing workspace
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Dynamic Dashboard:</span> Click tiles to navigate.
            <span className="font-semibold text-purple-700 ml-1">Click the pin icon</span> in top-right to lock tiles in place.
            Unlocked tiles auto-sort by usage.
          </div>
        </div>

        {/* Module Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedModules.map((module, index) => {
            const Icon = getIcon(module.icon);
            const usage = usageData[module.path] || 0;
            const isActive = pathname === module.path;
            const isLocked = lockedTiles[module.path] || false;
            const gradient = departmentColors[module.department];
            const metrics = moduleMetrics[module.path] || [];

            return (
              <Link
                key={module.path}
                href={module.path}
                onClick={() => trackClick(module.path)}
                className={`
                  group relative bg-white border-2 rounded-xl p-5 hover:shadow-lg transition-all no-underline block
                  ${isActive ? "border-orange-500 shadow-md" : "border-gray-200 hover:border-orange-300"}
                  ${isLocked ? "ring-2 ring-purple-300" : ""}
                `}
              >
                {/* Pin/Unpin Button */}
                <button
                  onClick={(e) => toggleLock(module.path, e)}
                  className={`
                    absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
                    transition-all z-10
                    ${isLocked
                      ? "bg-purple-500 hover:bg-purple-600"
                      : "bg-gray-200 hover:bg-gray-300 opacity-0 group-hover:opacity-100"
                    }
                  `}
                  title={isLocked ? "Click to unpin" : "Click to pin in place"}
                >
                  {isLocked ? (
                    <LockClosedIcon className="w-4 h-4 text-white" />
                  ) : (
                    <LockOpen1Icon className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {/* Pinned Badge (when locked) */}
                {isLocked && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-purple-500 rounded-full flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Pinned</span>
                  </div>
                )}

                {/* Usage Rank Badge (when not locked) */}
                {usage > 0 && !isLocked && (
                  <div className="absolute top-12 right-2 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                    <span className="text-xs font-bold text-purple-700">#{index + 1}</span>
                    <span className="text-xs text-purple-600">{usage} uses</span>
                  </div>
                )}

                  {/* AI Badge */}
                  {module.badge === "AI" && (
                    <div className={`absolute top-2 ${isLocked ? "left-20" : "left-2"} px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full`}>
                      <span className="text-xs font-bold text-white">AI</span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 mb-3 rounded-lg bg-gradient-to-br ${gradient} p-2.5 text-white ${isLocked ? "mt-6" : ""}`}>
                    {React.createElement(Icon, { className: "w-full h-full" })}
                  </div>

                  {/* Module Info */}
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{module.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10`}>
                        {module.department}
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  {metrics.length > 0 && (
                    <div className="border-t border-gray-200 pt-3 space-y-2">
                      {metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">{metric.label}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                            {metric.trend && (
                              <span className={`text-xs ${
                                metric.trend.startsWith('+') ? 'text-green-600' :
                                metric.trend.startsWith('-') ? 'text-red-600' :
                                'text-gray-500'
                              }`}>
                                {metric.trend}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {Object.keys(usageData).length === 0 && lockedCount === 0 && (
          <div className="mt-8 text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <LightningBoltIcon className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">OpsChief is Learning</h3>
            <p className="text-sm text-purple-700 max-w-md mx-auto">
              Start using modules and OpsChief AI will automatically optimize their order.
              Click the pin icon to lock your favorites in place.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
