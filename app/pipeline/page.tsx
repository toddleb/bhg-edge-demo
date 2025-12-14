"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { MagnifyingGlassIcon, PlusIcon, ArrowUpIcon } from "@/components/icons";

// Mock pipeline data
const pipelineData = {
  stages: [
    { name: "Discovery", count: 8, value: 1240000, color: "bg-blue-500" },
    { name: "Design", count: 5, value: 850000, color: "bg-purple-500" },
    { name: "Proposal", count: 4, value: 680000, color: "bg-orange-500" },
    { name: "Negotiation", count: 3, value: 520000, color: "bg-green-500" },
    { name: "Closed Won", count: 2, value: 340000, color: "bg-emerald-600" },
  ],
  opportunities: [
    {
      id: 1,
      name: "ARA - SPM Assessment",
      client: "ARA Corporation",
      stage: "Discovery",
      value: 180000,
      probability: 25,
      expectedClose: "2025-02-15",
      owner: "Brad Hipwell",
      lastActivity: "2025-12-10",
      daysInStage: 12,
    },
    {
      id: 2,
      name: "SaaS Vendor - Comp Redesign",
      client: "TechFlow SaaS",
      stage: "Design",
      value: 425000,
      probability: 60,
      expectedClose: "2025-01-20",
      owner: "Todd LeBaron",
      lastActivity: "2025-12-13",
      daysInStage: 8,
    },
    {
      id: 3,
      name: "HealthCo - Territory Expansion",
      client: "HealthCo",
      stage: "Proposal",
      value: 285000,
      probability: 70,
      expectedClose: "2025-01-10",
      owner: "Michelle Chen",
      lastActivity: "2025-12-12",
      daysInStage: 5,
    },
    {
      id: 4,
      name: "RetailCorp - Quota Design",
      client: "RetailCorp",
      stage: "Negotiation",
      value: 195000,
      probability: 85,
      expectedClose: "2025-12-20",
      owner: "Brad Hipwell",
      lastActivity: "2025-12-14",
      daysInStage: 3,
    },
    {
      id: 5,
      name: "FinServ Inc - SPM Pilot",
      client: "FinServ Inc",
      stage: "Discovery",
      value: 310000,
      probability: 30,
      expectedClose: "2025-03-01",
      owner: "Michelle Chen",
      lastActivity: "2025-12-11",
      daysInStage: 15,
    },
    {
      id: 6,
      name: "ManufacCo - Exception Governance",
      client: "ManufacCo",
      stage: "Proposal",
      value: 220000,
      probability: 65,
      expectedClose: "2025-01-25",
      owner: "Todd LeBaron",
      lastActivity: "2025-12-13",
      daysInStage: 7,
    },
  ],
};

const metrics = {
  totalPipeline: 4310000,
  weightedPipeline: 2458000,
  avgDealSize: 358333,
  winRate: 67,
  avgSalesCycle: 45,
  conversionRate: 28,
};

export default function PipelinePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("All Stages");

  const stages = ["All Stages", ...pipelineData.stages.map((s) => s.name)];

  const filteredOpportunities = pipelineData.opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage =
      selectedStage === "All Stages" || opp.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const maxValue = Math.max(...pipelineData.stages.map((s) => s.value));

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
            <p className="text-gray-600 mt-1">
              Track opportunities and forecast revenue
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            New Opportunity
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Pipeline</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.totalPipeline / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              12% vs last quarter
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Weighted Pipeline</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.weightedPipeline / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((metrics.weightedPipeline / metrics.totalPipeline) * 100)}% of total
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Deal Size</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.avgDealSize / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Win Rate</div>
            <div className="text-2xl font-bold text-gray-900">{metrics.winRate}%</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Sales Cycle</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.avgSalesCycle} days
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.conversionRate}%
            </div>
          </div>
        </div>

        {/* Pipeline Funnel */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pipeline Funnel
          </h2>
          <div className="space-y-4">
            {pipelineData.stages.map((stage, index) => {
              const widthPercent = (stage.value / maxValue) * 100;
              return (
                <div key={stage.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">
                        {stage.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {stage.count} opportunities
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${(stage.value / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-8 relative">
                    <div
                      className={`${stage.color} h-8 rounded-full transition-all duration-500 flex items-center justify-center text-white text-sm font-medium`}
                      style={{ width: `${widthPercent}%` }}
                    >
                      {widthPercent > 15 && `${Math.round(widthPercent)}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Opportunities Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Active Opportunities
            </h2>
            <div className="flex gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
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
                    Opportunity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Probability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected Close
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in Stage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {opp.name}
                      </div>
                      <div className="text-sm text-gray-500">{opp.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {opp.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${opp.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${opp.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">
                          {opp.probability}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(opp.expectedClose).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {opp.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {opp.daysInStage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
