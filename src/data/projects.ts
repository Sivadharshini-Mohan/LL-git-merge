import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "IRCTC",
    description:
      "IRCTC (Indian Railway Catering and Tourism Corporation) is the official...",
    progress: {
      label: "Code Analysing",
      percentage: 65,
      lines: "1.2M Lines",
      time: "00:12",
    },
  },
  {
    id: 2,
    title: "Chennai Metro App",
    description:
      "Chennai metro mobile application need to be modernised to latest tech...",
    stages: [
      { name: "Assessment", status: "completed" },
      { name: "Comprehend", status: "in-progress" },
      { name: "Recommend", status: "pending" },
      { name: "Modernize", status: "pending" },
      { name: "Test", status: "pending" },
    ],
    lastUpdated: "12 Jan 2025",
  },
]; 