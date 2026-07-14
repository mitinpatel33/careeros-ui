import { EmojiEvents } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import type { DialogField } from "./ProfileItemDialog";

export type ProfileAchievement = {
  id?: string;
  title: string;
  description?: string;
  achievementDate?: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileAchievement[];
  loading?: boolean;
  onChange: (items: ProfileAchievement[]) => void;
  onSaveStep: () => void;
};

const AchievementsDetails = ({
  items,
  loading,
  onChange,
  onSaveStep,
}: Props) => {
  const fields: DialogField<ProfileAchievement>[] = [
    { name: "title", label: "Achievement Title" },
    { name: "achievementDate", label: "Achievement Date", type: "date" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
  ];

  const defaultItem: ProfileAchievement = {
    title: "",
    description: "",
    achievementDate: "",
  };

  return (
    <ProfileCrudStep<ProfileAchievement>
      title="Achievements"
      subtitle="Awards and highlights"
      icon={<EmojiEvents />}
      items={items}
      defaultItem={defaultItem}
      fields={fields}
      loading={loading}
      getTitle={(x) => x.title}
      getSubtitle={(x) => x.description || ""}
      onChange={onChange}
      onSaveStep={onSaveStep}
    />
  );
};

export default AchievementsDetails;