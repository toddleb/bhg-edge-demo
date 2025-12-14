"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { PieChartIcon, ArrowUpIcon } from "@/components/icons";

// Mock finance data
const financeData = {
  pnl: {
    quarters: [
      {
        quarter: "Q1 2024",
        revenue: 1050000,
        costs: 720000,
        grossProfit: 330000,
        expenses: 245000,
        netIncome: 85000,
      },
      {
        quarter: "Q2 2024",
        revenue: 1380000,
        costs: 890000,
        grossProfit: 490000,
        expenses: 312000,
        netIncome: 178000,
      },
      {
        quarter: "Q3 2024",
        revenue: 1120000,
        costs: 750000,
        grossProfit: 370000,
        expenses: 268000,
        netIncome: 102000,
      },
      {
        quarter: "Q4 2024",
        revenue: 1150000,
        costs: 780000,
        grossProfit: 370000,
        expenses: 285000,
        netIncome: 85000,
      },
    ],
  },
  expenses: [
    { category: "Personnel", budgeted: 850000, actual: 820000, variance: -30000 },
    { category: "Marketing", budgeted: 180000, actual: 195000, variance: 15000 },
    { category: "Technology", budgeted: 240000, actual: 235000, variance: -5000 },
    { category: "Travel", budgeted: 95000, actual: 88000, variance: -7000 },
    { category: "Office & Facilities", budgeted: 120000, actual: 118000, variance: -2000 },
    { category: "Professional Services", budgeted: 85000, actual: 92000, variance: 7000 },
  ],
  revenue: [
    { source: "Consulting Services", q4: 680000, ytd: 2850000, target: 3200000 },
    { source: "Retainer Agreements", q4: 285000, ytd: 1150000, target: 1100000 },
    { source: "Training & Workshops", q4: 125000, ytd: 420000, target: 480000 },
    { source: "Advisory Services", q4: 60000, ytd: 280000, target: 320000 },
  ],
  cashFlow: [
    { month: "Jul", operating: 125000, investing: -45000, financing: 0 },
    { month: "Aug", operating: 145000, investing: -12000, financing: 0 },
    { month: "Sep", operating: 98000, investing: -8000, financing: 0 },
    { month: "Oct", operating: 132000, investing: -15000, financing: 0 },
    { month: "Nov", operating: 118000, investing: -22000, financing: 0 },
    { month: "Dec", operating: 142000, investing: -18000, financing: 50000 },
  ],
};

const metrics = {
  ytdRevenue: 4700000,
  ytdTarget: 5200000,
  ytdGrossProfit: 1560000,
  ytdNetIncome: 450000,
  grossMargin: 33.2,
  netMargin: 9.6,
  burnRate: 285000,
  runway: 18,
};

