"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { bhg6PData } from "@/lib/demo-data";
import {
  ArrowLeftIcon,
  BoxIcon,
  CheckCircledIcon,
  StarIcon,
  LightningBoltIcon,
} from "@/components/icons";
import React from "react";

export default function ProductsPage() {
  const productsData = bhg6PData.productsPrograms;

  const products = [
    {
      name: "SPARCC SPM OS",
      category: "Platform",
      description: "Comprehensive Sales Performance Management Operating System with AI-powered analytics",
      features: ["Territory Management", "Quota Setting", "Commission Processing", "Performance Analytics", "Incentive Design"],
      status: "Production",
      icon: "🚀",
    },
    {
      name: "Comp Plan Diagnostic",
      category: "Assessment",
      description: "Rapid assessment tool for evaluating compensation plan effectiveness and alignment",
      features: ["90-day assessment", "Quick wins identification", "ROI modeling", "Gap analysis"],
      status: "Active",
      icon: "🔍",
    },
    {
      name: "Territory Optimizer",
      category: "Tool",
      description: "Data-driven territory design and optimization with AI-powered balancing",
      features: ["Geographic analysis", "Account segmentation", "Workload balancing", "Revenue potential mapping"],
      status: "Production",
      icon: "🗺️",
    },
    {
      name: "Quota Allocation Engine",
      category: "Tool",
      description: "Intelligent quota distribution system with predictive analytics",
      features: ["Top-down/bottom-up modeling", "Historical performance analysis", "Market factor adjustment", "What-if scenarios"],
      status: "Production",
      icon: "📊",
    },
    {
      name: "Exception Governance Framework",
      category: "Methodology",
      description: "Structured approach to managing compensation plan exceptions and approvals",
      features: ["Approval workflows", "Audit trails", "Compliance tracking", "Policy management"],
      status: "Production",
      icon: "⚖️",
    },
    {
      name: "Sales Kickoff Accelerator",
      category: "Program",
      description: "Comprehensive SKO planning and execution program with AI content generation",
      features: ["Agenda planning", "Presentation templates", "Communication plans", "AI speech writing"],
      status: "Beta",
      icon: "🎯",
    },
  ];

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
              <BoxIcon className="w-full h-full" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{productsData.title}</h1>
              <p className="text-gray-600 mt-1">{productsData.description}</p>
            </div>
          </div>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Products</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">6</div>
            <div className="text-xs text-gray-500 mt-1">Active offerings</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">In Production</div>
            <div className="text-3xl font-bold text-green-600 mt-1">5</div>
            <div className="text-xs text-gray-500 mt-1">Live with clients</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Client Adoption</div>
            <div className="text-3xl font-bold text-blue-600 mt-1">87%</div>
            <div className="text-xs text-gray-500 mt-1">Across portfolio</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg ROI</div>
            <div className="text-3xl font-bold text-orange-600 mt-1">3.2x</div>
            <div className="text-xs text-gray-500 mt-1">Within 12 months</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="card hover:shadow-lg transition-shadow border-l-4 border-orange-500"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{product.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === "Production"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Beta"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-purple-600 mb-2">
                    {product.category}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  Key Features
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Offerings */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Service Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productsData.offerings.map((offering: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg"
              >
                <StarIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{offering}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Enhanced Products */}
        <div className="card border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center gap-3 mb-4">
            <LightningBoltIcon className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              AI-Enhanced Capabilities
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            All our products leverage AI and machine learning to deliver intelligent insights and
            automation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircledIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Predictive Analytics</div>
                <div className="text-sm text-gray-600">
                  Forecast performance and identify trends before they happen
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircledIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Smart Recommendations</div>
                <div className="text-sm text-gray-600">
                  AI-powered suggestions for quota allocation and territory design
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircledIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Automated Insights</div>
                <div className="text-sm text-gray-600">
                  Continuous monitoring with proactive alerts and recommendations
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircledIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900">Natural Language Processing</div>
                <div className="text-sm text-gray-600">
                  Ask questions in plain English, get instant data-driven answers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
