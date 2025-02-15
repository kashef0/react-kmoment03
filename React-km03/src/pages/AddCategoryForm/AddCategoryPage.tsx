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

const HomePage = () => {
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

    const validationError = validationForm(formData); // Validera formuläret och få eventuella fel
    setErrorForm(validationError); // Sätt felmeddelandena i state

    if (validationError.name || validationError.description) {
      return;
    }

    try {
      await postData(formData); // Skicka formulärdata till API:et
      if (createdCategory) {
        // Hantera lyckad skapelse (t.ex. återställ formuläret, visa ett meddelande)
        console.log("Kategori skapad:", createdCategory);
        setSuccessMessage("Kategori skapad framgångsrikt!");
        setTimeout(() => (setSuccessMessage(null), navigate('/CategoryPage')), 3000);
        
        setFormData({ name: "", description: "" }); // Rensa formuläret
      }
    } catch (err) {
      // Hantera fel (t.ex. visa felmeddelandet)
      console.error("Fel vid skapande av kategori:", err);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={submitForm}>
          {errorForm.name && <p className="error">{errorForm.name}</p>}{" "}
          {/* Visa felmeddelande för namn */}
          <label htmlFor="name">Titel</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name} // Använd formData state
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
          {errorForm.description && (
            <p className="error">{errorForm.description}</p>
          )}{" "}
          {/*  Visa felmeddelande för beskrivning  */}
          <label htmlFor="description">Beskrivning</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description} // Använd formData state
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
          {/* Show success message */}
        </form>
      </div>
    </>
  );
};

export default HomePage;
