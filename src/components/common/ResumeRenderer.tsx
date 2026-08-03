// src/components/ResumeRenderer.tsx
import { getResumeTemplateById } from "../../data/resumeTemplates";
import type {
  ResumeData,
  ResumeDesignSettings,
  ResumeTemplateId,
  ResumeThemeColor,
} from "../../types/candidate/resume.types";
import type { TemplateRenderProps } from "../../types/resumeTemplate.types";

// Legacy layouts (keep if needed)
import OneColumnTemplate from "../templates/layouts/OneColumnTemplate";
import SidebarTemplate from "../templates/layouts/SidebarTemplate";
import TwoColumnTemplate from "../templates/layouts/TwoColumnTemplate";

// 20 new theme components
import ClassicElegantTemplate from "../templates/layouts/ClassicElegantTemplate";
import ModernMinimalTemplate from "../templates/layouts/ModernMinimalTemplate";
import SidebarPhotoTemplate from "../templates/layouts/SidebarPhotoTemplate";
import SkillBarsTemplate from "../templates/layouts/SkillBarsTemplate";
import TimelineTemplate from "../templates/layouts/TimelineTemplate";
import CreativeSplashTemplate from "../templates/layouts/CreativeSplashTemplate";
import DarkModeTemplate from "../templates/layouts/DarkModeTemplate";
import InfographicTemplate from "../templates/layouts/InfographicTemplate";
import AcademicTemplate from "../templates/layouts/AcademicTemplate";
import ArtisticTemplate from "../templates/layouts/ArtisticTemplate";
import FuturisticGradientTemplate from "../templates/layouts/FuturisticGradientTemplate";
import VintageTemplate from "../templates/layouts/VintageTemplate";
import MinimalDotsTemplate from "../templates/layouts/MinimalDotsTemplate";
import CorporateTemplate from "../templates/layouts/CorporateTemplate";
import VibrantGradientTemplate from "../templates/layouts/VibrantGradientTemplate";
import MonochromeTemplate from "../templates/layouts/MonochromeTemplate";
import AsymmetricTemplate from "../templates/layouts/AsymmetricTemplate";
import CleanIconsTemplate from "../templates/layouts/CleanIconsTemplate";
import FinancialProfileTemplate from "../templates/layouts/FinancialProfileTemplate";
import ElegantClassicTemplate from "../templates/layouts/ElegantClassicTemplate";
import MaroonMinimalTemplate from "../templates/layouts/MaroonMinimalTemplate";
import NavySidebarReferenceTemplate from "../templates/layouts/NavySidebarReferenceTemplate";
import DarkPatternSidebarTemplate from "../templates/layouts/DarkPatternSidebarTemplate";
import CompactBlueTemplate from "../templates/layouts/CompactBlueTemplate";
import CreamCoralTemplate from "../templates/layouts/CreamCoralTemplate";
import GreenExecutiveTemplate from "../templates/layouts/GreenExecutiveTemplate";
import OliveAttorneyTemplate from "../templates/layouts/OliveAttorneyTemplate";
import MauveSidebarTemplate from "../templates/layouts/MauveSidebarTemplate";
import BlackBlueBannerTemplate from "../templates/layouts/BlackBlueBannerTemplate";
import NavyTimelineTemplate from "../templates/layouts/NavyTimelineTemplate";
import GreenDiamondTemplate from "../templates/layouts/GreenDiamondTemplate";
import YellowNavyTimelineTemplate from "../templates/layouts/YellowNavyTimelineTemplate";
import TealGoldRibbonTemplate from "../templates/layouts/TealGoldRibbonTemplate";

type Props = {
  template: ResumeTemplateId; // <-- selected ID from drawer
  data: ResumeData;
  themeColor?: ResumeThemeColor;
  settings?: ResumeDesignSettings;
};

// Map template IDs to their component
const templateComponentMap: Record<string, React.FC<TemplateRenderProps>> = {
  maroonMinimalTemplate: MaroonMinimalTemplate,
  navySidebarReferenceTemplate: NavySidebarReferenceTemplate,
  darkPatternSidebarTemplate: DarkPatternSidebarTemplate,
  compactBlueTemplate: CompactBlueTemplate,
  creamCoralTemplate: CreamCoralTemplate,
  greenExecutiveTemplate: GreenExecutiveTemplate,
  oliveAttorneyTemplate: OliveAttorneyTemplate,
  mauveSidebarTemplate: MauveSidebarTemplate,
  blackBlueBannerTemplate: BlackBlueBannerTemplate,
  navyTimelineTemplate: NavyTimelineTemplate,
  greenDiamondTemplate: GreenDiamondTemplate,
  yellowNavyTimelineTemplate: YellowNavyTimelineTemplate,
  tealGoldRibbonTemplate: TealGoldRibbonTemplate,
  elegantClassicTemplate: ElegantClassicTemplate,
  financialProfileTemplate: FinancialProfileTemplate,
  classicElegant: ClassicElegantTemplate,
  modernMinimal: ModernMinimalTemplate,
  sidebarPhoto: SidebarPhotoTemplate,
  skillBars: SkillBarsTemplate,
  timeline: TimelineTemplate,
  creativeSplash: CreativeSplashTemplate,
  darkMode: DarkModeTemplate,
  infographic: InfographicTemplate,
  academic: AcademicTemplate,
  artistic: ArtisticTemplate,
  futuristicGradient: FuturisticGradientTemplate,
  vintage: VintageTemplate,
  minimalDots: MinimalDotsTemplate,
  corporate: CorporateTemplate,
  vibrantGradient: VibrantGradientTemplate,
  monochrome: MonochromeTemplate,
  asymmetric: AsymmetricTemplate,
  cleanIcons: CleanIconsTemplate,
};

const ResumeRenderer = ({ template, data, settings }: Props) => {
  // Get the full config for this template ID
  const baseConfig = getResumeTemplateById(template);

  // Merge with user settings
  const config: any = {
    ...baseConfig,
    primaryColor: settings?.themeColor ?? baseConfig.primaryColor,
    fontFamily: settings?.fontFamily ?? baseConfig.fontFamily,
    sectionTitleStyle: settings?.sectionTitleStyle ?? baseConfig.sectionTitleStyle,
  };

  // --- Legacy layout support (optional) ---
  // If you still use the old layout‑based templates, keep these checks.
  if (config.layout === "sidebar") {
    return <SidebarTemplate data={data} config={config} settings={settings} />;
  }
  if (config.layout === "twoColumn") {
    return <TwoColumnTemplate data={data} config={config} settings={settings} />;
  }
  if (config.layout === "oneColumn") {
    return <OneColumnTemplate data={data} config={config} settings={settings} />;
  }

  // --- New themes: use the template ID to look up the component ---
  const TemplateComponent = templateComponentMap[template];
  if (TemplateComponent) {
    return <TemplateComponent data={data} config={config} settings={settings} />;
  }

  // Ultimate fallback (should never happen if all IDs are mapped)
  return <OneColumnTemplate data={data} config={config} settings={settings} />;
};

export default ResumeRenderer;