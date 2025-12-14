"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import {
  FileTextIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  EyeOpenIcon,
  CopyIcon,
} from "@/components/icons";

// Mock content library data
const contentData = {
  assets: [
    {
      id: 1,
      title: "SPM Best Practices Guide 2025",
      type: "Guide",
      category: "Thought Leadership",
      format: "PDF",
      size: "2.4 MB",
      lastUpdated: "2024-12-01",
      downloads: 487,
      views: 1240,
      author: "Brad Hipwell",
      description: "Comprehensive guide to Sales Performance Management best practices",
      tags: ["SPM", "Best Practices", "Strategy"],
    },
    {
      id: 2,
      title: "Territory Design Template",
      type: "Template",
      category: "Tools",
      format: "Excel",
      size: "1.8 MB",
      lastUpdated: "2024-11-28",
      downloads: 342,
      views: 856,
      author: "Todd LeBaron",
      description: "Excel template for territory alignment and quota distribution",
      tags: ["Territory", "Template", "Planning"],
    },
    {
      id: 3,
      title: "Comp Plan Design Case Study: HealthCo",
      type: "Case Study",
      category: "Case Studies",
      format: "PDF",
      size: "3.1 MB",
      lastUpdated: "2024-12-05",
      downloads: 523,
      views: 1580,
      author: "Michelle Chen",
      description: "How HealthCo redesigned their compensation structure for growth",
      tags: ["Compensation", "Case Study", "Healthcare"],
    },
    {
      id: 4,
      title: "Exception Governance Framework",
      type: "Framework",
      category: "Methodology",
      format: "PowerPoint",
      size: "4.2 MB",
      lastUpdated: "2024-11-15",
      downloads: 298,
      views: 742,
      author: "Brad Hipwell",
      description: "Framework for managing comp plan exceptions and approvals",
      tags: ["Governance", "Exceptions", "Framework"],
    },
    {
      id: 5,
      title: "Quota Setting Methodology",
      type: "Methodology",
      category: "Methodology",
      format: "PDF",
      size: "1.9 MB",
      lastUpdated: "2024-12-10",
      downloads: 445,
      views: 1120,
      author: "Todd LeBaron",
      description: "Data-driven approach to quota allocation and target setting",
      tags: ["Quota", "Planning", "Methodology"],
    },
    {
      id: 6,
      title: "SPM Technology Landscape 2025",
      type: "Report",
      category: "Research",
      format: "PDF",
      size: "5.6 MB",
      lastUpdated: "2024-11-20",
      downloads: 612,
      views: 1890,
      author: "Michelle Chen",
      description: "Analysis of leading SPM platforms and selection criteria",
      tags: ["Technology", "Research", "Platforms"],
    },
    {
      id: 7,
      title: "Sales Kickoff Presentation Template",
      type: "Template",
      category: "Tools",
      format: "PowerPoint",
      size: "8.2 MB",
      lastUpdated: "2024-10-15",
      downloads: 387,
      views: 920,
      author: "Brad Hipwell",
      description: "Customizable SKO deck for comp plan rollout",
      tags: ["SKO", "Template", "Presentation"],
    },
    {
      id: 8,
      title: "ROI Calculator: SPM Initiatives",
      type: "Tool",
      category: "Tools",
      format: "Excel",
      size: "0.9 MB",
      lastUpdated: "2024-12-08",
      downloads: 267,
      views: 634,
      author: "Todd LeBaron",
      description: "Calculate expected ROI from SPM optimization projects",
      tags: ["ROI", "Calculator", "Business Case"],
    },
  ],
  categories: ["All Categories", "Thought Leadership", "Case Studies", "Methodology", "Tools", "Research"],
  types: ["All Types", "Guide", "Template", "Case Study", "Framework", "Methodology", "Report", "Tool"],
  formats: ["All Formats", "PDF", "Excel", "PowerPoint", "Word"],
};

const metrics = {
  totalAssets: 248,
  totalDownloads: 12840,
  totalViews: 34200,
  avgDownloadsPerAsset: 52,
  mostPopular: "SPM Technology Landscape 2025",
  recentUploads: 8,
};

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");

  const filteredAssets = contentData.assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All Categories" || asset.category === selectedCategory;
    const matchesType =
      selectedType === "All Types" || asset.type === selectedType;
    const matchesFormat =
      selectedFormat === "All Formats" || asset.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesType && matchesFormat;
  });

  const typeColors = {
    Guide: "bg-blue-100 text-blue-800",
    Template: "bg-green-100 text-green-800",
    "Case Study": "bg-purple-100 text-purple-800",
    Framework: "bg-orange-100 text-orange-800",
    Methodology: "bg-pink-100 text-pink-800",
    Report: "bg-cyan-100 text-cyan-800",
    Tool: "bg-yellow-100 text-yellow-800",
  };

  const formatIcons = {
    PDF: "📄",
    Excel: "📊",
    PowerPoint: "📽️",
    Word: "📝",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Hub</h1>
          <p className="text-gray-600 mt-1">
            Marketing and sales content library
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Assets</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalAssets}
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              {metrics.recentUploads} uploaded this month
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Total Downloads</div>
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.totalDownloads / 1000).toFixed(1)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Avg {metrics.avgDownloadsPerAsset} per asset
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Total Views</div>
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.totalViews / 1000).toFixed(1)}K
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Most Popular</div>
            <div className="text-sm font-semibold text-gray-900 mt-2">
              {metrics.mostPopular}
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Content by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentData.categories.slice(1).map((category) => {
              const count = contentData.assets.filter(
                (a) => a.category === category
              ).length;
              const percentage = (count / contentData.assets.length) * 100;
              return (
                <div
                  key={category}
                  className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category}</span>
                    <span className="text-lg font-bold text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asset Library */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Asset Library</h2>
            <div className="flex gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {contentData.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {contentData.types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {contentData.formats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center text-2xl">
                    {formatIcons[asset.format as keyof typeof formatIcons]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {asset.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          typeColors[asset.type as keyof typeof typeColors]
                        }`}
                      >
                        {asset.type}
                      </span>
                      <span className="text-xs text-gray-500">{asset.format}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{asset.size}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {asset.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CopyIcon className="w-3 h-3" />
                      {asset.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <EyeOpenIcon className="w-3 h-3" />
                      {asset.views}
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded hover:opacity-90 transition-opacity">
                    Download
                  </button>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Updated {new Date(asset.lastUpdated).toLocaleDateString()} • {asset.author}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Downloaded */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Most Downloaded This Month
          </h2>
          <div className="space-y-3">
            {contentData.assets
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 5)
              .map((asset, index) => (
                <div
                  key={asset.id}
                  className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {asset.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{asset.type}</span>
                      <span>•</span>
                      <span>{asset.format}</span>
                      <span>•</span>
                      <span>{asset.author}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {asset.downloads}
                    </div>
                    <div className="text-xs text-gray-500">downloads</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
