import { useState, useRef } from "react";
import { AnalysisCard } from "./AnalysisCard";
import { GradeType, MetricDisplay } from "./MetricDisplay";
import { PerformanceMetric } from "./PerformanceMetric";
import { CodeMetricRow } from "./CodeMetricRow";
import { InsightMetricRow } from "./InsightMetricRow";
import GradeBadge from "./GradeBadge";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { IssuesProgressBar } from "./IssuesProgressBar";

// For TypeScript type safety
interface MemberDataItem {
  name: string;
  value: number;
  percentage: string;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: MemberDataItem;
  percent: number;
  value: number;
}

// Project analysis data structure
interface CodeAnalysisData {
  project: {
    name: string;
    analysisDate: string;
    technologies: string;
    description: string;
  };
  codeAnalysis: {
    complexity: { value: string; grade: GradeType };
    techDebt: string;
    securityRisk: { value: string; grade: GradeType };
    architectureComplexity: { value: string; grade: GradeType };
    cloudCompatibility: { value: string; grade: GradeType };
  };
  architecture: {
    systemArchitecture: string;
    couplingScore: string;
    linesOfCode: string;
    hostingEnvironment: string;
    codeCoverage: string;
    fileBreakdown: string;
    obsoleteLibraries: string[];
    cloudCompatibilityAssessment: string;
  };
  nfrCompatibility: {
    performance: { percentage: string; description: string };
    security: { percentage: string; description: string };
    compliance: { percentage: string; description: string };
    scalability: { percentage: string; description: string };
    maintainability: { percentage: string; description: string };
  };
  summary: {
    totalFiles: string;
    locLogic: string;
    locGui: string;
    subprograms: string;
    compatibilityIssues: string;
  };
  insights: {
    codeSmells: { value: string; grade: GradeType };
    bugs: { value: string; grade: GradeType };
    vulnerabilities: { value: string; grade: GradeType };
    functions: { value: string; grade: GradeType };
    codeCoverage: { value: string; grade: GradeType };
    complexity: { value: string; grade: GradeType };
    totalLinesOfCode: string;
    duplicateLinesDensity: { value: string; grade: GradeType };
  };
  securityRisks: {
    openVulnerabilities: { count: string; details: string[] };
    apiSecurityIssues: { count: string };
    regulatoryRisks: { count: string };
    singlePointsOfFailure: { count: string };
    riskiestComponents: { count: string };
  };
  // projectFiles: {
  //   // This would contain the chart data structure
  // };
  // binaries: {
  //   // This would contain the chart data structure
  // };
  members: {
    uniqueSubprograms: string;
    subroutines: string;
    functions: string;
    properties: string;
    externs: string;
    handlers: string;
    events: string;
  };
  comComponents: {
    totalReference: string;
    uniqueMembers: string;
    types: string;
    components: string;
  };
  win32API: {
    apiCallsToUniqueEntryPoints: string;
    uniqueEntryPoints: string;
    libraries: string;
    apiCallsToUserProcedures: string;
  };
  uiOverview: {
    uiContainers: string;
    controlInstances: string;
    uniqueControlTypes: string;
  };
  issues: {
    potentialIssueTypes: string;
    occurrences: string;
  };
}

