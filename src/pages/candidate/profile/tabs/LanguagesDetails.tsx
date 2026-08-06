import { Translate } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import { useGetRealTimeLanguagesQuery } from "../../../../services/thirdPartyApi";
import { useGetProficiencyLevelsQuery } from "../../../../services/candidateLookupApi";

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
  const { data: languageOptions = [] } = useGetRealTimeLanguagesQuery();
  const { data: proficiencyOptions = [] } = useGetProficiencyLevelsQuery();

  const fields: any[] = [
    {
      name: "languageName",
      label: "Language Name",
      type: "select",
      options: languageOptions,
    },
    {
      name: "proficiencyLevel",
      label: "Proficiency Level",
      type: "select",
      options: proficiencyOptions,
    },
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