import { createContext, useState, ReactNode } from "react";
import { AuthContextType, AuthResponse, LoginCredential, User } from "../types/auth.types";


// skapa context 
const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProvidersProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProvidersProps> = ( {children} ) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (credientials: LoginCredential) => {
        try {
            const res = await fetch("https://todolist-api-1-kya5.onrender.com/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credientials)
            })

            if (!res.ok) {
                throw new Error("inlogning misslyckades"); // Ensure an error is thrown
            }
            const data = await res.json() as AuthResponse;

            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    } 
    
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }


    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
    
}

export default AuthContext;