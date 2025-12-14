"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import {
  PersonIcon,
  MagnifyingGlassIcon,
  StarIcon,
  CheckCircledIcon,
} from "@/components/icons";

// Mock team data
const teamData = {
  members: [
    {
      id: 1,
      name: "Brad Hipwell",
      role: "Managing Partner",
      department: "Leadership",
      email: "brad@bhg.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      expertise: ["SPM Strategy", "Territory Design", "Comp Plan Design", "Exception Governance"],
      certifications: ["Xactly Certified", "Salesforce CPQ", "Anaplan Model Builder"],
      yearsExperience: 15,
      projectsCompleted: 47,
      activeProjects: 3,
      utilization: 85,
      billableRate: 350,
      availability: "Limited",
      recentProjects: [
        { name: "ProMach - Phase 1", role: "Lead", status: "Active" },
        { name: "RetailCorp - Quota Design", role: "Lead", status: "Active" },
      ],
    },
    {
      id: 2,
      name: "Todd LeBaron",
      role: "Senior Consultant",
      department: "Delivery",
      email: "todd@bhg.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      expertise: ["Quota Planning", "Sales Analytics", "Data Integration", "Process Automation"],
      certifications: ["Tableau Desktop Specialist", "Anaplan Model Builder", "AWS Solutions Architect"],
      yearsExperience: 12,
      projectsCompleted: 38,
      activeProjects: 2,
      utilization: 78,
      billableRate: 275,
      availability: "Available",
      recentProjects: [
        { name: "SaaS Vendor - Comp Redesign", role: "Technical Lead", status: "Active" },
        { name: "ManufacCo - Exception Governance", role: "Lead", status: "Active" },
      ],
    },
    {
      id: 3,
      name: "Michelle Chen",
      role: "Senior Consultant",
      department: "Delivery",
      email: "michelle@bhg.com",
      phone: "+1 (555) 345-6789",
      location: "New York, NY",
      expertise: ["Change Management", "Training", "SPM Platform Selection", "Business Case Development"],
      certifications: ["PMP", "PROSCI Change Management", "Salesforce Admin"],
      yearsExperience: 10,
      projectsCompleted: 32,
      activeProjects: 2,
      utilization: 72,
      billableRate: 275,
      availability: "Available",
      recentProjects: [
        { name: "HealthCo - Territory Expansion", role: "Lead", status: "Active" },
        { name: "FinServ Inc - SPM Pilot", role: "Advisor", status: "Active" },
      ],
    },
    {
      id: 4,
      name: "Sarah Martinez",
      role: "Consultant",
      department: "Delivery",
      email: "sarah@bhg.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      expertise: ["Compensation Design", "Incentive Modeling", "Reporting", "Training Delivery"],
      certifications: ["Xactly Certified", "Tableau Desktop Specialist"],
      yearsExperience: 6,
      projectsCompleted: 18,
      activeProjects: 2,
      utilization: 68,
      billableRate: 225,
      availability: "Available",
      recentProjects: [
        { name: "ARA - SPM Assessment", role: "Analyst", status: "Active" },
        { name: "ClientNorth - Comp Design", role: "Consultant", status: "Planning" },
      ],
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Consultant",
      department: "Delivery",
      email: "james@bhg.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      expertise: ["Data Migration", "System Integration", "Technical Architecture", "API Development"],
      certifications: ["Salesforce Developer", "AWS Certified", "Informatica Specialist"],
      yearsExperience: 8,
      projectsCompleted: 24,
      activeProjects: 1,
      utilization: 55,
      billableRate: 250,
      availability: "Available",
      recentProjects: [
        { name: "InsightCo - Exception Handling", role: "Technical Lead", status: "Planning" },
      ],
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      role: "Analyst",
      department: "Delivery",
      email: "emily@bhg.com",
      phone: "+1 (555) 678-9012",
      location: "Denver, CO",
      expertise: ["Data Analysis", "Excel Modeling", "Documentation", "Testing"],
      certifications: ["Excel Expert", "Tableau Desktop Associate"],
      yearsExperience: 3,
      projectsCompleted: 12,
      activeProjects: 2,
      utilization: 82,
      billableRate: 175,
      availability: "Limited",
      recentProjects: [
        { name: "ProMach - Phase 1", role: "Analyst", status: "Active" },
        { name: "ARA - SPM Assessment", role: "Analyst", status: "Active" },
      ],
    },
  ],
  departments: ["All Departments", "Leadership", "Delivery", "Sales", "Marketing"],
  skills: [
    "SPM Strategy",
    "Territory Design",
    "Comp Plan Design",
    "Quota Planning",
    "Data Integration",
    "Change Management",
  ],
};

