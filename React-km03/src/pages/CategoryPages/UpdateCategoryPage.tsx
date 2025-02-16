import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HandleCategory } from "../../types/category.types";
import usePut from "../../Hooks/usePut";

const UpdateCategoryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  console.log("Category ID:", id);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { updateData, loading, error } = usePut<HandleCategory>(
    `${apiUrl}/category/update`
  );
  const [formData, setFormData] = useState<HandleCategory>({
    _id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the category data to populate the form
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/category/${id}`);
        if (!response.ok) {
          throw new Error("Kunde inte hämta kategori");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, [id, apiUrl]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateData(formData, id!); // Send updated data to the server
      alert("Kategori har uppdaterats....");
      navigate("/CategoryPage"); // Navigate back to the category list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
          {loading ? "Uppdaterar..." : "Uppdatera"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
