"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { bhgProjects } from "@/lib/demo-data";

export default function DeliveryPage() {
  const healthColors = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };

  const stageColors: Record<string, string> = {
    Discovery: "bg-blue-100 text-blue-800",
    Design: "bg-purple-100 text-purple-800",
    Build: "bg-orange-100 text-orange-800",
    Deploy: "bg-green-100 text-green-800",
    Govern: "bg-gray-100 text-gray-800",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            SPM Delivery Control Room
          </h1>
          <p className="text-gray-600 mt-1">
            Track active BHG consulting engagements and delivery status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-2xl font-bold text-gray-900">
              {bhgProjects.length}
            </div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-green-600">
              {bhgProjects.filter((p) => p.health === "green").length}
            </div>
            <div className="text-sm text-gray-600">On Track</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-yellow-600">
              {bhgProjects.filter((p) => p.health === "yellow").length}
            </div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-blue-600">
              {bhgProjects.filter((p) => p.stage === "Design").length}
            </div>
            <div className="text-sm text-gray-600">In Design</div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client / Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Milestone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bhgProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/delivery/${project.id}`} className="group no-underline">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {project.clientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.engagementName}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        stageColors[project.stage]
                      }`}
                    >
                      {project.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        healthColors[project.health]
                      }`}
                    >
                      {project.health === "green" ? "On Track" : project.health === "yellow" ? "At Risk" : "Critical"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.lead}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {project.nextMilestone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.nextDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
