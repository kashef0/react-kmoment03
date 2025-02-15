import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import './LoginPage.css'

const LogInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/Profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(formData);
      console.log("Login successful");
    } catch (error) {
      setError("inloggning misslyckades..");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="form-container-login">
        <div className="login-rubrik">
            <h1>Välkomen tillbaka..</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
        <h2>Logga in</h2>
        {error && <p>{error}</p>}

        <input
        type="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
        />

        <input
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
        />

        <button className="login-btn" type="submit" disabled={isLoading}>
        {isLoading ? "Laddar..." : "Skicka"}
        </button>

        <div className="login-links">
        <a href="/create-account">Skapa konto</a>
        <a href="/forgot-password">Glömt lösenord</a>
        </div>
        </form>
    </div>

  );
};

export default LogInPage;
