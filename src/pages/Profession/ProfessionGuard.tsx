import { Navigate, Outlet } from "react-router-dom";
import { useProfession } from "./UseProfession";

/** Candidate pages that need a profession redirect to the chooser first. */
const ProfessionGuard = () => {
    const { profession } = useProfession();
    if (!profession) return <Navigate to="/candidate/profession" replace />;
    return <Outlet />;
};

export default ProfessionGuard;