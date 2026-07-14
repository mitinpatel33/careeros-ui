import { modernATSConfig } from "../config/modernATS";
import ATSLayout from "./ATSLayout";

const ModernATS = ({ data }: any) => {
  return <ATSLayout data={data} config={modernATSConfig as any} />;
};

export default ModernATS;
