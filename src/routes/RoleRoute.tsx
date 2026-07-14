import { Navigate, Outlet } from "react-router-dom";

type Props = {
    allowedRoles: string[];
};

const RoleRoute = ({ allowedRoles }: Props) => {

    const userString = localStorage.getItem("user");

    if (!userString)
        return <Navigate to="/login" replace />;

    const user = JSON.parse(userString);

    if (!allowedRoles.includes(user.role))
    {
        // Redirect user to his own dashboard
        switch (user.role)
        {
            case "Candidate":
                return <Navigate to="/candidate/dashboard" replace />;

            case "Company":
                return <Navigate to="/company/dashboard" replace />;

            case "Admin":
                return <Navigate to="/admin/dashboard" replace />;

            default:
                return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};

export default RoleRoute;