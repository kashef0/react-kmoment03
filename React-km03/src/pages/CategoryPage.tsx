import { useState } from "react";
import AddCategoryPage from "./AddCategoryPage";
import CategoryList from "../components/CategoryList";
import useGet from "../Hooks/useGet";
import { HandleCategory } from "../types/category.types";
import useDelete from "../Hooks/useDelete";
import { useNavigate } from "react-router-dom";
import './CategoryPage.css'

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; 
  const [updateStatus, setUpdateStatus] = useState(false); //  kontrollera om uppdatering av listan ska ske
  const { data: cate, error, loading } = useGet<HandleCategory[]>(`${apiUrl}/category`, updateStatus ); //  hämta kategorier
  const { deleteData } = useDelete<HandleCategory>(`${apiUrl}/category/delete`); //  hantera borttagning av kategorier

  if (loading) return <div>Laddar...</div>; 
  if (error) return <div>Error: {error}</div>; 

  // Funktion som hanterar borttagning av kategori
  const handleDelete = async (categoryId: string) => {
    try {
      await deleteData(categoryId); // Anropar deleteData för att ta bort kategorin
      setUpdateStatus(true); // Uppdaterar statusen 
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
    <div className="main-container">
      <h1>kategori</h1>
      <div className="category-container">
        {cate && cate.map((category) => (
          <CategoryList
            key={category._id} // unikt nyckelvärde för varje kategori
            categories={category} // Skickar den individuella kategorin till CategoryList
            onDelete={() => handleDelete(category._id)} // Hanterar borttagning av kategori
            onUpdate={() => updateData(category._id)} //  hantera Uppdatering av data
          />
        ))}
      </div>
      <div className="btn-container">
        <button className="add-btn" onClick={() => navigate("/AddCategoryPage")}>Skapa kategori</button>
      </div>
    </div>
    </>
  );
};

export default CategoryPage;
