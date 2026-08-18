import { useState, useEffect } from "react";
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

// Fallback Degree Options if RTK Query or API is empty
const DEFAULT_DEGREES = [
  "High School Diploma",
  "Associate of Arts (A.A.)",
  "Associate of Science (A.S.)",
  "Bachelor of Arts (B.A.)",
  "Bachelor of Science (B.S.)",
  "Bachelor of Engineering (B.E. / B.Tech)",
  "Master of Arts (M.A.)",
  "Master of Science (M.S.)",
  "Master of Business Administration (MBA)",
  "Master of Technology (M.Tech)",
  "Doctor of Philosophy (Ph.D.)",
];

type Props = {
  items: ProfileEducation[];
  loading?: boolean;
  onSave: (items: ProfileEducation[]) => Promise<void>;
};

const EducationDetails = ({ items, loading, onSave }: Props) => {
  // RTK Query hook for dynamic degree options from your backend lookup
  const { data: degreeOptionsFromApi = [] } = useGetDegreesQuery();

  // Search states for dynamic Institute API (Hipolabs Universities API)
  const [instituteSearch, setInstituteSearch] = useState("");
  const [instituteOptions, setInstituteOptions] = useState<{ label: string; value: string }[]>([]);
  const [isSearchingInstitutes, setIsSearchingInstitutes] = useState(false);

  // Search states for dynamic Degree API filtering
  const [degreeSearch, setDegreeSearch] = useState("");
  const [degreeOptions, setDegreeOptions] = useState<{ label: string; value: string }[]>([]);

  // 1. Debounced Search Effect for Third-Party Universities API
  useEffect(() => {
    if (!instituteSearch.trim() || instituteSearch.trim().length < 2) {
      setInstituteOptions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingInstitutes(true);
      try {
        // Free third-party Universities API (Hipolabs)
        const response = await fetch(
          `http://universities.hipolabs.com/search?name=${encodeURIComponent(
            instituteSearch
          )}&limit=20`
        );
        if (response.ok) {
          const data = await response.json();
          // Map response data
          const formatted = data.map((item: any) => ({
            label: `${item.name} (${item.country})`,
            value: item.name,
          }));
          
          // Remove duplicates
          const unique = Array.from(
            new Map(formatted.map((m: any) => [m.label, m])).values()
          );
          setInstituteOptions(unique as { label: string; value: string }[]);
        }
      } catch (err) {
        console.error("Institute search failed:", err);
      } finally {
        setIsSearchingInstitutes(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [instituteSearch]);

  // 2. Degree options filtering (uses API data if present, otherwise defaults)
  useEffect(() => {
    const rawList: string[] =
      degreeOptionsFromApi && degreeOptionsFromApi.length > 0
        ? degreeOptionsFromApi.map((d: any) => (typeof d === "string" ? d : d.label || d.name))
        : DEFAULT_DEGREES;

    if (!degreeSearch.trim()) {
      setDegreeOptions(rawList.map((d) => ({ label: d, value: d })));
      return;
    }

    const filtered = rawList.filter((d) =>
      d.toLowerCase().includes(degreeSearch.toLowerCase())
    );

    setDegreeOptions(
      filtered.length > 0
        ? filtered.map((d) => ({ label: d, value: d }))
        : [{ label: degreeSearch, value: degreeSearch }]
    );
  }, [degreeSearch, degreeOptionsFromApi]);

  const fields: any[] = [
    {
      name: "instituteName",
      label: "Institute Name",
      type: "autocomplete",
      options: instituteOptions,
      onSearch: setInstituteSearch,
      loading: isSearchingInstitutes,
      freeSolo: true,
    },
    {
      name: "degree",
      label: "Degree",
      type: "autocomplete",
      options: degreeOptions,
      onSearch: setDegreeSearch,
      freeSolo: true,
    },
    { name: "fieldOfStudy", label: "Field Of Study" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "percentage", label: "Percentage", type: "number" },
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
      getSubtitle={(x) => `${x.instituteName || "N/A"} • ${x.fieldOfStudy || "N/A"}`}
      onSave={onSave}
    />
  );
};

export default EducationDetails;