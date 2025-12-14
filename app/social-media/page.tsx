"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Share1Icon, ArrowUpIcon, CalendarIcon } from "@/components/icons";

// Mock social media data
const socialData = {
  posts: [
    {
      id: 1,
      platform: "LinkedIn",
      content: "5 Critical Mistakes in Territory Design That Cost You Revenue",
      publishDate: "2024-12-10",
      status: "Published",
      impressions: 8420,
      engagement: 687,
      clicks: 142,
      shares: 34,
      type: "Thought Leadership",
    },
    {
      id: 2,
      platform: "LinkedIn",
      content: "New Case Study: How HealthCo Optimized Their SPM Framework",
      publishDate: "2024-12-08",
      status: "Published",
      impressions: 12350,
      engagement: 1248,
      clicks: 289,
      shares: 67,
      type: "Case Study",
    },
    {
      id: 3,
      platform: "LinkedIn",
      content: "Webinar Invite: Exception Governance Best Practices",
      publishDate: "2024-12-12",
      status: "Published",
      impressions: 5680,
      engagement: 428,
      clicks: 95,
      shares: 18,
      type: "Event Promotion",
    },
    {
      id: 4,
      platform: "Twitter",
      content: "Quick tip: Start your quota planning with market analysis, not history",
      publishDate: "2024-12-11",
      status: "Published",
      impressions: 3420,
      engagement: 187,
      clicks: 45,
      shares: 23,
      type: "Quick Tip",
    },
    {
      id: 5,
      platform: "LinkedIn",
      content: "Q1 2025 Comp Plan Trends: What We're Seeing Across Industries",
      publishDate: "2024-12-14",
      status: "Scheduled",
      impressions: 0,
      engagement: 0,
      clicks: 0,
      shares: 0,
      type: "Thought Leadership",
    },
    {
      id: 6,
      platform: "LinkedIn",
      content: "Introducing Our New SPM Assessment Framework",
      publishDate: "2024-12-15",
      status: "Scheduled",
      impressions: 0,
      engagement: 0,
      clicks: 0,
      shares: 0,
      type: "Product",
    },
  ],
  weekly: [
    { week: "Week 46", impressions: 28500, engagement: 2340, clicks: 567 },
    { week: "Week 47", impressions: 32100, engagement: 2890, clicks: 678 },
    { week: "Week 48", impressions: 35800, engagement: 3150, clicks: 742 },
    { week: "Week 49", impressions: 29870, engagement: 2550, clicks: 571 },
    { week: "Week 50", impressions: 38200, engagement: 3420, clicks: 823 },
  ],
  platforms: [
    {
      name: "LinkedIn",
      followers: 4280,
      growth: 12,
      posts: 45,
      avgEngagement: 8.2,
      topPost: "Territory Design Mistakes",
    },
    {
      name: "Twitter",
      followers: 1850,
      growth: 5,
      posts: 78,
      avgEngagement: 4.5,
      topPost: "Quota Planning Tip",
    },
  ],
};

const metrics = {
  totalFollowers: 6130,
  monthlyGrowth: 8.5,
  avgEngagementRate: 7.1,
  totalImpressions: 164470,
  totalEngagement: 14350,
  contentPieces: 123,
};

export default function SocialMediaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const platforms = ["All Platforms", "LinkedIn", "Twitter"];
  const statuses = ["All Status", "Published", "Scheduled", "Draft"];

  const filteredPosts = socialData.posts.filter((post) => {
    const matchesSearch = post.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform =
      selectedPlatform === "All Platforms" || post.platform === selectedPlatform;
    const matchesStatus =
      selectedStatus === "All Status" || post.status === selectedStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const maxWeeklyImpressions = Math.max(
    ...socialData.weekly.map((w) => w.impressions)
  );

  const statusColors = {
    Published: "bg-green-100 text-green-800",
    Scheduled: "bg-blue-100 text-blue-800",
    Draft: "bg-gray-100 text-gray-800",
  };

  const platformColors = {
    LinkedIn: "bg-blue-600",
    Twitter: "bg-cyan-500",
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media</h1>
          <p className="text-gray-600 mt-1">
            Content calendar and engagement analytics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Followers</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalFollowers.toLocaleString()}
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="w-3 h-3" />
              +{metrics.monthlyGrowth}% this month
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Engagement Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.avgEngagementRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics.totalEngagement.toLocaleString()} total engagements
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Total Reach</div>
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.totalImpressions / 1000).toFixed(1)}K
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {metrics.contentPieces} content pieces
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Platform Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialData.platforms.map((platform) => (
              <div
                key={platform.name}
                className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${
                        platformColors[platform.name as keyof typeof platformColors]
                      } rounded-lg flex items-center justify-center`}
                    >
                      <Share1Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {platform.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {platform.posts} posts
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {platform.followers.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-600">
                      +{platform.growth}% growth
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Engagement:</span>
                    <span className="font-semibold text-gray-900">
                      {platform.avgEngagement}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Top post: {platform.topPost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Engagement Trend */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Weekly Engagement Trend
          </h2>
          <div className="space-y-4">
            {socialData.weekly.map((week) => {
              const widthPercent = (week.impressions / maxWeeklyImpressions) * 100;
              const engagementRate = (week.engagement / week.impressions) * 100;
              return (
                <div key={week.week}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{week.week}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {week.impressions.toLocaleString()} impressions
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {week.engagement.toLocaleString()} engagements
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-8">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-medium transition-all duration-500"
                      style={{ width: `${widthPercent}%` }}
                    >
                      {widthPercent > 20 && `${engagementRate.toFixed(1)}% engagement`}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {week.clicks} clicks
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Calendar */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Content Calendar</h2>
            <div className="flex gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
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

          <div className="space-y-3">
            {filteredPosts.map((post) => {
              const engagementRate =
                post.impressions > 0
                  ? ((post.engagement / post.impressions) * 100).toFixed(1)
                  : "0.0";

              return (
                <div
                  key={post.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            platformColors[
                              post.platform as keyof typeof platformColors
                            ]
                          }`}
                        ></div>
                        <span className="text-xs font-medium text-gray-600">
                          {post.platform}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            statusColors[post.status as keyof typeof statusColors]
                          }`}
                        >
                          {post.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.type}
                        </span>
                      </div>
                      <div className="font-medium text-gray-900 mb-2">
                        {post.content}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                        {post.status === "Published" && (
                          <>
                            <div>{post.impressions.toLocaleString()} impressions</div>
                            <div>{post.engagement.toLocaleString()} engagements</div>
                            <div>{post.clicks} clicks</div>
                            <div className="font-semibold text-blue-600">
                              {engagementRate}% rate
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {post.status === "Published" && post.shares > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Share1Icon className="w-3 h-3" />
                        <span>{post.shares} shares</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Top Performing Content
          </h2>
          <div className="space-y-3">
            {socialData.posts
              .filter((p) => p.status === "Published")
              .sort((a, b) => b.engagement - a.engagement)
              .slice(0, 3)
              .map((post, index) => {
                const engagementRate = (
                  (post.engagement / post.impressions) *
                  100
                ).toFixed(1);
                return (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {post.content}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                        <span>{post.platform}</span>
                        <span>•</span>
                        <span>{post.impressions.toLocaleString()} impressions</span>
                        <span>•</span>
                        <span className="font-semibold text-orange-600">
                          {engagementRate}% engagement
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {post.engagement.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">engagements</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
