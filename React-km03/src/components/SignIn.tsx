

// import { useEffect, useState } from "react";
// import useAuth from "../Hooks/useAuth";
// import { useNavigate } from "react-router-dom";


// const SignIn = () => {
//     const [formData, setFormData] = useState({email: '', password: ''});
   
//     const [error, setError] = useState('');

//     const {login, user} = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             navigate("/Profile");
//         }
//     }, [navigate, user])

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setError('');

//         try {
//             await login(formData);
//             console.log('Login successful');
//             navigate("/Profile");
//         } catch (error) {
//             setError("inloggning misslyckades..");
//             console.error(error);
//         }
//     }
//     return (
//         <form onSubmit={handleSubmit}>
//             {error && <p>{error}</p>}

//             <input
//                 type="email"
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 placeholder="email"
//                 required
//             />
//             <input
//                 type="password"
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder="Password"
//                 required
//             />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

// export default SignIn

import React from 'react'

const signIn = () => {
  return (
    <div>signIn</div>
  )
}

export default signIn