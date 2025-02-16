import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePost from "../../Hooks/usePost";
import { SignupCredential, UsersResponse } from "../../types/auth.types";
import './CreateUserPage.css';
import userValidationForm from "../../validation/passwordValidation";
import useGet from "../../Hooks/useGet";

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
};

const CreateUserPage: React.FC = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [SuccessMessage, setSuccessMessage] = useState<string | null>(null);
  const [EmailError, setEmailError] = useState<string | null>(null);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [ErrorForm, setErrorForm] = useState<FormErrors>({});

  // hook för att posta användardata
  const { data: user, postData, loading } = usePost<SignupCredential>(`${url}/user/signup`);
  // hook för att hämta alla användare
  const { data: usersRes, fetchData } = useGet<UsersResponse>(`${url}/user/users`, loading);

  // hämtar användardata när komponenten laddas
  useEffect(() => {
    fetchData();
  }, [url]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setSuccessMessage(null);
  
    // kontrollera att alla fält är ifyllda
    if (!username || !email || !password) {
      setSuccessMessage("alla fält är obligatoriska.");
      return;
    }
  
    const userData = { username, email, password };
    const validationError = userValidationForm(userData);
    // uppdaterar felmeddelanden i formuläret
    setErrorForm(validationError);  

    // stoppa formulärets inlämning om det finns valideringsfel
    if (Object.keys(validationError).length > 0) {
      return;  
    }
    
    // kontrollera om email redan finns 
    if (usersRes?.users && Array.isArray(usersRes.users)) {
        const emailExists = usersRes.users.some((user) => user.email === email);
        if (emailExists) {
          setEmailError("e-postadressen används redan.");
          return;
        }
    }

    try {
      // skicka användardata
      await postData(userData);
      
      if (user) {
        setSuccessMessage("kontot har skapats!");
        
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/LoginPage');
        }, 3000);
      }
    } catch (error: any) {
      // hantera fel vid skapande av användare
      console.error("fel vid skapande av användare:", error);
      if (error.message.includes("e-postadressen används redan")) {
        setEmailError("e-postadressen används redan.");
      } else {
        setSuccessMessage("kontoskapande misslyckades...");
      }
    }
  };

  return (
    <div className="create-user-container">
      <h1>skapa ny användare</h1>
      <form onSubmit={handleCreateUser}>
        <div>
          <p>{ErrorForm.username}</p>
          <label>användarnamn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Matrin smith"
            required
          />
        </div>
        <div>
          <p>{ErrorForm.email}</p>
          <p className="error-message">{EmailError}</p>
          <label>e-postadress</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kashef@gmail.com"
            required
          />
        </div>
        <div>
          <p className="error-message">{ErrorForm.password}</p>
          <label>lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="lösenord"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "skapar..." : "skapa användare"}
        </button>
        {SuccessMessage && <p className="SuccessMessage">{SuccessMessage}</p>}
      </form>
    </div>
  );
};

export default CreateUserPage;
