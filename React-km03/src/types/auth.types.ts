export interface User {
    _id: string,
    username: string,
    email: string
}
export interface UsersResponse {
    message: string;
    users: User;
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

export interface SignupCredential{
    username: string,
    email: string,
    password: string
}
