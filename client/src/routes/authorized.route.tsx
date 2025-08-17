import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Navigate, Outlet } from "react-router-dom";

function AuthorizedRoute() {
    const { profile, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading</div>;
    }

    if (profile) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />;
}

export default AuthorizedRoute;
