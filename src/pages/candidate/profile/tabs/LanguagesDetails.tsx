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
  onChange: (items: ProfileLanguage[]) => void;
  onSaveStep: () => void;
};

const LanguagesDetails = ({ items, loading, onChange, onSaveStep }: Props) => {
  const fields: any[] = [
    { name: "languageName", label: "Language Name" },
    { name: "proficiencyLevel", label: "Proficiency Level" },
  ];

  const Crud: any = ProfileCrudStep;

  return (
    <Crud
      title="Languages"
      subtitle="Languages you know"
      icon={<Translate />}
      items={items}
      emptyItem={{
        languageName: "",
        proficiencyLevel: "",
      }}
      fields={fields}
      loading={loading}
      getTitle={(x: any) => (x as ProfileLanguage).languageName}
      getSubtitle={(x: any) => (x as ProfileLanguage).proficiencyLevel}
      onChange={(items: any) => onChange(items as ProfileLanguage[])}
      onSaveStep={onSaveStep}
    />
  );
};

export default LanguagesDetails;