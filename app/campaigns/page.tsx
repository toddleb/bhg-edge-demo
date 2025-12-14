"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ArchiveIcon, ArrowUpIcon, MagnifyingGlassIcon } from "@/components/icons";

// Mock campaign data
const campaignData = {
  campaigns: [
    {
      id: 1,
      name: "SPM Thought Leadership Series",
      type: "Content Marketing",
      status: "Active",
      startDate: "2024-10-01",
      endDate: "2025-03-31",
      budget: 45000,
      spent: 28000,
      leads: 127,
      opportunities: 8,
      closedWon: 2,
      revenue: 620000,
      channels: ["LinkedIn", "Email", "Webinar"],
    },
    {
      id: 2,
      name: "Q1 2025 Territory Design Workshop",
      type: "Event",
      status: "Active",
      startDate: "2024-12-01",
      endDate: "2025-01-31",
      budget: 25000,
      spent: 18000,
      leads: 45,
      opportunities: 5,
      closedWon: 1,
      revenue: 285000,
      channels: ["Email", "LinkedIn"],
    },
    {
      id: 3,
      name: "Comp Plan Design Email Nurture",
      type: "Email Marketing",
      status: "Active",
      startDate: "2024-11-15",
      endDate: "2025-02-15",
      budget: 12000,
      spent: 7500,
      leads: 89,
      opportunities: 3,
      closedWon: 0,
      revenue: 0,
      channels: ["Email"],
    },
    {
      id: 4,
      name: "Exception Governance Webinar Series",
      type: "Webinar",
      status: "Active",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
      budget: 18000,
      spent: 16500,
      leads: 156,
      opportunities: 12,
      closedWon: 3,
      revenue: 705000,
      channels: ["Webinar", "LinkedIn", "Email"],
    },
    {
      id: 5,
      name: "LinkedIn SPM Insights Campaign",
      type: "Social Media",
      status: "Active",
      startDate: "2024-10-01",
      endDate: "2025-06-30",
      budget: 32000,
      spent: 15000,
      leads: 78,
      opportunities: 4,
      closedWon: 1,
      revenue: 195000,
      channels: ["LinkedIn"],
    },
    {
      id: 6,
      name: "Q4 2024 Territory & Quota Summit",
      type: "Event",
      status: "Completed",
      startDate: "2024-08-01",
      endDate: "2024-11-15",
      budget: 55000,
      spent: 52000,
      leads: 203,
      opportunities: 15,
      closedWon: 4,
      revenue: 880000,
      channels: ["Event", "Email", "LinkedIn"],
    },
  ],
  monthly: [
    { month: "Aug 2024", leads: 67, spend: 22000, revenue: 340000 },
    { month: "Sep 2024", leads: 98, spend: 28000, revenue: 520000 },
    { month: "Oct 2024", leads: 142, spend: 35000, revenue: 695000 },
    { month: "Nov 2024", leads: 178, spend: 41000, revenue: 925000 },
    { month: "Dec 2024", leads: 156, spend: 38000, revenue: 780000 },
  ],
};

