"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { bhgAssets } from "@/lib/demo-data";
import { MagnifyingGlassIcon } from "@/components/icons";

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Discovery", "Design", "Governance", "Deployment"];

  const categoryColors: Record<string, string> = {
    Discovery: "bg-blue-100 text-blue-800",
    Design: "bg-purple-100 text-purple-800",
    Governance: "bg-green-100 text-green-800",
    Deployment: "bg-orange-100 text-orange-800",
  };

  const typeIcons: Record<string, string> = {
    Template: "📄",
    Deck: "📊",
    Framework: "🏗️",
    Checklist: "✅",
    Playbook: "📖",
  };

  const filteredAssets = bhgAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets & Playbooks</h1>
          <p className="text-gray-600 mt-1">
            Consulting asset library and delivery templates
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{typeIcons[asset.type]}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {asset.name}
                  </h3>
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        categoryColors[asset.category]
                      }`}
                    >
                      {asset.category}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {asset.type}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {asset.description}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  View
                </button>
                <button className="flex-1 px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded hover:opacity-90 transition-opacity">
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No assets found matching your search.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
