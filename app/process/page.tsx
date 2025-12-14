"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { bhg6PData } from "@/lib/demo-data";
import {
  ArrowLeftIcon,
  ActivityLogIcon,
  CheckCircledIcon,
  ArrowRightIcon,
} from "@/components/icons";
import React from "react";

export default function ProcessPage() {
  const processData = bhg6PData.process;

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
              <ActivityLogIcon className="w-full h-full" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{processData.title}</h1>
              <p className="text-gray-600 mt-1">{processData.description}</p>
            </div>
          </div>
        </div>

        {/* Process Stages */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Engagement Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processData.stages.map((stage: string, index: number) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">
                    {index + 1}
                  </div>
                  <div className="font-semibold text-gray-900">{stage}</div>
                </div>
                {index < processData.stages.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Discovery */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Discovery</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Stakeholder interviews and current state assessment</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Process mapping and pain point identification</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Data gathering and baseline metrics</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Quick wins and recommendations</span>
              </li>
            </ul>
          </div>

          {/* Design */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Design</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Solution architecture and design workshops</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Compensation plan modeling and simulations</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Territory and quota design</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Stakeholder review and approval</span>
              </li>
            </ul>
          </div>

          {/* Build */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Build</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>System configuration and integration</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Data migration and validation</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Custom development and automation</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Testing and quality assurance</span>
              </li>
            </ul>
          </div>

          {/* Deploy */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Deploy</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>User training and enablement</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Change management and communication</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Go-live support and monitoring</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Performance tracking and reporting</span>
              </li>
            </ul>
          </div>

          {/* Govern */}
          <div className="card md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                5
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Govern</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Ongoing optimization and tuning</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Compliance monitoring and audit trails</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Exception management and approvals</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircledIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Continuous improvement initiatives</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Deliverables */}
        <div className="card bg-gradient-to-br from-gray-50 to-white">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Typical Deliverables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Documentation</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Process maps</li>
                <li>• Design documents</li>
                <li>• User guides</li>
                <li>• Runbooks</li>
              </ul>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Systems</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Configured SPM platform</li>
                <li>• Integrated data flows</li>
                <li>• Dashboards & reports</li>
                <li>• Automated workflows</li>
              </ul>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Enablement</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Training materials</li>
                <li>• Admin certification</li>
                <li>• Support playbooks</li>
                <li>• Knowledge base</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
