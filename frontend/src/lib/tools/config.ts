import { FileText, Calculator, GraduationCap, PieChart, FileSignature, ClipboardList } from "lucide-react";

import { LucideIcon } from "lucide-react";

export type ToolCategory = "Finance" | "Productivity" | "Education";

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon; // Lucide icon
  category: ToolCategory;
  color: string;
}

export const toolsConfig: ToolConfig[] = [
  {
    id: "invoice-generator",
    name: "Freelancer Invoice Generator",
    description: "Create professional invoices instantly in your browser. No login required, and your data never leaves your device.",
    href: "/tools/freelancer-invoice-generator",
    icon: FileText,
    category: "Finance",
    color: "bg-[#0ea5e9]", // sky-500
  },
  {
    id: "rate-calculator",
    name: "Freelancer Rate Calculator",
    description: "Calculate the ideal hourly rate based on your expenses, savings goals, taxes, and platform fees.",
    href: "/tools/freelancer-rate-calculator",
    icon: Calculator,
    category: "Finance",
    color: "bg-[#ec4899]", // pink-500
  },
  {
    id: "project-profit-calculator",
    name: "Project Profit Calculator",
    description: "Calculate your actual take-home pay and effective hourly rate after fees, expenses, and taxes.",
    href: "/tools/project-profit-calculator",
    icon: PieChart,
    category: "Finance",
    color: "bg-[#8b5cf6]", // violet-500
  },
  {
    id: "project-brief-builder",
    name: "Freelance Project Brief Builder",
    description: "Turn your project idea into a clear brief that both clients and freelancers can understand.",
    href: "/tools/project-brief-builder",
    icon: ClipboardList,
    category: "Productivity",
    color: "bg-[#3b82f6]", // blue-500
  },
  {
    id: "freelance-contract-generator",
    name: "Freelance Contract Generator",
    description: "Create a professional freelance contract with your project, payment, revision, and client terms.",
    href: "/tools/freelance-contract-generator",
    icon: FileSignature,
    category: "Productivity",
    color: "bg-[#f59e0b]", // amber-500
  },
  {
    id: "cgpa-planner",
    name: "CGPA Planner",
    description: "Calculate CGPA semester-wise, track backlogs, and plan for your target seamlessly.",
    href: "/tools/cgpa-planner",
    icon: GraduationCap,
    category: "Education",
    color: "bg-[#10b981]", // emerald-500
  },
];
