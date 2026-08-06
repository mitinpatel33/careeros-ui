import { Psychology } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import {
  useGetProficiencyLevelsQuery,
  useGetSkillOptionsQuery,
} from "../../../../services/candidateLookupApi";

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
  const { data: proficiencyOptions = [] } = useGetProficiencyLevelsQuery();
  const { data: skillOptions = [] } = useGetSkillOptionsQuery();

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
        },
        {
          name: "proficiency",
          label: "Skill Level",
          type: "select",
          options: proficiencyOptions,
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