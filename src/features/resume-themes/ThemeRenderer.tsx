import type { ResumeFormType } from "../../validation/resume.validation";
import { themeConfigs } from "./config/themeConfigs";
import ATSLayout from "./templates/ATSLayout";
import CorporateLayout from "./templates/CorporateLayout";
import CreativeLayout from "./templates/CreativeLayout";
import PremiumLayout from "./templates/PremiumLayout";
import TechnicalLayout from "./templates/TechnicalLayout";

type Props = {
  themeId: string;
  data: ResumeFormType;
};

const ThemeRenderer = ({ themeId, data }: Props) => {
  const config =
    themeConfigs[themeId] || themeConfigs["modern-ats"];

  if (config.layout === "ats") {
    return <ATSLayout data={data} config={config} />;
  }

  if (config.layout === "corporate") {
    return <CorporateLayout data={data} config={config} />;
  }

  if (config.layout === "creative") {
    return <CreativeLayout data={data} config={config} />;
  }

  if (config.layout === "technical") {
    return <TechnicalLayout data={data} config={config} />;
  }

  if (config.layout === "premium") {
    return <PremiumLayout data={data} config={config} />;
  }

  return <ATSLayout data={data} config={config} />;
};

export default ThemeRenderer;