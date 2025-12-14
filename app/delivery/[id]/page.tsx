"use client";

import { use } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { bhgProjects } from "@/lib/demo-data";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  ActivityLogIcon,
  DotFilledIcon,
  StarIcon,
} from "@/components/icons";
import React from "react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const project = bhgProjects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
          <Link href="/delivery" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Delivery
          </Link>
        </div>
      </AppLayout>
    );
  }

  const healthColors = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<string, any> = {
    complete: CheckCircledIcon,
    "in-progress": ActivityLogIcon,
    pending: DotFilledIcon,
  };

  const statusColors: Record<string, string> = {
    complete: "text-green-600",
    "in-progress": "text-blue-600",
    pending: "text-gray-400",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/delivery"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 no-underline"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Delivery
        </Link>

        {/* Header */}
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {project.clientName}
              </h1>
              <p className="text-xl text-gray-600 mt-1">
                {project.engagementName}
              </p>
              <div className="flex gap-3 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                  {project.stage}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    healthColors[project.health]
                  }`}
                >
                  {project.health === "green" ? "On Track" : "At Risk"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Lead Consultant</p>
              <p className="text-lg font-semibold text-gray-900">{project.lead}</p>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Milestone Timeline
          </h2>
          <div className="space-y-4">
            {project.milestones.map((milestone, index) => {
              const StatusIcon = statusIcons[milestone.status];
              const colorClass = statusColors[milestone.status];
              return (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-6 h-6 ${colorClass}`}>
                  {React.createElement(StatusIcon, { className: "w-full h-full" })}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {milestone.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(milestone.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 capitalize mt-1">
                    {milestone.status.replace("-", " ")}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Project Notes */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Project Notes
          </h2>
          <p className="text-gray-700 leading-relaxed">{project.notes}</p>
        </div>

        {/* AI Use Cases */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            AI Use Cases for This Project
          </h2>
          <div className="space-y-2">
            {project.aiUseCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white rounded-lg"
              >
                <StarIcon className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