// Sample data (to be replaced with actual data from API/backend)
const sampleAnalysisData: CodeAnalysisData = {
  project: {
    name: "Flipkart Ecommerce",
    analysisDate: "12 Jan 2025",
    technologies:
      "Java (Spring Boot), Angular, PostgreSQL, Redis, Docker, Kubernetes",
    description:
      "A legacy e-commerce platform providing product listings, order management, and payment processing, currently being modernized for cloud-native deployment. commerce platform providing product listings, order management, and payment processing, currently being modernized for cloud-native deployment.",
  },
  codeAnalysis: {
    complexity: { value: "A", grade: "A" },
    techDebt: "10d 6h",
    securityRisk: { value: "D", grade: "D" },
    architectureComplexity: { value: "B", grade: "B" },
    cloudCompatibility: { value: "C", grade: "C" },
  },
  architecture: {
    systemArchitecture: "Monolithic",
    couplingScore: "High (Monolithic Codebase)",
    linesOfCode: "1.2M Lines",
    hostingEnvironment: "On-Premises",
    codeCoverage: "29.12% (Low, needs improvement)",
    fileBreakdown:
      "5,200 Files, 10,500 Functions, 2,300 Classes, 4,700 Methods",
    obsoleteLibraries: [
      "4 Major outdated libraries (Spring 3.0, jQuery 1.9, Log4j)",
      "4 Major outdated libraries (Spring 3.0, jQuery 1.9, Log4j)",
    ],
    cloudCompatibilityAssessment:
      "Some dependencies incompatible with cloud-native architecture Some dependencies incompatible with cloud-native architecture Some dependencies incompatible with cloud.",
  },
  nfrCompatibility: {
    performance: { percentage: "100%", description: "(Handles peak load)" },
    security: { percentage: "60%", description: "(Protects from threats)" },
    compliance: { percentage: "65%", description: "(Meets regulations)" },
    scalability: { percentage: "70%", description: "(Grows with demand)" },
    maintainability: { percentage: "75%", description: "(Easy to update)" },
  },
  summary: {
    totalFiles: "13",
    locLogic: "3000",
    locGui: "0",
    subprograms: "13",
    compatibilityIssues: "196",
  },
  insights: {
    codeSmells: { value: "126", grade: "C" },
    bugs: { value: "67", grade: "D" },
    vulnerabilities: { value: "144", grade: "A" },
    functions: { value: "17", grade: "C" },
    codeCoverage: { value: "0%", grade: "B" },
    complexity: { value: "7", grade: "A" },
    totalLinesOfCode: "11698",
    duplicateLinesDensity: { value: "0%", grade: "B" },
  },
  securityRisks: {
    openVulnerabilities: {
      count: "3",
      details: [
        "SQL Injection, Hardcoded Secrets, Weak Encryption",
        "SQL Injection, Hardcoded Secrets, Weak Encryption",
      ],
    },
    apiSecurityIssues: { count: "4" },
    regulatoryRisks: { count: "2" },
    singlePointsOfFailure: { count: "4" },
    riskiestComponents: { count: "10" },
  },
  // projectFiles: {
  //   // This would contain the chart data structure
  // },
  // binaries: {
  //   // This would contain the chart data structure
  // },
  members: {
    uniqueSubprograms: "208",
    subroutines: "23 (20%)",
    functions: "58 (10%)",
    properties: "77 (30%)",
    externs: "23 (20%)",
    handlers: "18 (10%)",
    events: "9 (10%)",
  },
  comComponents: {
    totalReference: "126",
    uniqueMembers: "18",
    types: "6",
    components: "2",
  },
  win32API: {
    apiCallsToUniqueEntryPoints: "67",
    uniqueEntryPoints: "17",
    libraries: "7",
    apiCallsToUserProcedures: "23",
  },
  uiOverview: {
    uiContainers: "1",
    controlInstances: "3",
    uniqueControlTypes: "3",
  },
  issues: {
    potentialIssueTypes: "29",
    occurrences: "196",
  },
};

// Project Files chart data
const projectFilesData = [
  { category: "Forms", count: 1 },
  { category: "MDI", count: 0 },
  { category: "Classes", count: 4 },
  { category: "User Controls", count: 0 },
  { category: "Documents", count: 4 },
  { category: "Modules", count: 0 },
  { category: "Property", count: 0 },
  { category: "Designers", count: 1 },
];

// Binaries chart data
const binariesData = [
  { category: "EXEs", count: 0 },
  { category: "DLLs", count: 0 },
  { category: "Controls", count: 0 },
  { category: "OLE EXEs", count: 1 },
];

// Members data
const membersData = [
  { name: "Subroutines", value: 23, percentage: "20%" },
  { name: "Functions", value: 58, percentage: "10%" },
  { name: "Properties", value: 77, percentage: "30%" },
  { name: "Externs", value: 23, percentage: "20%" },
  { name: "Handlers", value: 18, percentage: "10%" },
  { name: "Events", value: 9, percentage: "10%" },
];

// Members chart colors
const membersColors = [
  "#15AE88", // teal
  "#4FD1C5", // lighter teal
  "#38B2AC", // medium teal
  "#2C7A7B", // darker teal
  "#234E52", // darkest teal
  "#81E6D9", // lightest teal
];

// Chart configuration
const projectFilesChartConfig = {
  count: {
    label: "Files Count",
    color: "rgba(36,229,169,1)",
  },
} satisfies ChartConfig;

// Binaries chart configuration
const binariesChartConfig = {
  count: {
    label: "Binaries Count",
    color: "rgba(36,229,169,1)",
  },
} satisfies ChartConfig;

