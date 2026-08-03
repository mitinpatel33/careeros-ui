import { Psychology } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileSkill = {
  _id?: string;
  skillName: string;
  proficiency?: string;
  experienceInYears: number;
  displayOrder?: number;
};

type Props = {
  items: ProfileSkill[];
  loading?: boolean;
  onSave: (items: ProfileSkill[]) => Promise<void>; // parent will handle API call
};

const SkillsDetails = ({ items, loading, onSave }: Props) => {
  return (
    <ProfileCrudStep<ProfileSkill>
      title="Skills"
      subtitle="Technical and professional skills"
      icon={<Psychology />}
      items={items}
      loading={loading}
      defaultItem={{
        skillName: "",
        proficiency: "Beginner",
        experienceInYears: 0,
      }}
      fields={[
        { name: "skillName", label: "Skill Name" },
        {
          name: "proficiency",
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
      onSave={onSave}
    />
  );
};

export default SkillsDetails;