"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { bhg6PData } from "@/lib/demo-data";
import {
  ArrowLeftIcon,
  BarChartIcon,
  CheckCircledIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon,
} from "@/components/icons";
import React from "react";

export default function PerformancePage() {
  const performanceData = bhg6PData.performance;

  const metrics = [
    {
      name: "Active Projects",
      value: 5,
      target: 6,
      status: "on-track",
      trend: "+2",
      trendDirection: "up",
      description: "Current engagements in flight across all stages",
    },
    {
      name: "In Design",
      value: 2,
      target: 2,
      status: "on-track",
      trend: "0",
      trendDirection: "neutral",
      description: "Projects in design and planning phase",
    },
    {
      name: "In Deployment",
      value: 3,
      target: 4,
      status: "at-risk",
      trend: "+1",
      trendDirection: "up",
      description: "Active deployment and go-live projects",
    },
    {
      name: "Team Utilization",
      value: 92,
      target: 85,
      status: "exceeding",
      trend: "+7%",
      trendDirection: "up",
      description: "Billable utilization across consulting team",
    },
  ];

  const projectHealth = [
    { name: "ProMach - Phase 1", health: "green", stage: "Discovery", revenue: "$180K", margin: "45%" },
    { name: "ClientNorth - Comp Design", health: "yellow", stage: "Design", revenue: "$240K", margin: "42%" },
    { name: "HealthCo - SPM Pilot", health: "green", stage: "Deploy", revenue: "$320K", margin: "48%" },
    { name: "ARA - Quick Assessment", health: "green", stage: "Discovery", revenue: "$95K", margin: "50%" },
    { name: "InsightCo - Exception Handling", health: "yellow", stage: "Design", revenue: "$160K", margin: "40%" },
  ];

  const revenueByStage = [
    { stage: "Discovery", count: 2, revenue: 275000 },
    { stage: "Design", count: 2, revenue: 400000 },
    { stage: "Build", count: 0, revenue: 0 },
    { stage: "Deploy", count: 1, revenue: 320000 },
    { stage: "Govern", count: 0, revenue: 0 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 no-underline"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="card bg-gradient-to-br from-orange-50 to-pink-50">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white p-3">
              <BarChartIcon className="w-full h-full" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{performanceData.title}</h1>
              <p className="text-gray-600 mt-1">{performanceData.description}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between mb-2">
                <div className="text-sm text-gray-600">{metric.name}</div>
                <div
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    metric.status === "exceeding"
                      ? "bg-blue-100 text-blue-800"
                      : metric.status === "on-track"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {metric.status.replace("-", " ")}
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-3xl font-bold text-gray-900">
                  {metric.value}
                  {metric.name === "Team Utilization" && "%"}
                </div>
                <div className="text-sm text-gray-500">/ {metric.target}{metric.name === "Team Utilization" && "%"}</div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {metric.trendDirection === "up" && (
                  <ArrowUpIcon className="w-4 h-4 text-green-600" />
                )}
                <span className={metric.trendDirection === "up" ? "text-green-600" : "text-gray-600"}>
                  {metric.trend}
                </span>
                <span className="text-gray-500">vs last month</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">{metric.description}</div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === "exceeding"
                        ? "bg-blue-500"
                        : metric.status === "on-track"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Current Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceData.stats.map((stat: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg"
              >
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Health Dashboard */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Project Health Dashboard
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Project
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Health
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Stage
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projectHealth.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {project.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            project.health === "green"
                              ? "bg-green-500"
                              : project.health === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm text-gray-700 capitalize">
                          {project.health === "green" ? "On Track" : "At Risk"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                        {project.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                      {project.revenue}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                      {project.margin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue by Stage */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Revenue Distribution by Stage
          </h2>
          <div className="space-y-4">
            {revenueByStage.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">{item.stage}</span>
                    <span className="text-sm text-gray-500">({item.count} projects)</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${(item.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full"
                    style={{
                      width: `${(item.revenue / 995000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total Pipeline</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                $995K
              </span>
            </div>
          </div>
        </div>

        {/* Risk Indicators */}
        <div className="card border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="flex items-center gap-3 mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Risk Indicators & Actions
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  ClientNorth - Scope Expansion Risk
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Client requesting additional requirements mid-project. Action: Schedule change
                  control meeting to assess impact and adjust timeline/budget.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  InsightCo - Data Quality Issues
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Source data inconsistencies identified during design. Action: Data remediation
                  workshop scheduled with client IT team.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