// Create a custom active shape for the donut chart
const renderActiveShape = (props: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  // Calculate tooltip position - adjust to ensure visibility
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;

  // Ensure tooltip stays in view by adjusting distance from center based on angle
  let tooltipDistance = 100;
  if (midAngle > 45 && midAngle < 135) {
    tooltipDistance = 80; // Less distance when pointing upward
  } else if (midAngle > 225 && midAngle < 315) {
    tooltipDistance = 70; // Less distance when pointing downward
  }

  const mx = cx + (outerRadius + tooltipDistance * 0.3) * cos;
  const my = cy + (outerRadius + tooltipDistance * 0.3) * sin;
  const ex = cx + (outerRadius + tooltipDistance * 0.6) * cos;
  const ey = cy + (outerRadius + tooltipDistance * 0.6) * sin;

  return (
    <g style={{ pointerEvents: "none" }}>
      {/* Center text */}
      <text
        x={cx}
        y={cy}
        dy={-4}
        textAnchor="middle"
        fill="#1E3A3B"
        className="text-[26px] font-semibold"
      >
        {208}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        textAnchor="middle"
        fill="#5E6470"
        className="text-xs"
      >
        unique
      </text>
      <text
        x={cx}
        y={cy}
        dy={35}
        textAnchor="middle"
        fill="#5E6470"
        className="text-xs"
      >
        subprograms
      </text>

      {/* Active segment */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 8}
        fill={fill}
      />

      {/* Connecting line */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
    </g>
  );
};

export default function CodeAnalyseCompleted() {
  const [activeTab, setActiveTab] = useState("assessment");
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredLegend, setHoveredLegend] = useState<number | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    x: number;
    y: number;
    name: string;
    value: number;
    percentage: string;
    color: string;
    visible: boolean;
  } | null>(null);

  const chartRef = useRef<HTMLDivElement>(null);

  // In a real application, you might fetch this data from an API
  const analysisData = sampleAnalysisData;

  const onPieEnter = (_, index: number) => {
    setActiveIndex(index);

    if (chartRef.current) {
      const item = membersData[index];
      const color = membersColors[index % membersColors.length];

      // Get chart position relative to viewport
      const chartRect = chartRef.current.getBoundingClientRect();
      const centerX = chartRect.left + chartRect.width / 2;
      const centerY = chartRect.top + chartRect.height / 2;

      // Calculate angle for this segment (approximation)
      const dataTotal = membersData.reduce((sum, item) => sum + item.value, 0);
      const startAngle = membersData
        .slice(0, index)
        .reduce((sum, item) => sum + (item.value / dataTotal) * 360, 0);
      const midAngle = startAngle + (item.value / dataTotal) * 180;
      const RADIAN = Math.PI / 180;

      // Calculate position using angle
      const outerRadius = Math.min(chartRect.width, chartRect.height) / 2.5;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);

      // Adjust tooltip distance based on angle
      let tooltipDistance = outerRadius * 1.5;
      if (midAngle > 45 && midAngle < 135) {
        tooltipDistance = outerRadius * 1.2;
      } else if (midAngle > 225 && midAngle < 315) {
        tooltipDistance = outerRadius * 1.2;
      }

      const tooltipX = centerX + tooltipDistance * cos;
      const tooltipY = centerY + tooltipDistance * sin;

      setTooltipInfo({
        x: tooltipX,
        y: tooltipY,
        name: item.name,
        value: item.value,
        percentage: item.percentage,
        color: color,
        visible: true,
      });
    }
  };

  const onPieLeave = () => {
    setTooltipInfo(null);
  };

  const onLegendHover = (index: number | null) => {
    setHoveredLegend(index);
    if (index !== null) {
      setActiveIndex(index);
      // Simulate a pie enter event
      onPieEnter(null, index);
    } else {
      setTooltipInfo(null);
    }
  };

  return (
    <div className="bg-[rgba(244,251,251,1)] overflow-hidden">
      {/* Chart tooltip portal - positioned outside normal flow */}
      {tooltipInfo && tooltipInfo.visible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: `${tooltipInfo.y}px`,
              left: `${tooltipInfo.x}px`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              padding: "6px 10px",
              borderRadius: "4px",
              border: `1px solid ${tooltipInfo.color}`,
              zIndex: 9999,
              width: "auto",
              minWidth: "90px",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "12px", color: "#333" }}>
              {tooltipInfo.name}
            </div>
            <div style={{ fontSize: "11px", color: "#666" }}>
              {tooltipInfo.value} ({tooltipInfo.percentage})
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-md:max-w-full">
        {/* Project Header */}
        <div className="bg-white min-h-[130px] w-full pt-[30px] pb-3 px-[46px] max-md:max-w-full max-md:px-5">
          <div className="w-full max-md:max-w-full">
            <div className="flex w-full items-center justify-between flex-wrap max-md:max-w-full">
              <div className="self-stretch flex min-w-60 items-center gap-[5px] text-[28px] text-[rgba(0,65,45,1)] font-semibold tracking-[-0.17px] flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/1cc648b6a904cecf5aa50af5aed40b069cdaf174?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                  alt="Project icon"
                />
                <div className="self-stretch my-auto">
                  {analysisData.project.name}
                </div>
              </div>
              <div className="self-stretch gap-1 text-sm text-[rgba(0,43,30,1)] font-medium tracking-[-0.08px] my-auto">
                <span style={{ fontWeight: 400 }}>Code Analysed on:</span>{" "}
                {analysisData.project.analysisDate}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex w-full items-center whitespace-nowrap justify-between flex-wrap mt-[18px] max-md:max-w-full">
              <div className="self-stretch flex min-w-60 items-center gap-1 text-sm text-[rgba(0,32,22,1)] font-semibold tracking-[-0.08px] leading-none flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                <button
                  className={`${
                    activeTab === "assessment"
                      ? "bg-[rgba(21,174,136,1)] text-white shadow-[0px_1px_2px_rgba(82,88,102,0.06)]"
                      : ""
                  } self-stretch flex min-h-9 items-center gap-1 my-auto px-3 py-2 rounded-lg`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("assessment");
                  }}
                >
                  <div className="self-stretch gap-1.5 my-auto">Assessment</div>
                </button>
                <button
                  className={`${
                    activeTab === "comprehend"
                      ? "bg-[rgba(21,174,136,1)] text-white shadow-[0px_1px_2px_rgba(82,88,102,0.06)]"
                      : ""
                  } self-stretch flex min-h-9 items-center gap-1 my-auto px-3 py-2 rounded-lg`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("comprehend");
                  }}
                >
                  <div className="self-stretch gap-1.5 my-auto">Comprehend</div>
                </button>
                <button
                  className={`${
                    activeTab === "recommend"
                      ? "bg-[rgba(21,174,136,1)] text-white shadow-[0px_1px_2px_rgba(82,88,102,0.06)]"
                      : ""
                  } self-stretch flex min-h-9 items-center gap-1 my-auto px-3 py-2 rounded-lg`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("recommend");
                  }}
                >
                  <div className="self-stretch gap-1.5 my-auto">Recommend</div>
                </button>
              </div>

              {/* Grade Legend */}
              <div className="self-stretch flex min-w-60 items-center gap-5 text-center my-auto">
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <GradeBadge grade="A" />
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Minor
                  </div>
                </div>
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <GradeBadge grade="B" />
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Major
                  </div>
                </div>
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <GradeBadge grade="C" />
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Critical
                  </div>
                </div>
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <GradeBadge grade="D" />
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Blocker
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full justify-between mt-5 px-[46px] max-md:max-w-full max-md:px-5">
        <div className="flex min-w-60 w-full justify-between flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="flex min-w-60 w-full gap-5 flex-wrap flex-1 shrink basis-[0%] max-md:max-w-full">
            {/* Left Column */}
            <div className="flex min-w-60 flex-col items-stretch  w-[514px] max-md:max-w-full">
              {/* Code Analysis Card */}
              <AnalysisCard title="Code Analysis">
                <div className="flex w-full items-center gap-2.5 flex-wrap max-md:max-w-full">
                  <MetricDisplay
                    label="Code complexity"
                    value={analysisData.codeAnalysis.complexity.value}
                    grade={analysisData.codeAnalysis.complexity.grade}
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/6b81078e0b3ada3eadf066715993fc259b6e4d17?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/17dd735e8828bcbed7b73bb1f2ff339d306d7ef5?placeholderIfAbsent=true"
                  />
                  <MetricDisplay
                    label="Tech Debt"
                    value={analysisData.codeAnalysis.techDebt}
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/9db82ff1190c010b64265c0c89831e5732a9dfd1?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/a670b4cf38c87211677ca52a0c88666408a440e5?placeholderIfAbsent=true"
                  />
                </div>
                <div className="flex w-full items-center gap-2.5 flex-wrap mt-[17px] max-md:max-w-full">
                  <MetricDisplay
                    label="Security risk"
                    value={analysisData.codeAnalysis.securityRisk.value}
                    grade={analysisData.codeAnalysis.securityRisk.grade}
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/145f7ea15bbb9ae8d0f06d16ce0ae4325db52e79?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/075643386f4a7c221cf66e7f50ea6af967d8ff56?placeholderIfAbsent=true"
                  />
                  <MetricDisplay
                    label="Architecture Compexity"
                    value={
                      analysisData.codeAnalysis.architectureComplexity.value
                    }
                    grade={
                      analysisData.codeAnalysis.architectureComplexity.grade
                    }
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/57f2a3a682adf35210132e2ea23aed0fb7775961?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/456c306be0f080827899406639020198e4ccd596?placeholderIfAbsent=true"
                  />
                </div>
                <div className="flex w-full gap-2.5 flex-wrap mt-[17px] max-md:max-w-full">
                  <MetricDisplay
                    label="Cloud Compatibility"
                    value={analysisData.codeAnalysis.cloudCompatibility.value}
                    grade={analysisData.codeAnalysis.cloudCompatibility.grade}
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/434248c148b9ee777467d35b845d515c1e598686?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/fa9970bbd33e309d6f1f7aac2c85a5700909911c?placeholderIfAbsent=true"
                  />
                </div>
              </AnalysisCard>

              {/* About Card */}
              <AnalysisCard title="About" className="mt-5">
                <div className="text-[#0a0d14] text-base font-medium leading-[22px] tracking-[-0.1px] mt-[15px] max-md:max-w-full">
                  {analysisData.project.technologies}
                </div>
                <div className="text-[rgba(123,132,129,1)] text-xs font-normal leading-[18px] mt-[15px] max-md:max-w-full">
                  {analysisData.project.description}
                </div>
              </AnalysisCard>

              {/* Code & Architecture Analysis Card */}
              <AnalysisCard
                title="Code & Architecture Analysis"
                className="mt-5"
              >
                <div className="w-full text-sm font-medium tracking-[-0.08px] max-md:max-w-full">
                  <CodeMetricRow
                    label="System Architecture"
                    value={analysisData.architecture.systemArchitecture}
                  />
                  <CodeMetricRow
                    label="Coupling Score"
                    value={analysisData.architecture.couplingScore}
                    className="mt-[19px]"
                  />
                  <CodeMetricRow
                    label="Lines of Code (LoC)"
                    value={analysisData.architecture.linesOfCode}
                    className="mt-[19px]"
                  />
                  <CodeMetricRow
                    label="Hosting Environment"
                    value={analysisData.architecture.hostingEnvironment}
                    className="mt-[19px]"
                  />
                  <CodeMetricRow
                    label="Code Coverage"
                    value={analysisData.architecture.codeCoverage}
                    className="mt-[19px]"
                  />
                  <div className="flex min-h-10 w-full gap-6 flex-wrap mt-[19px] max-md:max-w-full">
                    <div className="text-[rgba(0,141,137,1)] leading-none w-[136px]">
                      File Breakdown
                    </div>
                    <div className="text-[#0a0d14] leading-5 flex-1 shrink basis-[0%]">
                      {analysisData.architecture.fileBreakdown}
                    </div>
                  </div>
                  <div className="flex min-h-[86px] w-full gap-[13px] flex-wrap mt-[19px] max-md:max-w-full">
                    <div className="text-[rgba(0,141,137,1)] leading-[18px] w-[136px]">
                      Obsolete Libraries <br />
                      count
                    </div>
                    <div className="min-w-60 text-[#0a0d14] flex-1 shrink basis-[0%]">
                      {analysisData.architecture.obsoleteLibraries.map(
                        (lib, index) => (
                          <div
                            key={index}
                            className={index > 0 ? "mt-2.5" : ""}
                          >
                            {lib}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex min-h-20 w-full gap-6 flex-wrap mt-[19px] max-md:max-w-full">
                    <div className="text-[rgba(0,141,137,1)] leading-[18px] w-[136px]">
                      Cloud Compatibility Assessment
                    </div>
                    <div className="text-[#0a0d14] leading-5 flex-1 shrink basis-[0%]">
                      {analysisData.architecture.cloudCompatibilityAssessment}
                    </div>
                  </div>
                </div>
              </AnalysisCard>

              {/* NFR Compatibility Score Card */}
              <AnalysisCard title="NFR Compatibility Score" className="mt-5">
                <div className="w-full font-medium max-md:max-w-full">
                  <PerformanceMetric
                    label="Performance"
                    percentage={
                      analysisData.nfrCompatibility.performance.percentage
                    }
                    description={
                      analysisData.nfrCompatibility.performance.description
                    }
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/0051d04a093a18a46bdb2e9f3d3b4741174c86a1?placeholderIfAbsent=true"
                  />
                  <PerformanceMetric
                    label="Security"
                    percentage={
                      analysisData.nfrCompatibility.security.percentage
                    }
                    description={
                      analysisData.nfrCompatibility.security.description
                    }
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/4fe5e82558b3dbfaed9be0435559bcad8b064b66?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                  <PerformanceMetric
                    label="Compliance"
                    percentage={
                      analysisData.nfrCompatibility.compliance.percentage
                    }
                    description={
                      analysisData.nfrCompatibility.compliance.description
                    }
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/84601feba2cf618847f2086818c9831e63ce726c?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                  <PerformanceMetric
                    label="Scalability"
                    percentage={
                      analysisData.nfrCompatibility.scalability.percentage
                    }
                    description={
                      analysisData.nfrCompatibility.scalability.description
                    }
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/9e93888255f6ab516ce108cb35bf81648e7459bf?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                  <PerformanceMetric
                    label="Maintainability"
                    percentage={
                      analysisData.nfrCompatibility.maintainability.percentage
                    }
                    description={
                      analysisData.nfrCompatibility.maintainability.description
                    }
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/308af89cd29ec94016ef3fffb73eba05ea62fb6b?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                </div>
              </AnalysisCard>
            </div>

            {/* Right Column */}
            <div className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
              {/* Overall Summary Card */}
              <div className="bg-white shadow-[0px_4px_10px_rgba(205,205,205,0.11)] flex w-full items-center gap-2.5 px-[15px] py-[22px] rounded-2xl max-md:max-w-full">
                <div className="self-stretch min-w-60 w-full flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                  <div className="text-[rgba(1,36,25,1)] text-lg font-semibold leading-none tracking-[-0.11px] max-md:max-w-full">
                    Overall Summary
                  </div>
                  <div className="w-full mt-5 max-md:max-w-full">
                    {/* Summary Stats */}
                    <div className="bg-[rgba(244,251,251,1)] border flex w-full items-center gap-[18px] overflow-hidden text-[rgba(1,36,25,1)] py-[5px] rounded-lg border-[rgba(202,243,230,1)] border-solid max-md:max-w-full">
                      <div className="self-stretch flex min-w-60 w-full items-center gap-[18px] flex-wrap flex-1 shrink basis-[0%] my-auto px-2.5 max-md:max-w-full">
                        <div className="self-stretch flex items-center gap-[40px_44px] justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              {analysisData.summary.totalFiles}
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              Total Files
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/6e06cceaf593962e6803f83862cee5601cab9081?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center gap-[40px_44px] justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              {analysisData.summary.locLogic}
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              LOC Logic
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/1a752af7b40f2522976ecaee7a896583320d15a6?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center gap-[40px_44px] justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              {analysisData.summary.locGui}
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              LOC GUI
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/f795b4e6c00643d68d7334495ed810caeddeebea?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center gap-[40px_44px] whitespace-nowrap justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              {analysisData.summary.subprograms}
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              Subprograms
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/71ea5f2adff46908f46ee78415d93b77c96b2ca9?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              {analysisData.summary.compatibilityIssues}
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              compatibility issues
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insights Section */}
                    <div className="bg-[rgba(244,251,251,1)] flex w-full flex-col overflow-hidden items-stretch text-sm justify-center mt-2.5 px-[15px] py-3.5 rounded-lg max-md:max-w-full h-full">
                      <div className="w-full max-md:max-w-full h-full flex flex-col">
                        <div className="flex w-full gap-[15px] text-[rgba(1,36,25,1)] font-semibold whitespace-nowrap tracking-[-0.08px] leading-none flex-wrap max-md:max-w-full">
                          <div className="flex-1 shrink basis-[0%] max-md:max-w-full">
                            Insights
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/d5fb972f5d0e8691c2efb624aa4f0758b6d3652f?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-5 shrink-0"
                            alt="Insights icon"
                          />
                        </div>
                        <div className="w-full mt-[15px] max-md:max-w-full flex-1">
                          <div className="flex w-full items-center gap-[45px_47px] text-xs text-[rgba(0,141,137,1)] font-normal whitespace-nowrap justify-between flex-wrap max-md:max-w-full">
                            <div className="self-stretch flex min-w-60 items-center gap-[40px_100px] justify-between w-[354px] my-auto">
                              <div className="self-stretch my-auto">
                                Metrics
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Value
                              </div>
                            </div>
                            <div className="self-stretch flex min-w-60 items-center gap-[40px_100px] justify-between w-[353px] my-auto">
                              <div className="self-stretch my-auto">
                                Metrics
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Value
                              </div>
                            </div>
                          </div>

                          {/* Insight Metrics */}
                          <div>
                            <div className="flex w-full gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                              <InsightMetricRow
                                label="Code Smells"
                                value={analysisData.insights.codeSmells.value}
                                grade={analysisData.insights.codeSmells.grade}
                                className="mt-[13px]"
                              />
                              <InsightMetricRow
                                label="Bugs"
                                value={analysisData.insights.bugs.value}
                                grade={analysisData.insights.bugs.grade}
                                className="mt-[13px]"
                              />
                            </div>
                            <div className="flex w-full gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                              <InsightMetricRow
                                label="Vulnerabilities"
                                value={
                                  analysisData.insights.vulnerabilities.value
                                }
                                grade={
                                  analysisData.insights.vulnerabilities.grade
                                }
                                className="mt-[13px]"
                              />
                              <InsightMetricRow
                                label="Functions"
                                value={analysisData.insights.functions.value}
                                grade={analysisData.insights.functions.grade}
                                className="mt-[13px]"
                              />
                            </div>
                            <div className="flex w-full gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                              <InsightMetricRow
                                label="Code Coverage"
                                value={analysisData.insights.codeCoverage.value}
                                grade={analysisData.insights.codeCoverage.grade}
                                className="mt-[13px]"
                              />
                              <InsightMetricRow
                                label="Complexity"
                                value={analysisData.insights.complexity.value}
                                grade={analysisData.insights.complexity.grade}
                                className="mt-[13px]"
                              />
                            </div>
                            <div className="flex w-full gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                              <InsightMetricRow
                                label="Total Lines of Code"
                                value={analysisData.insights.totalLinesOfCode}
                              />
                              <InsightMetricRow
                                label="Duplicate Lines Density"
                                value={
                                  analysisData.insights.duplicateLinesDensity
                                    .value
                                }
                                grade={
                                  analysisData.insights.duplicateLinesDensity
                                    .grade
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Files Section */}
                    <div className="bg-[rgba(244,251,251,1)] flex w-full flex-col overflow-hidden items-stretch justify-center mt-2.5 px-[13px] py-3.5 rounded-lg max-md:max-w-full h-full">
                      <div className="w-full max-md:max-w-full h-full flex flex-col">
                        <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px] max-md:max-w-full">
                          Project Files
                        </div>
                        <div className="mt-3.5 max-md:max-w-full flex-1">
                          <ChartContainer
                            config={projectFilesChartConfig}
                            className="h-[250px] w-full"
                          >
                            <BarChart
                              accessibilityLayer
                              data={projectFilesData}
                              barSize={25}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                              />
                              <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                domain={[0, 5]}
                                ticks={[0, 1, 2, 3, 4, 5]}
                              />
                              <ChartTooltip
                                content={
                                  <ChartTooltipContent
                                    labelFormatter={(value) =>
                                      `File Type: ${value}`
                                    }
                                  />
                                }
                              />
                              <Bar
                                dataKey="count"
                                fill="var(--color-count)"
                                radius={[3, 3, 0, 0]}
                                name="Files"
                              />
                              <ChartLegend content={<ChartLegendContent />} />
                            </BarChart>
                          </ChartContainer>
                        </div>
                      </div>
                    </div>

                    {/* Binaries and Members Section */}
                    <div className="flex w-full items-center gap-2.5 flex-wrap mt-2.5 max-md:max-w-full">
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg h-full">
                        <div className="w-full h-full flex flex-col">
                          <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px]">
                            Binaries
                          </div>
                          <div className="mt-3.5 flex-1">
                            <ChartContainer
                              config={binariesChartConfig}
                              className="h-[200px] w-full"
                            >
                              <BarChart
                                accessibilityLayer
                                data={binariesData}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                                barSize={25} // Make bars half the default width
                              >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                  dataKey="category"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                />
                                <YAxis
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                  domain={[0, 5]}
                                  ticks={[0, 1, 2, 3, 4, 5]}
                                />
                                <ChartTooltip
                                  content={
                                    <ChartTooltipContent
                                      labelFormatter={(value) =>
                                        `Binary Type: ${value}`
                                      }
                                    />
                                  }
                                />
                                <Bar
                                  dataKey="count"
                                  fill="var(--color-count)"
                                  radius={[3, 3, 0, 0]}
                                  name="Binaries"
                                />
                              </BarChart>
                            </ChartContainer>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg h-full">
                        <div className="w-full h-full flex flex-col">
                          <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px]">
                            Members
                          </div>
                          <div className="flex w-full items-center mt-3.5 flex-1">
                            <div className="w-full">
                              <div
                                className="flex justify-center items-center relative"
                                style={{ overflow: "visible" }}
                                ref={chartRef}
                              >
                                <PieChart
                                  width={350}
                                  height={220}
                                  style={{ overflow: "visible" }}
                                  onMouseLeave={onPieLeave}
                                >
                                  <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={membersData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                  >
                                    {membersData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={
                                          membersColors[
                                            index % membersColors.length
                                          ]
                                        }
                                      />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </div>

                              <div className="grid grid-cols-3 gap-x-4 gap-y-4 text-xs mt-2">
                                {membersData.map((item, index) => (
                                  <div
                                    key={item.name}
                                    className="relative flex items-center"
                                    onMouseEnter={() => onLegendHover(index)}
                                    onMouseLeave={() => onLegendHover(null)}
                                  >
                                    <div className="flex items-center gap-2 cursor-pointer">
                                      <div
                                        className="w-3 h-3 rounded-sm"
                                        style={{
                                          backgroundColor:
                                            membersColors[
                                              index % membersColors.length
                                            ],
                                        }}
                                      />
                                      <span className="text-black font-normal">
                                        {item.name}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COM Components and Win32 API Section */}
                    <div className="flex w-full items-center gap-[11px] text-sm flex-wrap mt-2.5 max-md:max-w-full">
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg h-full">
                        <div className="w-full h-full flex flex-col">
                          <div className="text-[rgba(1,36,25,1)] font-semibold leading-none tracking-[-0.08px]">
                            COM components
                          </div>
                          <div className="w-full mt-3.5 flex-1">
                            <div className="flex w-full items-center gap-[40px_100px] text-xs text-[rgba(0,141,137,1)] font-normal whitespace-nowrap justify-between">
                              <div className="self-stretch my-auto">
                                Category
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Count
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Total Reference
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.comComponents.totalReference}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                unique members
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.comComponents.uniqueMembers}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Types
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.comComponents.types}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                components
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.comComponents.components}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg h-full">
                        <div className="w-full h-full flex flex-col">
                          <div className="text-[rgba(1,36,25,1)] font-semibold leading-none tracking-[-0.08px]">
                            Win32 API
                          </div>
                          <div className="w-full mt-3.5 flex-1">
                            <div className="flex w-full items-center gap-[40px_100px] text-xs text-[rgba(0,141,137,1)] font-normal whitespace-nowrap justify-between">
                              <div className="self-stretch my-auto">
                                Category
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Count
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                API Calls To Unique Entry Points
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {
                                  analysisData.win32API
                                    .apiCallsToUniqueEntryPoints
                                }
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Unique Entry Points
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.win32API.uniqueEntryPoints}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Libraries
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.win32API.libraries}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                API Calls to User Procedures
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.win32API.apiCallsToUserProcedures}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UI Overview and Issues Section */}
                    <div className="flex w-full items-center gap-2.5 flex-wrap mt-2.5 max-md:max-w-full">
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch text-sm justify-center flex-1 shrink basis-[0%] my-auto px-3.5 py-[18px] rounded-lg h-full">
                        <div className="w-full h-full flex flex-col">
                          <div className="text-[rgba(1,36,25,1)] font-semibold leading-none tracking-[-0.08px]">
                            UI Overview
                          </div>
                          <div className="w-full mt-[21px] flex-1">
                            <div className="flex w-full items-center gap-[40px_100px] justify-between">
                              <div className="text-black font-normal self-stretch my-auto">
                                UI Containers
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.uiOverview.uiContainers}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-3.5">
                              <div className="text-black font-normal self-stretch my-auto">
                                Control Instances
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.uiOverview.controlInstances}
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-3.5">
                              <div className="text-black font-normal self-stretch my-auto">
                                Unique Control Types
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                {analysisData.uiOverview.uniqueControlTypes}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 min-h-[156px] flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto px-3.5 py-[15px] rounded-lg h-full">
                        <div className="w-full h-full flex flex-col">
                          <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px]">
                            Issues
                          </div>
                          <div className="w-full mt-2.5 flex-1">
                            <IssuesProgressBar
                              issueTypes={
                                analysisData.issues.potentialIssueTypes
                              }
                              occurrences={analysisData.issues.occurrences}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Dependency Risks Section */}
              {/* <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center mt-5 px-4 py-5 rounded-[18px] max-md:max-w-full">
                <div className="flex w-full flex-col items-stretch max-md:max-w-full">
                  <div className="self-center max-w-full w-[775px] text-lg text-black font-semibold tracking-[-0.2px] leading-none">
                    <div className="max-md:max-w-full">
                      Security & Dependency Risks
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/b1f7925b159abd244682890a13c64c46faa2f472?placeholderIfAbsent=true"
                      className="aspect-[2.87] object-contain w-full mt-5 rounded-xl max-md:max-w-full"
                      alt="Security risks chart"
                    />
                  </div>
                  <div className="flex w-full items-stretch gap-2.5 flex-wrap mt-11 max-md:max-w-full max-md:mt-10">
                    <div className="min-w-60 flex-1 shrink basis-[0%]">
                      <SecurityRiskItem
                        color="bg-[rgba(237,30,30,1)]"
                        label="Open Security Vulnerabilities"
                        count={`(${analysisData.securityRisks.openVulnerabilities.count})`}
                      />
                      <SecurityRiskItem
                        color="bg-[rgba(30,51,237,1)]"
                        label="API Security Issues"
                        count={`(${analysisData.securityRisks.apiSecurityIssues.count})`}
                        className="mt-2"
                      />
                      <SecurityRiskItem
                        color="bg-[rgba(30,237,230,1)]"
                        label="Regulatory Risks"
                        count={`(${analysisData.securityRisks.regulatoryRisks.count})`}
                        className="mt-2"
                      />
                      <SecurityRiskItem
                        color="bg-[rgba(174,187,28,1)]"
                        label="Single Points of Failure (SPOF)"
                        count={`(${analysisData.securityRisks.singlePointsOfFailure.count})`}
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-[rgba(230,234,240,1)] flex w-px shrink-0 h-40 my-auto" />
                    <div className="min-w-60 flex-1 shrink basis-[0%]">
                      <SecurityRiskItem
                        color="bg-[rgba(237,30,30,1)]"
                        label="Security Vulnerabilities"
                        count={`(${analysisData.securityRisks.openVulnerabilities.count})`}
                        icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8b84c7d5ac1e0e4b176cd1ed6a21e4113aecb6c8?placeholderIfAbsent=true"
                        details={
                          analysisData.securityRisks.openVulnerabilities.details
                        }
                        isExpanded={true}
                      />
                      <div className="bg-white flex w-full gap-1 mt-2 pr-[7px] py-2 rounded-md">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/a076a2761f2b242260a39775e5d2ea1b3b95d3d9?placeholderIfAbsent=true"
                          className="aspect-[1] object-contain w-5 shrink-0"
                          alt="Components icon"
                        />
                        <div className="flex min-w-60 items-center gap-2 text-sm font-medium tracking-[-0.08px] leading-none w-[313px]">
                          <div className="bg-[rgba(30,51,237,1)] self-stretch flex w-3.5 shrink-0 h-3.5 my-auto rounded-[3px]" />
                          <div className="self-stretch flex min-w-60 items-center gap-2 w-[287px] my-auto">
                            <div className="text-[#0A0D14] self-stretch my-auto">
                              Riskiest Components{" "}
                            </div>
                            <div className="text-[rgba(10,13,20,1)] text-right self-stretch w-[141px] my-auto">
                              (
                              {
                                analysisData.securityRisks.riskiestComponents
                                  .count
                              }
                              )
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-stretch justify-center w-8 p-0.5">
                          <div className="border-t-[color:var(--neutral-300,#CDD0D5)] shadow-[0px_4px_4px_0px_rgba(15,15,16,0.06)_inset] bg-[#E2E4E9] flex flex-col justify-center p-0.5 rounded-[96px] border-t border-solid">
                            <div className="border-r-[color:var(--stroke-white-0,#FFF)] border-b-[color:var(--stroke-white-0,#FFF)] border-l-[color:var(--stroke-white-0,#FFF)] shadow-[0px_-3px_3px_0px_rgba(228,229,231,0.48)_inset,0px_6px_10px_0px_rgba(27,28,29,0.06),0px_2px_4px_0px_rgba(27,28,29,0.02)] bg-white flex w-3 shrink-0 h-3 rounded-[56px] border-r border-solid border-b border-l" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
