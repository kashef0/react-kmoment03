export interface User {
    _id: string,
    username: string,
    email: string
}


export interface LoginCredential{
    email: string,
    password: string
}

export interface AuthResponse {
    user: User,
    token: string
}

export interface AuthContextType {
    user: User | null,
    login: (Credential: LoginCredential) => Promise<void>;
    logout: () => void;
    

}

