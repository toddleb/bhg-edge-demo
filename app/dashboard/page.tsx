"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { bhg6PData } from "@/lib/demo-data";
import {
  PersonIcon,
  ActivityLogIcon,
  BoxIcon,
  BarChartIcon,
  TargetIcon,
  GearIcon,
  BookmarkIcon,
  CheckCircledIcon,
  ArrowRightIcon,
} from "@/components/icons";
import React from "react";

// Map 6P titles to their detail page paths
const sixPPagePaths: Record<string, string> = {
  "People": "/team",
  "Process": "/process",
  "Products/Programs": "/products",
  "Performance": "/performance",
  "Pipeline": "/pipeline",
  "Platform": "/it-systems",
};

const SixPTile = ({ data }: { data: any }) => {
  const Icon = getIcon(data.title);
  const detailPath = sixPPagePaths[data.title] || "/dashboard";

  return (
    <Link
      href={detailPath}
      className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg hover:border-orange-300 transition-all group no-underline"
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 text-orange-500">
            {React.createElement(Icon, { className: "w-full h-full" })}
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {data.title}
              </h3>
              <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-gray-600">{data.description}</p>
          </div>
        </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex flex-col gap-2 flex-1">
        {data.stats && data.stats.map((stat: string, i: number) => (
          <p key={i} className="text-sm text-gray-700">
            • {stat}
          </p>
        ))}

        {data.stages && (
          <div className="flex flex-wrap gap-2">
            {data.stages.map((stage: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
              >
                {stage}
              </span>
            ))}
          </div>
        )}

        {data.offerings && data.offerings.map((offering: string, i: number) => (
          <p key={i} className="text-sm text-gray-700 flex items-center gap-2">
            <CheckCircledIcon className="w-4 h-4 text-green-600" />
            {offering}
          </p>
        ))}

        {data.pursuits && data.pursuits.map((pursuit: string, i: number) => (
          <p key={i} className="text-sm text-gray-700">
            • {pursuit}
          </p>
        ))}

        {data.tools && data.tools.map((tool: string, i: number) => (
          <p key={i} className="text-sm text-gray-700 flex items-center gap-2">
            <GearIcon className="w-4 h-4 text-gray-600" />
            {tool}
          </p>
        ))}
      </div>
    </div>
    </Link>
  );
};

function getIcon(title: string) {
  const icons: Record<string, any> = {
    "People": PersonIcon,
    "Process": ActivityLogIcon,
    "Products/Programs": BoxIcon,
    "Performance": BarChartIcon,
    "Pipeline": TargetIcon,
    "Platform": GearIcon,
  };
  return icons[title] || BookmarkIcon;
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">6P Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Strategic command center for BHG Edge
            </p>
          </div>
        </div>

        {/* 6P Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SixPTile data={bhg6PData.people} />
          <SixPTile data={bhg6PData.process} />
          <SixPTile data={bhg6PData.productsPrograms} />
          <SixPTile data={bhg6PData.performance} />
          <SixPTile data={bhg6PData.pipeline} />
          <SixPTile data={bhg6PData.platform} />
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-90">Active Projects</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Active Pursuits</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Team Members</p>
              <p className="text-3xl font-bold">10</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Utilization</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
