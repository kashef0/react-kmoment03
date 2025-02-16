import { useState } from "react";
import usePost from "../../Hooks/usePost";
import { Category } from "../../types/category.types";
import validationForm from "../../validation/validationForm";
import "./AddCategoryPage.css";
import { useNavigate } from "react-router-dom";

interface ErrorForm {
  name: string;
  description: string;
}

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    data: createdCategory,
    loading,
    postData,
  } = usePost<Category>(`${apiUrl}/category/create`); // Använd data för den skapade kategorin

  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
  }); 
  const [errorForm, setErrorForm] = useState<ErrorForm>({
    name: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validationForm(formData); // Validera formuläret 
    setErrorForm(validationError); 

    if (validationError.name || validationError.description) {
      return;
    }

    try {
      await postData(formData); // Skicka formulärdata till server
      if (createdCategory) {
        setSuccessMessage("Kategori skapad framgångsrikt!");
        setTimeout(() => (setSuccessMessage(null), navigate('/CategoryPage')), 3000);
        
        setFormData({ name: "", description: "" }); 
      }
    } catch (err) {
      console.error("Fel vid skapande av kategori:", err);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={submitForm}>
          {errorForm.name && <p className="error">{errorForm.name}</p>}{" "}
          <label htmlFor="name">Titel</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
          {errorForm.description && (
            <p className="error">{errorForm.description}</p>
          )}{" "}
          
          <label htmlFor="description">Beskrivning</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
          />
          <button type="submit" disabled={loading}>
            {loading ? "Skickar..." : "Lägga till"}
          </button>
          {loading && <p className="success-message">Skapar kategori...</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}{" "}
         
        </form>
      </div>
    </>
  );
};

export default AddCategoryPage;
