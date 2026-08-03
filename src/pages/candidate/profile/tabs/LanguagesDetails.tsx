import { Translate } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";

export type ProfileLanguage = {
  id?: string;
  languageName: string;
  proficiencyLevel: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileLanguage[];
  loading?: boolean;
  onSave: (items: ProfileLanguage[]) => Promise<void>;
};

const LanguagesDetails = ({ items, loading, onSave }: Props) => {
  const fields: any[] = [
    { name: "languageName", label: "Language Name" },
    { name: "proficiencyLevel", label: "Proficiency Level" },
  ];

  return (
    <ProfileCrudStep<ProfileLanguage>
      title="Languages"
      subtitle="Languages you know"
      icon={<Translate />}
      items={items}
      loading={loading}
      defaultItem={{
        languageName: "",
        proficiencyLevel: "",
      }}
      fields={fields}
      getTitle={(x) => x.languageName}
      getSubtitle={(x) => x.proficiencyLevel}
      onSave={onSave}
    />
  );
};

export default LanguagesDetails;