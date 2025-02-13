import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";



interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute : React.FC<ProtectedRouteProps> = ( {children} ) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/LoginPage" replace />;

    }

    return (
        <>
        {children}
        </>
        
    )

}

export default ProtectedRoute;