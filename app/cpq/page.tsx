"use client";

import AppLayout from "@/components/AppLayout";
import cpqData from "@/lib/data/cpq.json";

export default function CPQPage() {
  const stats = {
    totalValue: cpqData.documents.reduce((sum: number, doc: any) => sum + doc.value, 0),
    avgDealSize: cpqData.documents.reduce((sum: number, doc: any) => sum + doc.value, 0) / cpqData.documents.length,
    activeProposals: cpqData.documents.filter((d: any) => d.status === "Draft" || d.status === "Pending").length,
    winRate: 67,
  };

  const statusColors: Record<string, string> = {
    Draft: "bg-gray-100 text-gray-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Signed: "bg-blue-100 text-blue-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CPQ</h1>
          <p className="text-gray-600 mt-1">
            Configure, Price, and Quote Management
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Pipeline Value</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(stats.totalValue / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Deal Size</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(stats.avgDealSize / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Active Proposals</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.activeProposals}
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Win Rate</div>
            <div className="text-2xl font-bold text-gray-900">{stats.winRate}%</div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
            <button className="btn-primary">New Quote</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cpqData.documents.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {doc.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {doc.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${doc.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusColors[doc.status]
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(doc.date).toLocaleDateString()}
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
