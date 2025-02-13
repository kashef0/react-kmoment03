
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";



const LogInPage = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {login, user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/Profile");
        }
    }, [user, navigate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(formData);
            console.log(formData);
            console.log('Login successful');
            navigate("/Profile");
        } catch (error) {
            setError("inloggning misslyckades..");
            console.error(error);
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}

            <input
                type="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email"
                required
            />
            <input
                type="password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
    );
}

export default LogInPage