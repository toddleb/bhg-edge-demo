/**
 * BHG Edge Demo Data
 *
 * Static demo data for BHG Edge tenant showcase
 */

// 6P Dashboard Data
export const bhg6PData = {
  people: {
    title: "People",
    stats: ["3 Partners", "4 Sr Consultants", "3 Analysts"],
    description: "BHG SPM consulting team structure and capabilities",
  },
  process: {
    title: "Process",
    stages: ["Discovery", "Design", "Build", "Deploy", "Govern"],
    description: "BHG's proven SPM delivery lifecycle",
  },
  productsPrograms: {
    title: "Products/Programs",
    offerings: [
      "SPARCC SPM OS",
      "Comp Plan Diagnostic",
      "Exception Governance Framework",
      "Quota Design & Analytics",
    ],
    description: "BHG's SPM consulting offer catalog",
  },
  performance: {
    title: "Performance",
    stats: ["5 active projects", "2 in design phase", "3 in deployment"],
    description: "Current project portfolio snapshot",
  },
  pipeline: {
    title: "Pipeline",
    pursuits: [
      "ARA - SPM Assessment",
      "SaaS Vendor - Comp Redesign",
      "HealthCo - Pilot Program",
    ],
    description: "Active business development opportunities",
  },
  platform: {
    title: "Platform",
    tools: ["AICodeRally", "SPARCC", "Salesforce", "Anaplan", "Tableau"],
    description: "Technology stack powering BHG SPM delivery",
  },
};

// SPM Delivery Projects
export const bhgProjects = [
  {
    id: "promach-phase1",
    clientName: "ProMach",
    engagementName: "Phase 1 Assessment",
    stage: "Discovery",
    health: "green" as const,
    lead: "Brad Hipwell",
    nextMilestone: "Stakeholder interviews complete",
    nextDate: "2025-12-15",
    milestones: [
      { name: "Kickoff", date: "2025-11-20", status: "complete" },
      { name: "Data Collection", date: "2025-12-01", status: "complete" },
      {
        name: "Stakeholder Interviews",
        date: "2025-12-15",
        status: "in-progress",
      },
      { name: "Assessment Report", date: "2026-01-05", status: "pending" },
    ],
    notes:
      "ProMach engagement focused on current-state SPM assessment. Identifying gaps in comp plan design and exception handling processes. Strong executive sponsorship.",
    aiUseCases: [
      "Summarize stakeholder interview notes",
      "Analyze comp plan documentation for patterns",
      "Generate assessment findings summary",
    ],
  },
  {
    id: "clientnorth-comp-design",
    clientName: "ClientNorth",
    engagementName: "Comp Design",
    stage: "Design",
    health: "yellow" as const,
    lead: "Todd LeBaron",
    nextMilestone: "Present comp plan options to exec team",
    nextDate: "2025-12-20",
    milestones: [
      { name: "Discovery Complete", date: "2025-11-10", status: "complete" },
      { name: "Design Workshops", date: "2025-11-25", status: "complete" },
      { name: "Comp Plan Options", date: "2025-12-20", status: "in-progress" },
      { name: "Final Design Approval", date: "2026-01-15", status: "pending" },
    ],
    notes:
      "ClientNorth comp plan redesign. Balancing simplicity with motivational impact. Debate on quota vs revenue credit models. Need exec alignment by end of month.",
    aiUseCases: [
      "Draft comp plan option memos",
      "Model compensation scenarios",
      "Generate exec-ready presentation deck",
    ],
  },
  {
    id: "healthco-pilot",
    clientName: "HealthCo",
    engagementName: "SPM Pilot",
    stage: "Deploy",
    health: "green" as const,
    lead: "Michelle Chen",
    nextMilestone: "Pilot launch in West region",
    nextDate: "2025-12-18",
    milestones: [
      { name: "Pilot Design", date: "2025-10-15", status: "complete" },
      { name: "Configuration", date: "2025-11-20", status: "complete" },
      { name: "UAT", date: "2025-12-10", status: "complete" },
      { name: "Pilot Launch", date: "2025-12-18", status: "in-progress" },
    ],
    notes:
      "HealthCo SPM pilot in West region. Testing new territory alignment and quota rollout process. Strong user adoption signals. Planning expansion to East in Q1.",
    aiUseCases: [
      "Generate pilot status updates",
      "Summarize UAT feedback",
      "Draft expansion plan outline",
    ],
  },
  {
    id: "ara-assessment",
    clientName: "ARA",
    engagementName: "SPM Quick Assessment",
    stage: "Discovery",
    health: "green" as const,
    lead: "Brad Hipwell",
    nextMilestone: "Assessment kickoff meeting",
    nextDate: "2026-01-08",
    milestones: [
      { name: "Contract Signed", date: "2025-12-01", status: "complete" },
      { name: "Kickoff Meeting", date: "2026-01-08", status: "pending" },
      { name: "Data Review", date: "2026-01-20", status: "pending" },
      { name: "Assessment Delivery", date: "2026-02-10", status: "pending" },
    ],
    notes:
      "ARA quick SPM assessment. Focus on comp plan and territory effectiveness. Two-week engagement planned for January.",
    aiUseCases: [
      "Prep kickoff deck from template",
      "Draft data request list",
      "Generate assessment framework",
    ],
  },
  {
    id: "medtech-pilot",
    clientName: "InsightCo",
    engagementName: "Exception Handling Pilot",
    stage: "Design",
    health: "yellow" as const,
    lead: "Todd LeBaron",
    nextMilestone: "Exception workflow design approval",
    nextDate: "2026-01-12",
    milestones: [
      { name: "Discovery Workshops", date: "2025-11-28", status: "complete" },
      {
        name: "Exception Framework Draft",
        date: "2025-12-15",
        status: "in-progress",
      },
      {
        name: "Workflow Design Approval",
        date: "2026-01-12",
        status: "pending",
      },
      { name: "Pilot Build", date: "2026-02-01", status: "pending" },
    ],
    notes:
      "InsightCo exception handling pilot. Complex split credit scenarios. Designing automated workflow for common exception types. Some internal stakeholder resistance to automation.",
    aiUseCases: [
      "Analyze historical exception patterns",
      "Draft exception handling rules",
      "Generate stakeholder communication plan",
    ],
  },
];

