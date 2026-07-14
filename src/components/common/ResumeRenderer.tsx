import { getResumeTemplateById } from "../../data/resumeTemplates";
import type {
  ResumeData,
  ResumeDesignSettings,
  ResumeTemplateId,
  ResumeThemeColor,
} from "../../types/candidate/resume.types";
import OneColumnTemplate from "../templates/layouts/OneColumnTemplate";
import SidebarTemplate from "../templates/layouts/SidebarTemplate";
import TwoColumnTemplate from "../templates/layouts/TwoColumnTemplate";

type Props = {
  template: ResumeTemplateId;
  data: ResumeData;
  themeColor?: ResumeThemeColor;
  settings?: ResumeDesignSettings;
};

const ResumeRenderer = ({ template, data, settings }: Props) => {
  const baseConfig = getResumeTemplateById(template);

  const config: any = {
    ...baseConfig,
    primaryColor: settings?.themeColor ?? baseConfig.primaryColor,
    fontFamily: settings?.fontFamily ?? baseConfig.fontFamily,
    sectionTitleStyle:
      settings?.sectionTitleStyle ?? baseConfig.sectionTitleStyle,
  };

  if (config.layout === "sidebar") {
    return <SidebarTemplate data={data} config={config} settings={settings} />;
  }

  if (config.layout === "twoColumn") {
    return (
      <TwoColumnTemplate data={data} config={config} settings={settings} />
    );
  }

  return <OneColumnTemplate data={data} config={config} settings={settings} />;
};

export default ResumeRenderer;