const metrics = {
  totalTeam: 24,
  activeConsultants: 18,
  avgUtilization: 73,
  totalCertifications: 86,
  avgExperience: 8.5,
  availableNow: 12,
};

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const filteredMembers = teamData.members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.expertise.some((e) =>
        e.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const availabilityColors = {
    Available: "bg-green-100 text-green-800",
    Limited: "bg-yellow-100 text-yellow-800",
    Unavailable: "bg-red-100 text-red-800",
  };

  const selectedMemberData = selectedMember
    ? teamData.members.find((m) => m.id === selectedMember)
    : null;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Directory</h1>
          <p className="text-gray-600 mt-1">
            Consultant profiles and expertise
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="card">
            <div className="text-sm text-gray-600">Total Team</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalTeam}
            </div>
            <div className="text-xs text-gray-500 mt-1">Members</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Active</div>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.activeConsultants}
            </div>
            <div className="text-xs text-gray-500 mt-1">On projects</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Utilization</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.avgUtilization}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Billable time</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Certifications</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.totalCertifications}
            </div>
            <div className="text-xs text-gray-500 mt-1">Team total</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Avg Experience</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.avgExperience} yrs
            </div>
            <div className="text-xs text-gray-500 mt-1">Industry exp</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-600">Available Now</div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.availableNow}
            </div>
            <div className="text-xs text-gray-500 mt-1">For new work</div>
          </div>
        </div>

        {/* Utilization Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Team Utilization
          </h2>
          <div className="space-y-3">
            {teamData.members.slice(0, 6).map((member) => (
              <div key={member.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {member.activeProjects} active projects
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {member.utilization}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {member.availability}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      member.utilization >= 80
                        ? "bg-red-500"
                        : member.utilization >= 70
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${member.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Directory */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">All Team Members</h2>
            <div className="flex gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-80"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {teamData.departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.location}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      availabilityColors[
                        member.availability as keyof typeof availabilityColors
                      ]
                    }`}
                  >
                    {member.availability}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Expertise:</div>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{member.expertise.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-gray-200">
                  <div>
                    <span className="text-gray-500">Experience:</span>
                    <div className="font-semibold text-gray-900">
                      {member.yearsExperience} years
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Projects:</span>
                    <div className="font-semibold text-gray-900">
                      {member.projectsCompleted} completed
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Utilization:</span>
                    <div className="font-semibold text-gray-900">
                      {member.utilization}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Active:</span>
                    <div className="font-semibold text-gray-900">
                      {member.activeProjects} projects
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member Detail */}
        {selectedMemberData && (
          <div className="card bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedMemberData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedMemberData.name}
                  </h2>
                  <p className="text-gray-600">{selectedMemberData.role}</p>
                  <p className="text-sm text-gray-500">
                    {selectedMemberData.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <div className="font-medium text-blue-600">
                      {selectedMemberData.email}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <div className="font-medium text-gray-900">
                      {selectedMemberData.phone}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Billable Rate:</span>
                    <div className="font-medium text-gray-900">
                      ${selectedMemberData.billableRate}/hr
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Experience:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMemberData.yearsExperience} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Completed Projects:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMemberData.projectsCompleted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Current Utilization:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMemberData.utilization}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedMemberData.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircledIcon className="w-5 h-5 text-green-600" />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedMemberData.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Recent Projects
              </h3>
              <div className="space-y-2">
                {selectedMemberData.recentProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {project.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Role: {project.role}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
