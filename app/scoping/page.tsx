"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import {
  CheckboxIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
} from "@/components/icons";
import scopingData from "@/lib/data/scoping.json";

// Additional mock data for visualization
const additionalMetrics = {
  totalProjects: 24,
  activeScopes: 8,
  completedThisQuarter: 12,
  avgCompletionTime: 8,
  successRate: 94,
};

const complexityLevels = [
  { level: "Low", count: 6, color: "bg-green-500" },
  { level: "Medium", count: 10, color: "bg-yellow-500" },
  { level: "High", count: 8, color: "bg-red-500" },
];

export default function ScopingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const statuses = ["All Status", "in-progress", "draft", "completed"];

  const filteredProjects = scopingData.projects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Status" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    "in-progress": "bg-blue-100 text-blue-800",
    draft: "bg-gray-100 text-gray-800",
    completed: "bg-green-100 text-green-800",
  };

  const complexityColors = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-green-600",
  };

  const selectedProjectData = selectedProject
    ? scopingData.projects.find((p) => p.id === selectedProject)
    : null;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Scoping Tool</h1>
            <p className="text-gray-600 mt-1">
              Project scoping and estimation assistant
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            New Scope
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Projects</div>
            <div className="text-2xl font-bold text-gray-900">
              {additionalMetrics.totalProjects}
            </div>
            <div className="text-xs text-gray-500 mt-1">Lifetime scopes</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Active Scopes</div>
            <div className="text-2xl font-bold text-blue-600">
              {additionalMetrics.activeScopes}
            </div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Completed (Q4)</div>
            <div className="text-2xl font-bold text-green-600">
              {additionalMetrics.completedThisQuarter}
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              +3 vs Q3
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Completion</div>
            <div className="text-2xl font-bold text-gray-900">
              {additionalMetrics.avgCompletionTime} days
            </div>
            <div className="text-xs text-gray-500 mt-1">Time to complete</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Success Rate</div>
            <div className="text-2xl font-bold text-green-600">
              {additionalMetrics.successRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Converted to deals</div>
          </div>
        </div>

        {/* Complexity Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Project Complexity Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {complexityLevels.map((complexity) => {
              const percentage = (
                (complexity.count / additionalMetrics.totalProjects) *
                100
              ).toFixed(0);
              return (
                <div
                  key={complexity.level}
                  className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">
                      {complexity.level}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {complexity.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${complexity.color} h-3 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {percentage}% of total projects
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Templates */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Scoping Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scopingData.templates.map((template) => (
              <div
                key={template.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {template.description}
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-900">
                      {template.estimatedDuration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Budget:</span>
                    <span className="font-medium text-gray-900">
                      {template.typicalBudget}
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {template.modules.map((module) => (
                      <span
                        key={module}
                        className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="mt-4 w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded hover:opacity-90 transition-opacity">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Active Scoping Projects
            </h2>
            <div className="flex gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-all cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {project.projectName}
                    </h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      statusColors[project.status as keyof typeof statusColors]
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">
                      {project.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${project.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Owner:</span>
                    <div className="font-medium text-gray-900">
                      {project.owner}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Complexity:</span>
                    <div
                      className={`font-semibold ${
                        complexityColors[
                          project.complexity.overall as keyof typeof complexityColors
                        ]
                      }`}
                    >
                      {project.complexity.overall.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <div className="font-medium text-gray-900">
                      {project.summary.budgetRange}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Target Go-Live:</span>
                    <div className="font-medium text-gray-900">
                      {project.summary.targetGoLive}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Last updated:{" "}
                    {new Date(project.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProjectData && (
          <div className="card bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Project Detail: {selectedProjectData.projectName}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Project Vision
              </h3>
              <p className="text-gray-700">
                {selectedProjectData.summary.projectVision}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Complexity Scores
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedProjectData.complexity)
                    .filter(([key]) => key !== "overall")
                    .map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {value}/5
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              Number(value) >= 4
                                ? "bg-red-500"
                                : Number(value) >= 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${(Number(value) / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Tech Stack
                </h3>
                <div className="space-y-2">
                  {Object.entries(selectedProjectData.techStack).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
