import { FolderSpecial } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import type { DialogField } from "./ProfileItemDialog";

export type ProfileProject = {
  id?: string;
  projectName: string;
  clientName?: string;
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
  onChange: (items: ProfileProject[]) => void;
  onSaveStep: () => void;
};

const ProjectsDetails = ({ items, loading, onChange, onSaveStep }: Props) => {
  const fields: DialogField<ProfileProject>[] = [
    { name: "projectName", label: "Project Name" },
    { name: "clientName", label: "Client Name" },
    { name: "role", label: "Role" },
    { name: "technologies", label: "Technologies" },
    { name: "projectUrl", label: "Project URL" },
    { name: "gitHubUrl", label: "GitHub URL" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
  ];

  const defaultItem: ProfileProject = {
    projectName: "",
  };

  return (
    <ProfileCrudStep<ProfileProject>
      title="Projects"
      subtitle="Portfolio and client projects"
      icon={<FolderSpecial />}
      items={items}
      fields={fields}
      loading={loading}
      defaultItem={defaultItem}
      getTitle={(x) => x.projectName}
      getSubtitle={(x) => x.technologies || ""}
      onChange={onChange}
      onSaveStep={onSaveStep}
    />
  );
};

export default ProjectsDetails;