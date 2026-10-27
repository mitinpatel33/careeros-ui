import { Link as RouterLink } from "react-router-dom";
import { Checkbox, FormControlLabel, FormHelperText, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Link = styled(RouterLink)({ color: "#2563eb", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } });

export const TermsCheckbox = ({ checked, onChange, error }: {
    checked: boolean; onChange: (v: boolean) => void; error?: boolean;
}) => (
    <Box sx={{ mt: 0 }}>
        <FormControlLabel
            control={<Checkbox size="small" checked={checked} onChange={(e) => onChange(e.target.checked)} />}
            label={
                <span style={{ fontSize: 12, color: "#475569" }}>
                    I agree to the <Link to="/terms-and-conditions" target="_blank">Terms &amp; Conditions</Link> and{" "}
                    <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>
                </span>
            }
        />
        {error && <FormHelperText error sx={{ ml: 4 }}>You must accept to create an account.</FormHelperText>}
    </Box>
);