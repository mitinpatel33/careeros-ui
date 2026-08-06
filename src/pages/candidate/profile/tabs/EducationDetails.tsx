import { School } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import { useGetDegreesQuery } from "../../../../services/candidateLookupApi";

export type ProfileEducation = {
  id?: string;
  instituteName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  percentage?: number;
  grade?: string;
  description?: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileEducation[];
  loading?: boolean;
  onSave: (items: ProfileEducation[]) => Promise<void>;
};

const EducationDetails = ({ items, loading, onSave }: Props) => {
  const { data: degreeOptions = [] } = useGetDegreesQuery();

  const fields: any[] = [
    { name: "instituteName", label: "Institute Name" },
    {
      name: "degree",
      label: "Degree",
      type: "select",
      options: degreeOptions,
    },
    { name: "fieldOfStudy", label: "Field Of Study" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "percentage", label: "Percentage", type: "number" },
    { name: "grade", label: "Grade" },
    { name: "description", label: "Description", type: "textarea", rows: 4 },
  ];

  return (
    <ProfileCrudStep<ProfileEducation>
      title="Education"
      subtitle="Academic qualification details"
      icon={<School />}
      items={items}
      loading={loading}
      defaultItem={{
        instituteName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        percentage: 0,
        grade: "",
        description: "",
      }}
      fields={fields}
      getTitle={(x) => x.degree}
      getSubtitle={(x) => `${x.instituteName} • ${x.fieldOfStudy}`}
      onSave={onSave}
    />
  );
};

export default EducationDetails;