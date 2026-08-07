import { Work } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

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
  onSave: (items: ProfileExperience[]) => Promise<void>;
};

const ExperienceDetails = ({ items, loading, onSave }: Props) => {
  const employmentTypeOptions: any[] = [
    {
      label: "Full-time",
      value: "Full-time"
    },
    {
      label: "Part-time",
      value: "Part-time"
    },
    {
      label: "Contract",
      value: "Contract"
    },
    {
      label: "Freelance",
      value: "Freelance"
    },
    {
      label: "Remote",
      value: "Remote"
    }
  ];

  const fields: any[] = [
    { name: "companyName", label: "Company Name" },
    { name: "designation", label: "Designation" },
    {
      name: "employmentType",
      label: "Employment Type",
      type: "select",
      options: employmentTypeOptions,
    },
    { name: "location", label: "Location" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "isCurrentCompany", label: "Current Company", type: "checkbox" },
    { name: "description", label: "Description", type: "textarea", rows: 4 },
  ];

  return (
    <ProfileCrudStep<ProfileExperience>
      title="Experience"
      subtitle="Work experience and roles"
      icon={<Work />}
      items={items}
      loading={loading}
      defaultItem={{
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
      getTitle={(item) => item.designation}
      getSubtitle={(item) => {
        return `${item.companyName} • ${item.startDate} - ${item.endDate || "Present"}`;
      }}
      onSave={onSave}
    />
  );
};

export default ExperienceDetails;