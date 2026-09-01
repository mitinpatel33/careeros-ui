import { useState, useEffect, useMemo } from "react";
import { School } from "@mui/icons-material";
import ProfileCrudStep from "../ProfileCrudStep";
import { useGetDegreesQuery } from "../../../../services/candidateLookupApi";

export type ProfileEducation = {
  id?: string;
  _id?: string;
  instituteName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  percentage?: number;
  grade?: string;
  description?: string;
  displayOrder?: number;
};

type Props = {
  items: ProfileEducation[];
  loading?: boolean;
  onSave: (items: ProfileEducation[]) => Promise<void>;
};

const EducationDetails = ({ items, loading, onSave }: Props) => {
  // RTK Query hook for dynamic degree options from candidateLookupApi
  const { data: degreeOptionsFromApi = [] } = useGetDegreesQuery();

  // Search states for dynamic Indian Institute API (Hipolabs API)
  const [instituteSearch, setInstituteSearch] = useState("");
  const [instituteOptions, setInstituteOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isSearchingInstitutes, setIsSearchingInstitutes] = useState(false);

  // Search state for Degree API filtering
  const [degreeSearch, setDegreeSearch] = useState("");

  // 1. Debounced Search Effect for Indian Universities
  useEffect(() => {
    if (!instituteSearch.trim() || instituteSearch.trim().length < 2) {
      setInstituteOptions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingInstitutes(true);
      try {
        const response = await fetch(
          `http://universities.hipolabs.com/search?country=India&name=${encodeURIComponent(
            instituteSearch.trim(),
          )}`,
        );
        if (response.ok) {
          const data = await response.json();
          const formatted = data.map((item: any) => ({
            label: item.name,
            value: item.name,
          }));

          // Remove duplicate college entries
          const unique = Array.from(
            new Map(formatted.map((m: any) => [m.label, m])).values(),
          );
          setInstituteOptions(unique as { label: string; value: string }[]);
        }
      } catch (err) {
        console.error("Indian institute search failed:", err);
      } finally {
        setIsSearchingInstitutes(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [instituteSearch]);

  // 2. ✅ FIX: Use useMemo for filtering degrees to PREVENT infinite render loops ("Maximum update depth exceeded")
  const degreeOptions = useMemo(() => {
    if (!degreeSearch.trim()) {
      return degreeOptionsFromApi;
    }

    const filtered = degreeOptionsFromApi.filter((d) =>
      d.label.toLowerCase().includes(degreeSearch.toLowerCase()),
    );

    return filtered.length > 0
      ? filtered
      : [{ label: degreeSearch, value: degreeSearch }];
  }, [degreeSearch, degreeOptionsFromApi]);

  const fields: any[] = [
    {
      name: "instituteName",
      label: "Institute / College Name",
      type: "autocomplete",
      options: instituteOptions,
      onSearch: setInstituteSearch,
      loading: isSearchingInstitutes,
      freeSolo: true,
    },
    {
      name: "degree",
      label: "Degree / Qualification",
      type: "autocomplete",
      options: degreeOptions,
      onSearch: setDegreeSearch,
      freeSolo: true,
    },
    { name: "fieldOfStudy", label: "Field Of Study / Branch" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "percentage", label: "Percentage / CGPA", type: "number" },
    { name: "grade", label: "Grade" },
    { name: "description", label: "Description", type: "textarea", rows: 4 },
  ];

  return (
    <ProfileCrudStep<ProfileEducation>
      title="Education"
      subtitle="Academic qualification details"
      icon={<School />}
      items={items}
      loading={loading}
      defaultItem={{
        instituteName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        percentage: 0,
        grade: "",
        description: "",
      }}
      fields={fields}
      getTitle={(x) => x.degree || "Education"}
      getSubtitle={(x) =>
        `${x.instituteName || "N/A"} • ${x.fieldOfStudy || "N/A"}`
      }
      onSave={onSave}
    />
  );
};

export default EducationDetails;
