import { FolderSpecial } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileProject = {
  id?: string;
  projectName: string;
  companyName: string;
  city: string;
  role?: string;
  description?: string;
  technologies?: string;
  projectUrl?: string;
  gitHubUrl?: string;
  startDate?: string;
  endDate?: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileProject[];
  loading?: boolean;
  onSave: (items: ProfileProject[]) => Promise<void>;
};

const ProjectsDetails = ({ items, loading, onSave }: Props) => {
  const fields: any[] = [
    { name: "projectName", label: "Project Name" },
    { name: "companyName", label: "Company Name" },
    { name: "city", label: "City" },
    { name: "role", label: "Role" },
    { name: "technologies", label: "Technologies" },
    { name: "projectUrl", label: "Project URL" },
    { name: "gitHubUrl", label: "GitHub URL" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "description", label: "Description", type: "textarea", rows: 4 },
  ];

  return (
    <ProfileCrudStep<ProfileProject>
      title="Projects"
      subtitle="Portfolio and client projects"
      icon={<FolderSpecial />}
      items={items}
      loading={loading}
      defaultItem={{
        projectName: "",
        companyName: "",
        city: "",
        role: "",
        description: "",
        technologies: "",
        projectUrl: "",
        gitHubUrl: "",
        startDate: "",
        endDate: "",
      }}
      fields={fields}
      getTitle={(x) => x.projectName}
      getSubtitle={(x) => x.technologies || ""}
      onSave={onSave}
    />
  );
};

export default ProjectsDetails;