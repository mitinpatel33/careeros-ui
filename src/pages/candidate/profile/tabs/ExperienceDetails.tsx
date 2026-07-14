import { Work } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import type { DialogField } from "./ProfileItemDialog";

export type ProfileExperience = {
  id?: string;
  companyName: string;
  designation: string;
  employmentType: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrentCompany: boolean;
  description?: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileExperience[];
  loading?: boolean;
  onChange: (items: ProfileExperience[]) => void;
  onSaveStep: () => void;
};

const ExperienceDetails = ({ items, loading, onChange, onSaveStep }: Props) => {
  const fields: DialogField<ProfileExperience>[] = [
    { name: "companyName", label: "Company Name" },
    { name: "designation", label: "Designation" },
    { name: "employmentType", label: "Employment Type" },
    { name: "location", label: "Location" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "isCurrentCompany", label: "Current Company", type: "checkbox" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
  ];

  return (
    <ProfileCrudStep<ProfileExperience>
      title="Experience"
      subtitle="Work experience and roles"
      icon={<Work />}
      items={items}
      // @ts-ignore: ProfileCrudStep props currently do not expose emptyItem in typings.
      emptyItem={{
        companyName: "",
        designation: "",
        employmentType: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrentCompany: false,
        description: "",
      }}
      fields={fields}
      loading={loading}
      getTitle={(item) => item.designation}
      getSubtitle={(item) => {
        return `${item.companyName} • ${item.startDate} - ${item.endDate || "Present"}`;
      }}
      onChange={onChange}
      onSaveStep={onSaveStep}
    />
  );
};

export default ExperienceDetails;