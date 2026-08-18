import type { ComponentType } from "react";
import type { ResumeData } from "./resume";

import ClassicBlueTemplate from "./ClassicBlueTemplate";
import SidebarNetworkTemplate from "./SidebarNetworkTemplate";
import PhotoTopClassicTemplate from "./PhotoTopClassicTemplate";
import TealBannerTemplate from "./TealBannerTemplate";
import PinkSidebarTemplate from "./PinkSidebarTemplate";
import DarkHeaderTemplate from "./DarkHeaderTemplate";
import TealDottedTemplate from "./TealDottedTemplate";
import BlueSidebarTemplate from "./BlueSidebarTemplate";
import CoralHeaderTemplate from "./CoralHeaderTemplate";

export type TemplateCategory = "classic" | "photo" | "modern";

export interface TemplateComponentProps {
  data: ResumeData;
}

export interface TemplateRegistryEntry {
  id: string;
  name: string;
  category: TemplateCategory;
  accent: string;
  tagline: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
}

export const TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
  {
    id: "classic-blue",
    name: "MultiColor",
    category: "classic",
    accent: "#1e40af",
    tagline: "A clean single-column layout with a confident blue accent.",
    Component: ClassicBlueTemplate,
  },
  {
    id: "sidebar-network",
    name: "StandOut",
    category: "modern",
    accent: "#1e3a6e",
    tagline: "A bold navy sidebar with a subtle network pattern.",
    Component: SidebarNetworkTemplate,
  },
  {
    id: "photo-top-classic",
    name: "Visionary",
    category: "photo",
    accent: "#1e40af",
    tagline: "The classic layout with a circular profile photo up top.",
    Component: PhotoTopClassicTemplate,
  },
  {
    id: "teal-banner",
    name: "Soothing",
    category: "modern",
    accent: "#0f766e",
    tagline: "A calming teal summary banner over a two-column body.",
    Component: TealBannerTemplate,
  },
  {
    id: "pink-sidebar",
    name: "Artistic",
    category: "photo",
    accent: "#7a2e2e",
    tagline: "A soft blush sidebar that keeps things personable.",
    Component: PinkSidebarTemplate,
  },
  {
    id: "dark-header",
    name: "Executive",
    category: "classic",
    accent: "#374151",
    tagline: "A commanding dark header for senior leadership roles.",
    Component: DarkHeaderTemplate,
  },
  {
    id: "teal-dotted",
    name: "Trailblazer",
    category: "modern",
    accent: "#0d9488",
    tagline: "Playful dotted accents with a clean experience timeline.",
    Component: TealDottedTemplate,
  },
  {
    id: "blue-sidebar",
    name: "Magnetic",
    category: "photo",
    accent: "#3457c7",
    tagline: "A rounded blue sidebar card that pulls the eye in.",
    Component: BlueSidebarTemplate,
  },
  {
    id: "coral-header",
    name: "Ignite",
    category: "modern",
    accent: "#e2604f",
    tagline: "A high-contrast coral header for standout personal branding.",
    Component: CoralHeaderTemplate,
  },
];

export const getTemplateById = (id: string): TemplateRegistryEntry | undefined =>
  TEMPLATE_REGISTRY.find((t) => t.id === id);
