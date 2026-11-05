import type { ComponentType } from "react";
import type { ResumeData } from "./resume";

// ── Existing templates (kept so already-saved resumes still render) ─────
import ClassicBlueTemplate from "./ClassicBlueTemplate";
import SidebarNetworkTemplate from "./SidebarNetworkTemplate";
import DarkHeaderTemplate from "./DarkHeaderTemplate";
import CoralHeaderTemplate from "./CoralHeaderTemplate";
import PinkSidebarTemplate from "./PinkSidebarTemplate";
import BlueSidebarTemplate from "./BlueSidebarTemplate";
import PhotoTopClassicTemplate from "./PhotoTopClassicTemplate";
import TealDottedTemplate from "./TealDottedTemplate";
import TealBannerTemplate from "./TealBannerTemplate";
import CrimsonHeaderTemplate from "./CrimsonHeaderTemplate";
import MidnightSidebarTemplate from "./MidnightSidebarTemplate";
import VioletCardsTemplate from "./VioletCardsTemplate";
import EmeraldTimelineTemplate from "./EmeraldTimelineTemplate";
import RoseBannerTemplate from "./RoseBannerTemplate";
import OceanSplitTemplate from "./OceanSplitTemplate";
import SunsetBoxesTemplate from "./SunsetBoxesTemplate";
import TealPillsTemplate from "./TealPillsTemplate";
import NavyClassicTemplate from "./NavyClassicTemplate";
import GoldBlockTemplate from "./GoldBlockTemplate";
import MaroonLabelsTemplate from "./MaroonLabelsTemplate";
import CocoaMinimalTemplate from "./CocoaMinimalTemplate";
import IndigoRibbonTemplate from "../IndigoTemplates/IndigoRibbonTemplate";
import CyanTabsTemplate from "../IndigoTemplates/CyanTabsTemplate";
import SlateSplitTemplate from "../IndigoTemplates/SlateSplitTemplate";
import OliveJournalTemplate from "../IndigoTemplates/OliveJournalTemplate";
import CoralWaveTemplate from "../IndigoTemplates/CoralWaveTemplate";
import MagentaDuoTemplate from "../IndigoTemplates/MagentaDuoTemplate";
import SkyTripleTemplate from "../IndigoTemplates/SkyTripleTemplate";
import CharcoalTerminalTemplate from "../IndigoTemplates/CharcoalTerminalTemplate";
import AmberStatsTemplate from "../IndigoTemplates/AmberStatsTemplate";
import MintLedgerTemplate from "../IndigoTemplates/MintLedgerTemplate";
import PlumOverlapTemplate from "../IndigoTemplates/PlumOverlapTemplate";
import SteelCompactTemplate from "../IndigoTemplates/SteelCompactTemplate";
import RubyMonogramTemplate from "../IndigoTemplates/RubyMonogramTemplate";
import AzureStepperTemplate from "../IndigoTemplates/AzureStepperTemplate";
import ForestFrameTemplate from "../IndigoTemplates/ForestFrameTemplate";

export type TemplateCategory =
  | "classic"
  | "photo"
  | "modern"
  | "creative"
  | "minimal";

export type TemplateTheme =
  | "Red"
  | "Black"
  | "Purple"
  | "Green"
  | "Pink"
  | "Blue"
  | "Orange"
  | "Teal"
  | "Navy"
  | "Gold"
  | "Maroon"
  | "Brown";

export interface TemplateComponentProps {
  data: ResumeData;
}

export interface TemplateRegistryEntry {
  id: string;
  name: string;
  category: TemplateCategory;
  accent: string;
  tagline: string;
  /** colour theme -> filter chips in TemplateSelectionStep */
  theme?: TemplateTheme;
  /** hidden from the picker, but still resolvable by id (already-saved resumes) */
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
}

