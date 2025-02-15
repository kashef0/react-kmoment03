import { createContext, useState, ReactNode, useEffect } from "react";
import { AuthContextType, AuthResponse, LoginCredential, User } from "../types/auth.types";


// skapa context 
const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProvidersProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProvidersProps> = ( {children} ) => {

    const [user, setUser] = useState<User | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const login = async (credientials: LoginCredential) => {
        try {
            const res = await fetch(`${apiUrl}/user/signin`, {
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
            console.log("API Data:", data);
            localStorage.setItem("token", data.token);
            console.log("User before setUser:", user);
            setUser({...data.user});
            console.log("User after setUser:", user);

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    } 
    
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
    

    const checkToken = async () => {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;

        if(!token) {
            setUser(null);
            return
        }

        try {
            const res = await fetch(apiUrl+"/user/me", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                console.log("this is data: ",data)
                setUser(data.user);
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
    
}

export default AuthContext;