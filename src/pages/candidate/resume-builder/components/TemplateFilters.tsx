import { MenuItem, Stack, TextField } from "@mui/material";
import type { TemplateCategory } from "../../../../types/resumeTemplate.types";

type Props = {
  search: string;
  category: "All" | TemplateCategory;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: "All" | TemplateCategory) => void;
};

const TemplateFilters = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: Props) => {

  const categories =  [
    "All",
    "ATS",
    "Professional",
    "Modern",
    "Creative",
    "Minimal",
    "Sidebar",
    "Two Column",
  ];

  return (
    <Stack direction="row" spacing={1.2}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search template..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
          },
        }}
      />

      <TextField
        select
        size="small"
        value={category}
        onChange={(e) =>
          onCategoryChange(e.target.value as "All" | TemplateCategory)
        }
        sx={{
          width: 145,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
          },
        }}
      >
        {categories.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default TemplateFilters;