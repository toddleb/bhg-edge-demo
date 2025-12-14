"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ArrowUpIcon, CalendarIcon } from "@/components/icons";

// Mock forecasting data
const forecastData = {
  quarters: [
    {
      name: "Q4 2024",
      committed: 1250000,
      bestCase: 1680000,
      stretch: 2100000,
      actual: 1150000,
      projects: [
        { name: "RetailCorp - Quota Design", value: 195000, confidence: "Committed" },
        { name: "HealthCo - Territory Expansion", value: 285000, confidence: "Best Case" },
        { name: "ProMach - Phase 1", value: 180000, confidence: "Committed" },
        { name: "ManufacCo - Exception Governance", value: 220000, confidence: "Best Case" },
      ],
    },
    {
      name: "Q1 2025",
      committed: 950000,
      bestCase: 1450000,
      stretch: 1920000,
      actual: 0,
      projects: [
        { name: "SaaS Vendor - Comp Redesign", value: 425000, confidence: "Committed" },
        { name: "InsightCo - Exception Handling", value: 310000, confidence: "Best Case" },
        { name: "ARA - SPM Assessment", value: 180000, confidence: "Best Case" },
        { name: "FinServ - SPM Pilot", value: 310000, confidence: "Stretch" },
      ],
    },
    {
      name: "Q2 2025",
      committed: 620000,
      bestCase: 1150000,
      stretch: 1680000,
      actual: 0,
      projects: [
        { name: "ClientNorth - Comp Design", value: 285000, confidence: "Committed" },
        { name: "TechCorp - Analytics", value: 340000, confidence: "Best Case" },
        { name: "Global Inc - SPM Suite", value: 525000, confidence: "Stretch" },
      ],
    },
    {
      name: "Q3 2025",
      committed: 450000,
      bestCase: 980000,
      stretch: 1520000,
      actual: 0,
      projects: [
        { name: "RetailPro - Territory Design", value: 295000, confidence: "Best Case" },
        { name: "Services Co - Quota Model", value: 155000, confidence: "Committed" },
        { name: "Enterprise LLC - Full Stack", value: 540000, confidence: "Stretch" },
      ],
    },
  ],
  historical: [
    { quarter: "Q1 2024", revenue: 1050000, target: 1200000 },
    { quarter: "Q2 2024", revenue: 1380000, target: 1300000 },
    { quarter: "Q3 2024", revenue: 1120000, target: 1250000 },
    { quarter: "Q4 2024", revenue: 1150000, target: 1400000 },
  ],
};

const metrics = {
  currentQuarterTarget: 1400000,
  currentQuarterActual: 1150000,
  yearTarget: 5200000,
  yearActual: 4700000,
  attainment: 82,
  pipelineCoverage: 2.8,
};

export default function ForecastingPage() {
  const [selectedQuarter, setSelectedQuarter] = useState(0);
  const currentQuarter = forecastData.quarters[selectedQuarter];
  const maxValue = Math.max(...forecastData.quarters.map((q) => q.stretch));

  const confidenceColors = {
    Committed: "bg-green-100 text-green-800",
    "Best Case": "bg-blue-100 text-blue-800",
    Stretch: "bg-purple-100 text-purple-800",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Forecasting</h1>
          <p className="text-gray-600 mt-1">
            Project revenue and track performance against targets
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Q4 2024 Target</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.currentQuarterTarget / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">Current quarter</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Q4 2024 Actual</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.currentQuarterActual / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((metrics.currentQuarterActual / metrics.currentQuarterTarget) * 100)}% of target
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">2024 Attainment</div>
            <div className="text-2xl font-bold text-gray-900">{metrics.attainment}%</div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              +5% vs 2023
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Pipeline Coverage</div>
            <div className="text-2xl font-bold text-gray-900">{metrics.pipelineCoverage}x</div>
            <div className="text-xs text-gray-500 mt-1">Healthy coverage ratio</div>
          </div>
        </div>

        {/* Quarter Selector */}
        <div className="flex gap-2">
          {forecastData.quarters.map((quarter, index) => (
            <button
              key={quarter.name}
              onClick={() => setSelectedQuarter(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedQuarter === index
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {quarter.name}
            </button>
          ))}
        </div>

        {/* Forecast Bars */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuarter.name} Forecast
          </h2>
          <div className="space-y-6">
            {/* Committed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">Committed</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    High Confidence
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  ${(currentQuarter.committed / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-10">
                <div
                  className="bg-green-500 h-10 rounded-full flex items-center justify-end pr-4 text-white text-sm font-medium"
                  style={{
                    width: `${(currentQuarter.committed / maxValue) * 100}%`,
                  }}
                >
                  {Math.round((currentQuarter.committed / maxValue) * 100)}%
                </div>
              </div>
            </div>

            {/* Best Case */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">Best Case</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Medium Confidence
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  ${(currentQuarter.bestCase / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-10">
                <div
                  className="bg-blue-500 h-10 rounded-full flex items-center justify-end pr-4 text-white text-sm font-medium"
                  style={{
                    width: `${(currentQuarter.bestCase / maxValue) * 100}%`,
                  }}
                >
                  {Math.round((currentQuarter.bestCase / maxValue) * 100)}%
                </div>
              </div>
            </div>

            {/* Stretch */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">Stretch</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                    Optimistic
                  </span>
                </div>
                <span className="font-semibold text-gray-900">
                  ${(currentQuarter.stretch / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-10">
                <div
                  className="bg-purple-500 h-10 rounded-full flex items-center justify-end pr-4 text-white text-sm font-medium"
                  style={{
                    width: `${(currentQuarter.stretch / maxValue) * 100}%`,
                  }}
                >
                  {Math.round((currentQuarter.stretch / maxValue) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Breakdown */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuarter.name} Project Breakdown
          </h2>
          <div className="space-y-3">
            {currentQuarter.projects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{project.name}</div>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
                      confidenceColors[project.confidence as keyof typeof confidenceColors]
                    }`}
                  >
                    {project.confidence}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    ${project.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Performance */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Historical Performance (2024)
          </h2>
          <div className="space-y-4">
            {forecastData.historical.map((period) => {
              const attainment = (period.revenue / period.target) * 100;
              return (
                <div key={period.quarter}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{period.quarter}</div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">
                        ${(period.revenue / 1000).toFixed(0)}K
                      </span>
                      <span className="text-gray-500 mx-2">/</span>
                      <span className="text-gray-600">
                        ${(period.target / 1000).toFixed(0)}K target
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div
                        className={`h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                          attainment >= 100 ? "bg-green-500" : attainment >= 90 ? "bg-blue-500" : "bg-orange-500"
                        }`}
                        style={{ width: `${Math.min(attainment, 100)}%` }}
                      >
                        {attainment >= 15 && `${Math.round(attainment)}%`}
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        attainment >= 100
                          ? "text-green-600"
                          : attainment >= 90
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}
                    >
                      {Math.round(attainment)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quarterly Comparison */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            2025 Quarterly Outlook
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {forecastData.quarters.map((quarter) => (
              <div key={quarter.name} className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-gray-600 mb-3">
                  {quarter.name}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Committed:</span>
                    <span className="font-semibold text-green-600">
                      ${(quarter.committed / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Best Case:</span>
                    <span className="font-semibold text-blue-600">
                      ${(quarter.bestCase / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Stretch:</span>
                    <span className="font-semibold text-purple-600">
                      ${(quarter.stretch / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
