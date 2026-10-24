import React, { useState } from "react";
import {
  Alert, Box, Button, Chip, CircularProgress, Grid, InputAdornment, TextField, Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { getJobVisual } from "../data";
import { IconBadge, SectionCard, SelectorTile } from "./shared";
import { useCreateCustomJobTitleMutation, useGetJobTitlesQuery, type CategoryDto, type JobTitleDto } from "../../../services/interviewApi";
import { getErrorMessage, useDebouncedValue } from "../../../utils/intervireUtils";

interface Props {
  categories: CategoryDto[];
  selectedJob: JobTitleDto | null;
  onSelect: (job: JobTitleDto) => void;
}

export const JobSelector: React.FC<Props> = ({ categories, selectedJob, onSelect }) => {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const debounced = useDebouncedValue(search.trim());

  const { data, isLoading, isFetching, error } = useGetJobTitlesQuery({
    search: debounced || undefined,
    categoryId: categoryId || undefined,
  });
  const [createCustom, { isLoading: creating, error: createError, reset }] =
    useCreateCustomJobTitleMutation();

  const jobs = data?.data ?? [];
  const categoryById = new Map(categories.map((c) => [c._id, c]));

  const addCustom = async () => {
    const job = await createCustom({ title: search.trim() }).unwrap().catch(() => null);
    if (job) {
      onSelect(job);
      setSearch("");
    }
  };

  return (
    <SectionCard
      title="Choose Your Role or Study Level"
      subtitle="Job role, course, class or exam — pick one or add your own to get relevant questions."
      action={
        <TextField
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            reset();
          }}
          placeholder="Search or type your own..."
          sx={{
            width: { xs: "100%", sm: 260 },
            "& .MuiOutlinedInput-root": { borderRadius: "24px", bgcolor: "#fff", fontSize: ".8rem" },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#8294b5", fontSize: 19 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      }
    >
      <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1.5 }}>
        {[{ _id: "", name: "All" } as CategoryDto, ...categories].map((c) => (
          <Chip
            key={c._id || "all"}
            label={c.name}
            size="small"
            clickable
            onClick={() => setCategoryId(c._id)}
            sx={{
              fontWeight: 700,
              fontSize: ".7rem",
              bgcolor: categoryId === c._id ? "#3769ff" : "#f0f4fb",
              color: categoryId === c._id ? "#fff" : "#5a6c8f",
              "&:hover": { bgcolor: categoryId === c._id ? "#2859ed" : "#e4ebfa" },
            }}
          />
        ))}
      </Box>

      <Grid
        container
        spacing={1.2}
        sx={{ opacity: isFetching && !isLoading ? 0.6 : 1, transition: "opacity .2s" }}
      >
        {jobs.map((job) => {
          const { icon, color } = getJobVisual(categoryById.get(job.categoryId ?? ""));
          return (
            <Grid key={job._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectorTile
                label={job.title}
                selected={selectedJob?._id === job._id}
                onClick={() => onSelect(job)}
                shadow
                leading={<IconBadge color={color} size={34}>{icon}</IconBadge>}
              />
            </Grid>
          );
        })}

        {(isLoading || error) && (
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ p: 2, textAlign: "center", color: error ? "#d33" : "#7588aa" }}>
              {isLoading ? "Loading..." : getErrorMessage(error)}
            </Typography>
          </Grid>
        )}

        {!isLoading && !error && jobs.length === 0 && (
          <Grid size={{ xs: 12 }} sx={{ textAlign: "center", p: 2 }}>
            <Typography sx={{ color: "#7588aa", mb: 1.25, fontSize: ".85rem" }}>
              {search.trim() ? "Can't find it? Add it as your own role." : "Nothing here yet."}
            </Typography>
            {search.trim() && (
              <Button
                variant="contained"
                disabled={creating}
                onClick={addCustom}
                startIcon={creating ? <CircularProgress size={16} color="inherit" /> : null}
                sx={{ textTransform: "none", borderRadius: "12px", fontWeight: 750 }}
              >
                Use “{search.trim()}”
              </Button>
            )}
            {createError && (
              <Alert severity="error" sx={{ mt: 1.5, textAlign: "left" }}>
                {getErrorMessage(createError)}
              </Alert>
            )}
          </Grid>
        )}
      </Grid>
    </SectionCard>
  );
};