const metrics = {
  activeCampaigns: 5,
  totalLeads: 495,
  totalSpend: 85000,
  totalBudget: 132000,
  avgCostPerLead: 172,
  conversionRate: 6.5,
  roi: 312,
  opportunitiesGenerated: 32,
};

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const types = [
    "All Types",
    "Content Marketing",
    "Event",
    "Email Marketing",
    "Webinar",
    "Social Media",
  ];

  const statuses = ["All Status", "Active", "Completed", "Planned"];

  const filteredCampaigns = campaignData.campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All Types" || campaign.type === selectedType;
    const matchesStatus =
      selectedStatus === "All Status" || campaign.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const maxMonthlyLeads = Math.max(...campaignData.monthly.map((m) => m.leads));

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Completed: "bg-gray-100 text-gray-800",
    Planned: "bg-blue-100 text-blue-800",
  };

  const typeColors = {
    "Content Marketing": "bg-purple-100 text-purple-800",
    Event: "bg-orange-100 text-orange-800",
    "Email Marketing": "bg-blue-100 text-blue-800",
    Webinar: "bg-pink-100 text-pink-800",
    "Social Media": "bg-cyan-100 text-cyan-800",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600 mt-1">
            Marketing campaign performance and analytics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Active Campaigns</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.activeCampaigns}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ${(metrics.totalSpend / 1000).toFixed(0)}K total spend
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Total Leads</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalLeads}
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              22% vs last period
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Cost per Lead</div>
            <div className="text-2xl font-bold text-gray-900">
              ${metrics.avgCostPerLead}
            </div>
            <div className="text-xs text-green-600 mt-1">-8% improvement</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Campaign ROI</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.roi}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics.opportunitiesGenerated} opportunities
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Budget Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Budget</span>
              <span className="font-semibold text-gray-900">
                ${(metrics.totalBudget / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{
                  width: `${(metrics.totalSpend / metrics.totalBudget) * 100}%`,
                }}
              >
                {Math.round((metrics.totalSpend / metrics.totalBudget) * 100)}%
                Spent
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Spent: ${(metrics.totalSpend / 1000).toFixed(0)}K
              </span>
              <span className="text-gray-600">
                Remaining: $
                {((metrics.totalBudget - metrics.totalSpend) / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Performance Trend */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Monthly Lead Generation Trend
          </h2>
          <div className="space-y-4">
            {campaignData.monthly.map((month) => {
              const widthPercent = (month.leads / maxMonthlyLeads) * 100;
              return (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{month.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        ${(month.spend / 1000).toFixed(0)}K spend
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {month.leads} leads
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-6">
                    <div
                      className="bg-blue-500 h-6 rounded-full transition-all duration-500"
                      style={{ width: `${widthPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Revenue: ${(month.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Funnel */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Lead Conversion Funnel
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Total Leads</span>
                <span className="font-semibold text-gray-900">495</span>
              </div>
              <div className="w-full bg-blue-500 rounded-lg h-8"></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Qualified Leads</span>
                <span className="font-semibold text-gray-900">
                  218 <span className="text-sm text-gray-500">(44%)</span>
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-lg h-8">
                <div
                  className="bg-purple-500 rounded-lg h-8"
                  style={{ width: "44%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Opportunities</span>
                <span className="font-semibold text-gray-900">
                  32 <span className="text-sm text-gray-500">(6.5%)</span>
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-lg h-8">
                <div
                  className="bg-orange-500 rounded-lg h-8"
                  style={{ width: "15%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Closed Won</span>
                <span className="font-semibold text-gray-900">
                  11 <span className="text-sm text-gray-500">(2.2%)</span>
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-lg h-8">
                <div
                  className="bg-green-500 rounded-lg h-8"
                  style={{ width: "7%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">All Campaigns</h2>
            <div className="flex gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opportunities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => {
                  const roi =
                    campaign.spent > 0
                      ? Math.round(
                          ((campaign.revenue - campaign.spent) / campaign.spent) *
                            100
                        )
                      : 0;
                  const budgetUsed = (campaign.spent / campaign.budget) * 100;

                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            typeColors[
                              campaign.type as keyof typeof typeColors
                            ]
                          }`}
                        >
                          {campaign.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[
                              campaign.status as keyof typeof statusColors
                            ]
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${(campaign.spent / 1000).toFixed(0)}K / $
                          {(campaign.budget / 1000).toFixed(0)}K
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full"
                            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {campaign.leads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.opportunities}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${(campaign.revenue / 1000).toFixed(0)}K
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-semibold ${
                            roi > 200
                              ? "text-green-600"
                              : roi > 100
                              ? "text-blue-600"
                              : "text-orange-600"
                          }`}
                        >
                          {roi}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
