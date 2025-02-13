import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../types/auth.types";

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth måste användas inom AuthProvider");
    }
    return context;
};

export default useAuth;
