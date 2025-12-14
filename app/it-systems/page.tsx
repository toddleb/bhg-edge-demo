"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import {
  DesktopIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  ActivityLogIcon,
} from "@/components/icons";

// Mock IT systems data
const systemsData = {
  systems: [
    {
      id: 1,
      name: "Salesforce CRM",
      category: "Sales",
      status: "Operational",
      uptime: 99.98,
      lastIncident: "2024-11-15",
      integrations: 8,
      users: 45,
      responseTime: 142,
      vendor: "Salesforce",
    },
    {
      id: 2,
      name: "Anaplan Planning",
      category: "Finance",
      status: "Operational",
      uptime: 99.95,
      lastIncident: "2024-10-28",
      integrations: 5,
      users: 32,
      responseTime: 215,
      vendor: "Anaplan",
    },
    {
      id: 3,
      name: "Tableau Analytics",
      category: "Analytics",
      status: "Operational",
      uptime: 99.92,
      lastIncident: "2024-12-01",
      integrations: 12,
      users: 67,
      responseTime: 328,
      vendor: "Tableau",
    },
    {
      id: 4,
      name: "Xactly Incent",
      category: "Compensation",
      status: "Degraded",
      uptime: 98.45,
      lastIncident: "2024-12-13",
      integrations: 4,
      users: 28,
      responseTime: 892,
      vendor: "Xactly",
    },
    {
      id: 5,
      name: "AICodeRally Platform",
      category: "Development",
      status: "Operational",
      uptime: 99.99,
      lastIncident: "2024-09-12",
      integrations: 6,
      users: 15,
      responseTime: 95,
      vendor: "AICodeRally",
    },
    {
      id: 6,
      name: "Microsoft 365",
      category: "Productivity",
      status: "Operational",
      uptime: 99.97,
      lastIncident: "2024-11-22",
      integrations: 15,
      users: 120,
      responseTime: 178,
      vendor: "Microsoft",
    },
  ],
  integrations: [
    {
      name: "Salesforce → Anaplan",
      status: "Active",
      lastSync: "2024-12-14 08:45",
      recordsSync: 12450,
      frequency: "Hourly",
    },
    {
      name: "Anaplan → Tableau",
      status: "Active",
      lastSync: "2024-12-14 09:00",
      recordsSync: 8920,
      frequency: "Daily",
    },
    {
      name: "Salesforce → Xactly",
      status: "Warning",
      lastSync: "2024-12-14 06:30",
      recordsSync: 3450,
      frequency: "Real-time",
    },
    {
      name: "Tableau → AICodeRally",
      status: "Active",
      lastSync: "2024-12-14 09:15",
      recordsSync: 5670,
      frequency: "Daily",
    },
  ],
  metrics: [
    { month: "Aug", uptime: 99.87, incidents: 2 },
    { month: "Sep", uptime: 99.92, incidents: 1 },
    { month: "Oct", uptime: 99.95, incidents: 1 },
    { month: "Nov", uptime: 99.91, incidents: 2 },
    { month: "Dec", uptime: 99.88, incidents: 3 },
  ],
};

const overallMetrics = {
  totalSystems: 18,
  operational: 16,
  degraded: 1,
  outage: 0,
  avgUptime: 99.7,
  activeIntegrations: 24,
  totalUsers: 307,
  incidentsThisMonth: 3,
};

export default function ITSystemsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const categories = [
    "All Categories",
    "Sales",
    "Finance",
    "Analytics",
    "Compensation",
    "Development",
    "Productivity",
  ];

  const filteredSystems = systemsData.systems.filter((system) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      system.category === selectedCategory;
    return matchesCategory;
  });

  const statusColors = {
    Operational: "bg-green-100 text-green-800",
    Degraded: "bg-yellow-100 text-yellow-800",
    Outage: "bg-red-100 text-red-800",
  };

  const integrationStatusColors = {
    Active: "bg-green-100 text-green-800",
    Warning: "bg-yellow-100 text-yellow-800",
    Error: "bg-red-100 text-red-800",
  };

  const getStatusIcon = (status: string) => {
    if (status === "Operational") return <CheckCircledIcon className="w-4 h-4 text-green-600" />;
    if (status === "Degraded") return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />;
    return <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />;
  };

  const maxUptime = Math.max(...systemsData.metrics.map((m) => m.uptime));

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IT Systems</h1>
          <p className="text-gray-600 mt-1">
            Infrastructure monitoring and integration status
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">System Status</div>
            <div className="flex items-center gap-2 mt-2">
              <CheckCircledIcon className="w-6 h-6 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">
                {overallMetrics.operational}/{overallMetrics.totalSystems}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {overallMetrics.degraded} degraded, {overallMetrics.outage} outage
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Average Uptime</div>
            <div className="text-2xl font-bold text-green-600 mt-2">
              {overallMetrics.avgUptime}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Active Integrations</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              {overallMetrics.activeIntegrations}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {overallMetrics.totalUsers} total users
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Incidents This Month</div>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              {overallMetrics.incidentsThisMonth}
            </div>
            <div className="text-xs text-green-600 mt-1">-40% vs last month</div>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Health Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900">
                  Operational
                </span>
                <CheckCircledIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-900">
                {overallMetrics.operational}
              </div>
              <div className="text-xs text-green-700 mt-1">
                {((overallMetrics.operational / overallMetrics.totalSystems) * 100).toFixed(1)}% of systems
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-900">
                  Degraded
                </span>
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-900">
                {overallMetrics.degraded}
              </div>
              <div className="text-xs text-yellow-700 mt-1">
                Performance issues
              </div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Outage</span>
                <ExclamationTriangleIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {overallMetrics.outage}
              </div>
              <div className="text-xs text-gray-600 mt-1">No active outages</div>
            </div>
          </div>
        </div>

        {/* Monthly Uptime Trend */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Monthly Uptime Trend
          </h2>
          <div className="space-y-4">
            {systemsData.metrics.map((metric) => {
              const widthPercent = (metric.uptime / maxUptime) * 100;
              return (
                <div key={metric.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{metric.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {metric.incidents} incident{metric.incidents !== 1 ? "s" : ""}
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        {metric.uptime}% uptime
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-6">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-6 rounded-full transition-all duration-500"
                      style={{ width: `${widthPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Systems Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">All Systems</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    System
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uptime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Integrations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Incident
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSystems.map((system) => (
                  <tr key={system.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(system.status)}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {system.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {system.category} • {system.vendor}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColors[system.status as keyof typeof statusColors]
                        }`}
                      >
                        {system.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {system.uptime}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            system.uptime >= 99.9
                              ? "bg-green-500"
                              : system.uptime >= 99
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${system.uptime}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          system.responseTime < 200
                            ? "text-green-600"
                            : system.responseTime < 500
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {system.responseTime}ms
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {system.users}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {system.integrations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(system.lastIncident).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integration Status */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Integration Status
          </h2>
          <div className="space-y-3">
            {systemsData.integrations.map((integration, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <ActivityLogIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {integration.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>Last sync: {integration.lastSync}</span>
                      <span>•</span>
                      <span>{integration.recordsSync.toLocaleString()} records</span>
                      <span>•</span>
                      <span>{integration.frequency}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    integrationStatusColors[
                      integration.status as keyof typeof integrationStatusColors
                    ]
                  }`}
                >
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