// Assets & Playbooks
export const bhgAssets = [
  {
    id: "spm-survey-template",
    name: "SPM Delivery Survey (Template)",
    type: "Template",
    description:
      "Standard survey for SPM current-state assessment. Covers comp plans, territories, quotas, and exception handling.",
    category: "Discovery",
  },
  {
    id: "standard-design-deck",
    name: "Standard Design Deck – SPM Programs",
    type: "Deck",
    description:
      "Reusable PowerPoint template for SPM design presentations. Includes common frameworks and visual models.",
    category: "Design",
  },
  {
    id: "exception-framework",
    name: "Exception Handling Framework",
    type: "Framework",
    description:
      "BHG's structured approach to SPM exception governance. Decision trees, approval workflows, and audit trails.",
    category: "Governance",
  },
  {
    id: "comp-plan-qa-checklist",
    name: "Comp Plan QA Checklist",
    type: "Checklist",
    description:
      "Pre-deployment checklist for compensation plan quality assurance. Covers math validation, edge cases, and documentation.",
    category: "Deployment",
  },
  {
    id: "discovery-interview-guide",
    name: "Discovery Interview Guide",
    type: "Template",
    description:
      "Structured interview guide for SPM discovery phase. Role-specific questions for sales ops, finance, and sales leaders.",
    category: "Discovery",
  },
  {
    id: "quota-design-playbook",
    name: "Quota Design Playbook",
    type: "Playbook",
    description:
      "Step-by-step guide for quota setting and rollout. Includes forecasting models and territory balancing techniques.",
    category: "Design",
  },
  {
    id: "spm-governance-model",
    name: "SPM Governance Model",
    type: "Framework",
    description:
      "Framework for ongoing SPM program governance. Roles, meeting cadences, decision rights, and escalation paths.",
    category: "Governance",
  },
  {
    id: "deployment-runbook",
    name: "SPM Deployment Runbook",
    type: "Playbook",
    description:
      "Operational runbook for SPM system deployments. UAT scripts, rollback procedures, and go-live checklists.",
    category: "Deployment",
  },
];

// AI Workbench Recipes
export const bhgAIRecipes = [
  {
    id: "comp-plan-qa",
    label: "Ask about a comp plan",
    prompt:
      "Review this compensation plan document and identify any potential issues with math, edge cases, or clarity.",
  },
  {
    id: "delivery-plan",
    label: "Generate SPM delivery plan",
    prompt:
      "Create a delivery plan for an SPM assessment engagement. Include discovery, design, and deployment phases with key milestones.",
  },
  {
    id: "meeting-summary",
    label: "Summarize today's steering call",
    prompt:
      "Summarize the key decisions, action items, and risks from today's project steering committee call.",
  },
  {
    id: "client-email",
    label: "Draft client-ready email",
    prompt:
      "Draft a professional email to the client summarizing this week's progress and next steps for the SPM project.",
  },
  {
    id: "exception-analysis",
    label: "Analyze exception patterns",
    prompt:
      "Analyze this dataset of comp plan exceptions and identify the most common types, root causes, and recommendations for automation.",
  },
  {
    id: "stakeholder-memo",
    label: "Generate stakeholder memo",
    prompt:
      "Create an executive memo summarizing the SPM assessment findings and recommended next steps for the leadership team.",
  },
];

// Example AI responses for demo
export const bhgAIExampleResponses = [
  {
    user: "Summarize today's steering call",
    assistant:
      "**Steering Call Summary - ClientNorth Comp Design**\n\nKey Decisions:\n- Agreed to move forward with Option B (hybrid quota + revenue credit model)\n- Exec team approved 3% increase in total comp budget\n- Will pilot new model with West region first\n\nAction Items:\n- Todd to finalize comp plan documentation by 12/20\n- Finance to model budget impact scenarios\n- Sales ops to prepare UAT environment\n\nRisks:\n- Timeline is tight for Q1 launch\n- Need field sales buy-in on new crediting rules",
  },
  {
    user: "Draft client-ready email for ProMach",
    assistant:
      "Subject: ProMach SPM Assessment - Week of 12/4 Update\n\nHi [Client Name],\n\nQuick update on our Phase 1 Assessment progress:\n\n✅ Completed: Stakeholder interviews with Sales Ops and Finance teams\n📊 In Progress: Analyzing current comp plan documentation\n📅 Next: Executive interviews scheduled for next week\n\nWe're on track to deliver the assessment report by January 5th as planned. I'll send a detailed findings preview by end of next week.\n\nLet me know if you have any questions.\n\nBest,\nBrad",
  },
];
