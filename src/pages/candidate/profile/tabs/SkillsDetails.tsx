import { Psychology } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileSkill = {
  _id?: string;                // the API’s identifier
  skillName: string;
  proficiency?: string;        // was skillLevel
  experienceInYears: number;   // was experienceYears
  displayOrder?: number;  
};

type Props = {
  items: ProfileSkill[];
  loading?: boolean;
  onChange: (items: ProfileSkill[]) => void;
  onSaveStep: () => void;
};

const SkillsDetails = ({ items, loading, onChange, onSaveStep }: Props) => {
  return (
    <ProfileCrudStep<ProfileSkill>
      title="Skills"
      subtitle="Technical and professional skills"
      icon={<Psychology />}
      items={items}
      loading={loading}
      defaultItem={{
        skillName: "",
        proficiency: "Beginner",       // match the API field name
        experienceInYears: 0,
      }}
      fields={[
        { name: "skillName", label: "Skill Name" },
        {
          name: "proficiency",         // was "skillLevel"
          label: "Skill Level",
          type: "select",
          options: [
            { label: "Beginner", value: "Beginner" },
            { label: "Intermediate", value: "Intermediate" },
            { label: "Advanced", value: "Advanced" },
            { label: "Expert", value: "Expert" },
          ],
        },
        { name: "experienceInYears", label: "Experience Years", type: "number" },
      ]}
      getTitle={(x) => x.skillName}
      getSubtitle={(x) => `${x.proficiency || "Beginner"} • ${x.experienceInYears} years`}
      onChange={onChange}
      onSaveStep={onSaveStep}
    />
  );
};

export default SkillsDetails;