export default function FinancePage() {
  const [selectedView, setSelectedView] = useState("P&L");

  const views = ["P&L", "Budget vs Actual", "Revenue", "Cash Flow"];

  const maxRevenue = Math.max(
    ...financeData.pnl.quarters.map((q) => q.revenue)
  );

  const totalBudget = financeData.expenses.reduce((sum, e) => sum + e.budgeted, 0);
  const totalActual = financeData.expenses.reduce((sum, e) => sum + e.actual, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">
            Financial performance and budget tracking
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">YTD Revenue</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.ytdRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((metrics.ytdRevenue / metrics.ytdTarget) * 100)}% of ${(metrics.ytdTarget / 1000000).toFixed(1)}M target
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Gross Margin</div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.grossMargin}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ${(metrics.ytdGrossProfit / 1000000).toFixed(2)}M profit
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Net Income (YTD)</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.ytdNetIncome / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              {metrics.netMargin}% net margin
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Monthly Burn Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(metrics.burnRate / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics.runway} months runway
            </div>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex gap-2">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === view
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        {/* P&L Statement */}
        {selectedView === "P&L" && (
          <>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Profit & Loss Statement - 2024
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Line Item
                      </th>
                      {financeData.pnl.quarters.map((q) => (
                        <th
                          key={q.quarter}
                          className="px-4 py-3 text-right text-sm font-semibold text-gray-900"
                        >
                          {q.quarter}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        YTD Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        Revenue
                      </td>
                      {financeData.pnl.quarters.map((q) => (
                        <td
                          key={q.quarter}
                          className="px-4 py-3 text-sm text-right font-semibold text-gray-900"
                        >
                          ${(q.revenue / 1000).toFixed(0)}K
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                        ${(metrics.ytdRevenue / 1000).toFixed(0)}K
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Cost of Services
                      </td>
                      {financeData.pnl.quarters.map((q) => (
                        <td
                          key={q.quarter}
                          className="px-4 py-3 text-sm text-right text-gray-700"
                        >
                          (${(q.costs / 1000).toFixed(0)}K)
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-right text-gray-700">
                        (${(financeData.pnl.quarters.reduce((sum, q) => sum + q.costs, 0) / 1000).toFixed(0)}K)
                      </td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        Gross Profit
                      </td>
                      {financeData.pnl.quarters.map((q) => (
                        <td
                          key={q.quarter}
                          className="px-4 py-3 text-sm text-right font-semibold text-green-700"
                        >
                          ${(q.grossProfit / 1000).toFixed(0)}K
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-right font-bold text-green-700">
                        ${(metrics.ytdGrossProfit / 1000).toFixed(0)}K
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        Operating Expenses
                      </td>
                      {financeData.pnl.quarters.map((q) => (
                        <td
                          key={q.quarter}
                          className="px-4 py-3 text-sm text-right text-gray-700"
                        >
                          (${(q.expenses / 1000).toFixed(0)}K)
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-right text-gray-700">
                        (${(financeData.pnl.quarters.reduce((sum, q) => sum + q.expenses, 0) / 1000).toFixed(0)}K)
                      </td>
                    </tr>
                    <tr className="bg-blue-50 border-t-2 border-gray-300">
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">
                        Net Income
                      </td>
                      {financeData.pnl.quarters.map((q) => (
                        <td
                          key={q.quarter}
                          className="px-4 py-3 text-sm text-right font-bold text-gray-900"
                        >
                          ${(q.netIncome / 1000).toFixed(0)}K
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm text-right font-bold text-blue-700">
                        ${(metrics.ytdNetIncome / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quarterly Revenue Trend */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quarterly Revenue Trend
              </h2>
              <div className="space-y-4">
                {financeData.pnl.quarters.map((quarter) => {
                  const widthPercent = (quarter.revenue / maxRevenue) * 100;
                  const margin = ((quarter.grossProfit / quarter.revenue) * 100).toFixed(1);
                  return (
                    <div key={quarter.quarter}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {quarter.quarter}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            {margin}% margin
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            ${(quarter.revenue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-8">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-medium transition-all duration-500"
                          style={{ width: `${widthPercent}%` }}
                        >
                          {widthPercent > 25 && `${Math.round(widthPercent)}%`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Budget vs Actual */}
        {selectedView === "Budget vs Actual" && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Expense Budget vs Actual (YTD)
              </h2>
              <div className="text-sm">
                <span className="text-gray-600">Total Budget: </span>
                <span className="font-semibold text-gray-900">
                  ${(totalBudget / 1000).toFixed(0)}K
                </span>
                <span className="mx-2">•</span>
                <span className="text-gray-600">Total Actual: </span>
                <span className="font-semibold text-gray-900">
                  ${(totalActual / 1000).toFixed(0)}K
                </span>
                <span className="mx-2">•</span>
                <span className="font-semibold text-green-600">
                  ${((totalBudget - totalActual) / 1000).toFixed(0)}K under
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {financeData.expenses.map((expense) => {
                const percentUsed = (expense.actual / expense.budgeted) * 100;
                const isOver = expense.variance > 0;
                return (
                  <div key={expense.category}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">
                          {expense.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            isOver
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {isOver ? "+" : ""}${(expense.variance / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">
                          ${(expense.actual / 1000).toFixed(0)}K
                        </span>
                        <span className="text-gray-500 mx-2">/</span>
                        <span className="text-gray-600">
                          ${(expense.budgeted / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 relative">
                      <div
                        className={`h-6 rounded-full transition-all duration-500 ${
                          isOver
                            ? "bg-red-500"
                            : percentUsed > 90
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percentUsed, 100)}%` }}
                      ></div>
                      {percentUsed > 15 && (
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                          {Math.round(percentUsed)}% used
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Revenue Breakdown */}
        {selectedView === "Revenue" && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Revenue by Source
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue Source
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Q4 2024
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      YTD Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Annual Target
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % of Target
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {financeData.revenue.map((source) => {
                    const percentOfTarget = (source.ytd / source.target) * 100;
                    return (
                      <tr key={source.source} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {source.source}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          ${(source.q4 / 1000).toFixed(0)}K
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                          ${(source.ytd / 1000).toFixed(0)}K
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-600">
                          ${(source.target / 1000).toFixed(0)}K
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  percentOfTarget >= 100
                                    ? "bg-green-500"
                                    : percentOfTarget >= 85
                                    ? "bg-blue-500"
                                    : "bg-orange-500"
                                }`}
                                style={{
                                  width: `${Math.min(percentOfTarget, 100)}%`,
                                }}
                              ></div>
                            </div>
                            <span
                              className={`font-semibold ${
                                percentOfTarget >= 100
                                  ? "text-green-600"
                                  : percentOfTarget >= 85
                                  ? "text-blue-600"
                                  : "text-orange-600"
                              }`}
                            >
                              {Math.round(percentOfTarget)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cash Flow */}
        {selectedView === "Cash Flow" && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cash Flow Statement (Last 6 Months)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operating
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investing
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Financing
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Cash Flow
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {financeData.cashFlow.map((month) => {
                    const netCashFlow =
                      month.operating + month.investing + month.financing;
                    return (
                      <tr key={month.month} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {month.month}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-green-600">
                          ${(month.operating / 1000).toFixed(0)}K
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-red-600">
                          (${(Math.abs(month.investing) / 1000).toFixed(0)}K)
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          {month.financing === 0
                            ? "—"
                            : `$${(month.financing / 1000).toFixed(0)}K`}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-semibold">
                          <span
                            className={
                              netCashFlow >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            ${(netCashFlow / 1000).toFixed(0)}K
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
