import { forwardRef, useMemo, type ReactNode } from "react";
import { Box } from "@mui/material";
import ResumePage from "./ResumePage";
import { normalizeResume, type NResume } from "./resume";
import { FONT, makeTheme, type ResumeTheme } from "./Themeatoms";


interface Options {
    /** page background (default white) */
    bg?: string;
    /** font stack applied to every Typography inside the page */
    font?: string;
}

/**
 * Builds one resume template component from:
 *   - its accent colour
 *   - a render function that lays out the normalised resume with the shared atoms
 * The result has the same contract as ClassicBlueTemplate: forwardRef + `data` prop.
 */
export const createTemplate = (
    displayName: string,
    color: string,
    render: (r: NResume, t: ResumeTheme) => ReactNode,
    { bg = "#ffffff", font = FONT }: Options = {},
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Template = forwardRef<HTMLDivElement, { data?: any }>(({ data }, ref) => {
        const r = useMemo(() => normalizeResume(data), [data]);
        const t = useMemo(() => makeTheme(color), []);
        return (
            <ResumePage ref={ref}>
                <Box
                    sx={{
                        position: "relative",
                        minHeight: 1123,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        bgcolor: bg,
                        color: t.ink,
                        fontFamily: font,
                        fontSize: "12px",
                        lineHeight: 1.5,
                        "& .MuiTypography-root": { fontFamily: font },
                    }}
                >
                    {render(r, t)}
                </Box>
            </ResumePage>
        );
    });
    Template.displayName = displayName;
    return Template;
};