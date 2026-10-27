import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StrongLink = styled(RouterLink)({ color: "#2563eb", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } });
const MutedLink = styled(RouterLink)({ color: "#64748b", textDecoration: "none", "&:hover": { textDecoration: "underline" } });

/**
 * Drop this under the Login / Sign Up button.
 * Opens in a new tab so users don't lose what they typed in the form.
 */
export const LegalConsentText = () => (
    <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "#64748b", mt: 2, lineHeight: 1.6 }}>
        By continuing, you agree to our{" "}
        <StrongLink to="/terms-and-conditions" target="_blank" rel="noopener">
            Terms &amp; Conditions
        </StrongLink>{" "}
        and{" "}
        <StrongLink to="/privacy-policy" target="_blank" rel="noopener">
            Privacy Policy
        </StrongLink>
        .
    </Typography>
);

/** Small footer row for dashboards or the Coming Soon page. */
export const LegalFooterLinks = () => (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", fontSize: 13 }}>
        <MutedLink to="/privacy-policy">
            Privacy Policy
        </MutedLink>
        <MutedLink to="/terms-and-conditions">
            Terms &amp; Conditions
        </MutedLink>
    </Box>
);