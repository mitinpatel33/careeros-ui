import { useState, useEffect } from "react";
import { Psychology } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileSkill = {
  _id?: string;
  skillName: string;
  proficiency?: string;
  experienceInYears: number;
  displayOrder?: number;
};

const PROFICIENCY_OPTIONS = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];

const COMMON_SKILLS = [
  "React", "React Native", "TypeScript", "JavaScript", "Node.js",
  "Python", "Java", "C#", "HTML5", "CSS3", "GraphQL", "Docker"
];

type Props = {
  items: ProfileSkill[];
  loading?: boolean;
  onSave: (items: ProfileSkill[]) => Promise<void>;
};

const SkillsDetails = ({ items, loading, onSave }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillOptions, setSkillOptions] = useState<{ label: string; value: string }[]>(
    COMMON_SKILLS.map((s) => ({ label: s, value: s }))
  );
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSkillOptions(COMMON_SKILLS.map((s) => ({ label: s, value: s })));
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchTerm)}`
        );
        if (response.ok) {
          const data = await response.json();
          const formatted = data.map((item: any) => ({
            label: item.word,
            value: item.word,
          }));
          setSkillOptions(formatted);
        } else {
          // Filter local list if external API call returns no results
          const filtered = COMMON_SKILLS.filter((s) =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((s) => ({ label: s, value: s }));
          
          setSkillOptions(
            filtered.length > 0
              ? filtered
              : [{ label: searchTerm, value: searchTerm }]
          );
        }
      } catch (err) {
        console.error("Skill search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
          type: "autocomplete",
          options: skillOptions,
          onSearch: setSearchTerm,
          loading: isSearching,
          freeSolo: true,
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
      getTitle={(x) => x.skillName}
      getSubtitle={(x) =>
        `${x.proficiency || "Beginner"} • ${x.experienceInYears} years`
      }
      onSave={onSave}
    />
  );
};

export default SkillsDetails;