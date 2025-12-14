"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIcon } from "@/components/icons";
import { LightningBoltIcon } from "@/components/icons";

// All available modules across all departments
const allModules = [
  // Sales
  { name: "Dashboard", path: "/dashboard", icon: "Dashboard", department: "Sales", description: "6P Overview" },
  { name: "CPQ", path: "/cpq", icon: "DollarSign", department: "Sales", description: "Configure, price & quote" },
  { name: "Pipeline", path: "/pipeline", icon: "BarChart2", department: "Sales", description: "Sales pipeline analytics" },
  { name: "Forecasting", path: "/forecasting", icon: "TrendingUp", department: "Sales", description: "Revenue forecasting" },

  // Marketing
  { name: "Campaigns", path: "/campaigns", icon: "Briefcase", department: "Marketing", description: "Campaign management" },
  { name: "Social Media", path: "/social-media", icon: "Share2", department: "Marketing", description: "Content marketing" },
  { name: "Content Hub", path: "/content", icon: "FileText", department: "Marketing", description: "Content library" },

  // Delivery
  { name: "Delivery", path: "/delivery", icon: "Package", department: "Delivery", description: "Project delivery control room" },
  { name: "Scoping Tool", path: "/scoping", icon: "CheckSquare", department: "Delivery", description: "Project scoping & estimation" },
  { name: "Assets & Playbooks", path: "/assets", icon: "BookOpen", department: "Delivery", description: "Consulting asset library" },
  { name: "AI Workbench", path: "/ai-workbench", icon: "Zap", department: "Delivery", description: "AI recipe workbench", badge: "AI" },

  // Operations
  { name: "IT Systems", path: "/it-systems", icon: "Server", department: "Operations", description: "IT infrastructure" },
  { name: "Finance", path: "/finance", icon: "PieChart", department: "Operations", description: "Financial planning" },
  { name: "Team Directory", path: "/team", icon: "Users", department: "Operations", description: "Team members & expertise" },
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

export default function TileViewDashboard() {
  const pathname = usePathname();
  const [usageData, setUsageData] = useState<UsageData>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load usage data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bhg-module-usage");
    if (stored) {
      setUsageData(JSON.parse(stored));
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

  // Sort modules by usage (most used first)
  const sortedModules = [...allModules].sort((a, b) => {
    const usageA = usageData[a.path] || 0;
    const usageB = usageData[b.path] || 0;
    return usageB - usageA;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

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
                <div className="text-purple-700 text-xs">AI-optimizing your workspace</div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        {Object.keys(usageData).length > 0 && (
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Intelligent Ordering:</span> Modules are
              automatically sorted based on your usage patterns. Most frequently accessed modules
              appear first for faster navigation.
            </div>
          </div>
        )}

        {/* Module Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedModules.map((module, index) => {
            const Icon = getIcon(module.icon);
            const usage = usageData[module.path] || 0;
            const isActive = pathname === module.path;
            const gradient = departmentColors[module.department];

            return (
              <Link
                key={module.path}
                href={module.path}
                onClick={() => trackClick(module.path)}
                className={`
                  group relative bg-white border-2 rounded-xl p-5 hover:shadow-lg transition-all no-underline
                  ${isActive ? "border-orange-500 shadow-md" : "border-gray-200 hover:border-orange-300"}
                `}
              >
                {/* Usage Rank Badge */}
                {usage > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                    <span className="text-xs font-bold text-purple-700">#{index + 1}</span>
                    <span className="text-xs text-purple-600">{usage} uses</span>
                  </div>
                )}

                {/* AI Badge */}
                {module.badge === "AI" && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 mb-3 rounded-lg bg-gradient-to-br ${gradient} p-2.5 text-white`}>
                  {React.createElement(Icon, { className: "w-full h-full" })}
                </div>

                {/* Module Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{module.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10`}>
                      {module.department}
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {Object.keys(usageData).length === 0 && (
          <div className="mt-8 text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <LightningBoltIcon className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">OpsChief is Learning</h3>
            <p className="text-sm text-purple-700 max-w-md mx-auto">
              Start using modules and OpsChief AI will automatically optimize their order based on your
              workflow patterns. The more you use the system, the smarter it gets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
