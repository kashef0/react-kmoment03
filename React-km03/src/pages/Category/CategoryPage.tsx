import { useState } from "react";
import CategoryList from "../../components/CategoryList";
import useGet from "../../Hooks/useGet";
import { HandleCategory } from "../../types/category.types";
import useDelete from "../../Hooks/useDelete";
import { useNavigate } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [updateStatus, setUpdateStatus] = useState(false); // kontrollera om uppdatering av listan
  const {
    data: cate,
    error,
    loading,
  } = useGet<HandleCategory[]>(`${apiUrl}/category`, updateStatus); // hämta kategorier
  const { deleteData } = useDelete<HandleCategory>(`${apiUrl}/category/delete`); // hantera borttagning av kategorier

  
  // hanterar borttagning av kategori
  const handleDelete = async (categoryId: string) => {
    confirm("Är du säker att du vill ta bort Kategori?"); 
    try {
      await deleteData(categoryId); // anropar deleteData för att ta bort kategorin
      setUpdateStatus(true); // uppdaterar statusen för att hämta de senaste kategorierna
      alert("Kategori har raderats....");
    } catch (error) {
      console.error(error); 
    }
  };
  
  //  hantera uppdatering av kategori
  const handleUpdate = (category: HandleCategory) => {
    navigate(`/UpdateCategoryForm/${category._id}`); // navigera till uppdateringssidan med kategori-ID i url
  };

  return (
    <>
      <div className="main-container">
        <h1>kategori</h1>
        { loading && <div>Laddar...</div>} 
        {error && <div>Error: {error}</div>} 
        <div className="category-container">
          {cate &&
            cate.map((category) => (
              <CategoryList
                key={category._id} // unikt nyckelvärde för varje kategori
                categories={category} // skicka kategorin till CategoryList
                onDelete={() => handleDelete(category._id)} // hantera borttagning av kategori
                onUpdate={() => handleUpdate(category)} // hantera uppdatering av kategori
              />
            ))}
        </div>
        <div className="btn-container">
          <button
            className="add-btn"
            onClick={() => navigate("/AddCategoryPage")} // navigera till sidan AddCategoryPage
          >
            Skapa kategori
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
