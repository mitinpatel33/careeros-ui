import { Psychology } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileSkill = {
  _id?: string;
  skillName: string;
  proficiency?: string;
  experienceInYears: number;
  displayOrder?: number;
};

// ✅ Proficiency options
const PROFICIENCY_OPTIONS = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];

type Props = {
  items: ProfileSkill[];
  loading?: boolean;
  onSave: (items: ProfileSkill[]) => Promise<void>;
};

const SkillsDetails = ({ items, loading, onSave }: Props) => {
  const skillOptions: any = []

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
        {
          name: "skillName",
          label: "Skill Name",
          type: "select",
          options: skillOptions,
          // ✅ Pass the search callback so that typing triggers API
          // onSearch: setSearchTerm,
        },
        {
          name: "proficiency",
          label: "Skill Level",
          type: "select",
          options: PROFICIENCY_OPTIONS,
        },
        {
          name: "experienceInYears",
          label: "Experience Years",
          type: "number",
        },
      ]}
      getTitle={(x) => x.skillName} // now shows the name, not URI
      getSubtitle={(x) =>
        `${x.proficiency || "Beginner"} • ${x.experienceInYears} years`
      }
      onSave={onSave}
    />
  );
};

export default SkillsDetails;