export const TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
  // ── Career OS themed templates ──
  {
    id: "crimson-header",
    name: "Crimson Header",
    category: "modern",
    accent: "#d92d3a",
    theme: "Red",
    tagline:
      "Bold red header band with network accents and a clean two-column body.",
    Component: CrimsonHeaderTemplate,
  },
  {
    id: "midnight-sidebar",
    name: "Midnight Sidebar",
    category: "modern",
    accent: "#1f2328",
    theme: "Black",
    tagline:
      "Dark sidebar with skill bars and contact details, white content area.",
    Component: MidnightSidebarTemplate,
  },
  {
    id: "violet-cards",
    name: "Violet Cards",
    category: "creative",
    accent: "#7c3aed",
    theme: "Purple",
    tagline: "Soft purple page with white rounded cards and pill headings.",
    Component: VioletCardsTemplate,
  },
  {
    id: "emerald-timeline",
    name: "Emerald Timeline",
    category: "modern",
    accent: "#0f9d6b",
    theme: "Green",
    tagline: "Green dotted timeline for experience and education.",
    Component: EmeraldTimelineTemplate,
  },
  {
    id: "rose-banner",
    name: "Rose Banner",
    category: "creative",
    accent: "#e0408c",
    theme: "Pink",
    tagline: "Curved pink banner with outlined boxes for every section.",
    Component: RoseBannerTemplate,
  },
  {
    id: "ocean-split",
    name: "Ocean Split",
    category: "modern",
    accent: "#2563eb",
    theme: "Blue",
    tagline: "Diagonal blue header with a tinted right-hand column.",
    Component: OceanSplitTemplate,
  },
  {
    id: "sunset-boxes",
    name: "Sunset Boxes",
    category: "creative",
    accent: "#f06a1a",
    theme: "Orange",
    tagline: "Orange label frames and an offset-shadow name box.",
    Component: SunsetBoxesTemplate,
  },
  {
    id: "teal-pills",
    name: "Teal Pills",
    category: "photo",
    accent: "#0d9488",
    theme: "Teal",
    tagline: "Soft teal side column, pill skills and dot headings.",
    Component: TealPillsTemplate,
  },
  {
    id: "navy-classic",
    name: "Navy Classic",
    category: "classic",
    accent: "#1e3a8a",
    theme: "Navy",
    tagline: "Traditional serif layout with a double-rule header.",
    Component: NavyClassicTemplate,
  },
  {
    id: "gold-block",
    name: "Gold Block",
    category: "photo",
    accent: "#c98a00",
    theme: "Gold",
    tagline: "Large photo block with numbered section headings.",
    Component: GoldBlockTemplate,
  },
  {
    id: "maroon-labels",
    name: "Maroon Labels",
    category: "classic",
    accent: "#9b1c31",
    theme: "Maroon",
    tagline: "Letter-spaced name and a label-column layout.",
    Component: MaroonLabelsTemplate,
  },
  {
    id: "cocoa-minimal",
    name: "Cocoa Minimal",
    category: "minimal",
    accent: "#7c4a2d",
    theme: "Brown",
    tagline: "Quiet brown bar, muted small-caps headings, lots of white space.",
    Component: CocoaMinimalTemplate,
  },

  // ── existing templates: hidden from the picker, still render for saved resumes ──
  {
    id: "classic-blue",
    name: "MultiColor",
    category: "classic",
    accent: "#1e40af",
    hidden: true,
    tagline: "A clean single-column layout with a confident blue accent.",
    Component: ClassicBlueTemplate,
  },
  {
    id: "sidebar-network",
    name: "StandOut",
    category: "modern",
    accent: "#1e3a6e",
    hidden: true,
    tagline: "A bold navy sidebar with a subtle network pattern.",
    Component: SidebarNetworkTemplate,
  },
  {
    id: "photo-top-classic",
    name: "Visionary",
    category: "photo",
    accent: "#1e40af",
    hidden: true,
    tagline: "The classic layout with a circular profile photo up top.",
    Component: PhotoTopClassicTemplate,
  },
  {
    id: "teal-banner",
    name: "Soothing",
    category: "modern",
    accent: "#0f766e",
    hidden: true,
    tagline: "A calming teal summary banner over a two-column body.",
    Component: TealBannerTemplate,
  },
  {
    id: "pink-sidebar",
    name: "Artistic",
    category: "photo",
    accent: "#7a2e2e",
    hidden: true,
    tagline: "A soft blush sidebar that keeps things personable.",
    Component: PinkSidebarTemplate,
  },
  {
    id: "dark-header",
    name: "Executive",
    category: "classic",
    accent: "#374151",
    hidden: true,
    tagline: "A commanding dark header for senior leadership roles.",
    Component: DarkHeaderTemplate,
  },
  {
    id: "teal-dotted",
    name: "Trailblazer",
    category: "modern",
    accent: "#0d9488",
    hidden: true,
    tagline: "Playful dotted accents with a clean experience timeline.",
    Component: TealDottedTemplate,
  },
  {
    id: "blue-sidebar",
    name: "Magnetic",
    category: "photo",
    accent: "#3457c7",
    hidden: true,
    tagline: "A rounded blue sidebar card that pulls the eye in.",
    Component: BlueSidebarTemplate,
  },
  {
    id: "coral-header",
    name: "Ignite",
    category: "modern",
    accent: "#e2604f",
    hidden: true,
    tagline: "A high-contrast coral header for standout personal branding.",
    Component: CoralHeaderTemplate,
  },

  // ── Indigo templates ──
  {
    id: "indigo-ribbon",
    name: "Indigo Ribbon",
    category: "modern",
    accent: "#4f46e5",
    theme: "Purple",
    tagline:
      "Gradient ribbon edge, tinted contact strip and a dashed side column.",
    Component: IndigoRibbonTemplate,
  },
  {
    id: "cyan-tabs",
    name: "Cyan Tabs",
    category: "modern",
    accent: "#0891b2",
    theme: "Teal",
    tagline:
      "Flag-shaped section tabs with a tri-colour stripe and 3-up footer.",
    Component: CyanTabsTemplate,
  },
  {
    id: "slate-split",
    name: "Slate Split",
    category: "classic",
    accent: "#334155",
    theme: "Black",
    tagline: "Two-tone split header, quote summary and numbered sections.",
    Component: SlateSplitTemplate,
  },
  {
    id: "coral-wave",
    name: "Coral Wave",
    category: "photo",
    accent: "#f2634f",
    theme: "Orange",
    tagline: "Wavy coral header with the avatar resting on the wave.",
    Component: CoralWaveTemplate,
  },
  {
    id: "olive-journal",
    name: "Olive Journal",
    category: "classic",
    accent: "#4d6b2f",
    theme: "Green",
    tagline: "Editorial serif layout with a dates gutter beside each entry.",
    Component: OliveJournalTemplate,
  },
  {
    id: "magenta-duo",
    name: "Magenta Duo",
    category: "creative",
    accent: "#d61f7c",
    theme: "Pink",
    tagline: "Right-hand gradient sidebar with skill bars and contacts.",
    Component: MagentaDuoTemplate,
  },
  {
    id: "sky-triple",
    name: "Sky Triple",
    category: "modern",
    accent: "#0284c7",
    theme: "Blue",
    tagline: "Airy sky header, full-width timeline and a three-column footer.",
    Component: SkyTripleTemplate,
  },
  {
    id: "charcoal-terminal",
    name: "Charcoal Terminal",
    category: "creative",
    accent: "#111827",
    theme: "Black",
    tagline: "Developer style with a terminal bar and code-comment headings.",
    Component: CharcoalTerminalTemplate,
  },
  {
    id: "amber-stats",
    name: "Amber Stats",
    category: "modern",
    accent: "#d97706",
    theme: "Gold",
    tagline: "Auto-counted highlight strip with an offset-shadow avatar.",
    Component: AmberStatsTemplate,
  },
  {
    id: "mint-ledger",
    name: "Mint Ledger",
    category: "creative",
    accent: "#059669",
    theme: "Green",
    tagline: "Soft mint page with every entry in an accent-edged card.",
    Component: MintLedgerTemplate,
  },
  {
    id: "plum-overlap",
    name: "Plum Overlap",
    category: "creative",
    accent: "#86198f",
    theme: "Purple",
    tagline: "Slanted gradient header with a floating summary card.",
    Component: PlumOverlapTemplate,
  },
  {
    id: "steel-compact",
    name: "Steel Compact",
    category: "minimal",
    accent: "#475569",
    theme: "Navy",
    tagline: "Dense, ATS-friendly one-pager with no icons.",
    Component: SteelCompactTemplate,
  },
  {
    id: "ruby-monogram",
    name: "Ruby Monogram",
    category: "classic",
    accent: "#be123c",
    theme: "Red",
    tagline: "Giant watermark initials, centred masthead and flanked headings.",
    Component: RubyMonogramTemplate,
  },
  {
    id: "azure-stepper",
    name: "Azure Stepper",
    category: "modern",
    accent: "#0369a1",
    theme: "Blue",
    tagline: "Sections hang off a vertical rail of icon circles.",
    Component: AzureStepperTemplate,
  },
  {
    id: "forest-frame",
    name: "Forest Frame",
    category: "minimal",
    accent: "#166534",
    theme: "Green",
    tagline: "Certificate-style double border with an arrow-bullet skill grid.",
    Component: ForestFrameTemplate,
  },
];

export const getTemplateById = (
  id: string,
): TemplateRegistryEntry | undefined =>
  TEMPLATE_REGISTRY.find((t) => t.id === id);

/** Templates shown in the picker. */
export const VISIBLE_TEMPLATES = TEMPLATE_REGISTRY.filter((t) => !t.hidden);

/** Theme chips in display order, with the colour dot. */
export const TEMPLATE_THEMES: { theme: TemplateTheme; accent: string }[] = Array.from(
  VISIBLE_TEMPLATES.reduce((map, t) => {
    if (t.theme && !map.has(t.theme)) map.set(t.theme, t.accent);
    return map;
  }, new Map<TemplateTheme, string>()),
).map(([theme, accent]) => ({ theme, accent }));

export const DEFAULT_TEMPLATE_ID = VISIBLE_TEMPLATES[0].id;
