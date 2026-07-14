import { Psychology } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileSkill = {
  id?: string;
  skillName: string;
  skillLevel?: string;
  experienceYears: number;
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
        skillLevel: "",
        experienceYears: 0,
      }}
      fields={[
        { name: "skillName", label: "Skill Name" },
        {
          name: "skillLevel",
          label: "Skill Level",
          type: "select",
          options: [
            { label: "Beginner", value: "Beginner" },
            { label: "Intermediate", value: "Intermediate" },
            { label: "Advanced", value: "Advanced" },
            { label: "Expert", value: "Expert" },
          ],
        },
        { name: "experienceYears", label: "Experience Years", type: "number" },
      ]}
      getTitle={(x) => x.skillName}
      getSubtitle={(x) => `${x.skillLevel || "Beginner"} • ${x.experienceYears} years`}
      onChange={onChange}
      onSaveStep={onSaveStep}
    />
  );
};

export default SkillsDetails;