import { EmojiEvents } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

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
  onSave: (items: ProfileAchievement[]) => Promise<void>;
};

const AchievementsDetails = ({ items, loading, onSave }: Props) => {
  const fields: any[] = [
    { name: "title", label: "Achievement Title" },
    { name: "achievementDate", label: "Achievement Date", type: "date" },
    { name: "description", label: "Description", type: "textarea", rows: 4 },
  ];

  return (
    <ProfileCrudStep<ProfileAchievement>
      title="Achievements"
      subtitle="Awards and highlights"
      icon={<EmojiEvents />}
      items={items}
      loading={loading}
      defaultItem={{
        title: "",
        description: "",
        achievementDate: "",
      }}
      fields={fields}
      getTitle={(x) => x.title}
      getSubtitle={(x) => x.description || ""}
      onSave={onSave}
    />
  );
};

export default AchievementsDetails;