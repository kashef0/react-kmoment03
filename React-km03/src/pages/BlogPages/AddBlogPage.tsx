import { useState } from "react";
import { Blog, UpdateBlog } from "../../types/blog.types";
import { blogValidationForm } from "../../validation/validationForm"; 
import { useNavigate } from "react-router-dom"; 
import useGet from "../../Hooks/useGet"; 
import { HandleCategory } from "../../types/category.types"; 
import usePost from "../../Hooks/usePost";


// definiera felmeddelanden i formuläret
interface ErrorForm {
  title: string;
  content: string;
  category: string;
}

const AddBlogPage = () => {
  const navigate = useNavigate(); 
  const apiUrl = import.meta.env.VITE_API_URL; 
  const [updateStatus, setUpdateStatus] = useState(false); 

  // hämta kategorier från api med useGet hook
  const {
    data: categories,
    loading: categoriesLoading,
  } = useGet<HandleCategory[]>(`${apiUrl}/category`, updateStatus);

  // använd usePost hook för att skicka bloggdata till api
  const {
    data: createdBlog,
    loading,
    postData,
  } = usePost<Blog>(`${apiUrl}/blog/create`);

  // hämta användarens data från localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // state för formulärdatan
  const [formData, setFormData] = useState<UpdateBlog>({
    title: "",
    content: "",
    author: user._id || "", // sätt användarens namn från localStorage
    category: "", 
  });

  // felmeddelanden i formuläret
  const [errorForm, setErrorForm] = useState<ErrorForm>({
    title: "",
    content: "",
    category: "",
  });

  // att visa ett framgångsmeddelande
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // hantera formulärinsändning
  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const validationError = blogValidationForm(formData);
    setErrorForm(validationError);
  
    if (validationError.title || validationError.content || validationError.category) return;
  
    try {
      const requestData = {
        ...formData,
        author: { _id: user.id, username: user.username },
      };

  
      await postData(requestData);
  
      if (createdBlog) {
        setSuccessMessage("Bloggen har skapats!");
        setUpdateStatus(true);
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/BlogPage");
        }, 3000);
        setFormData({ title: "", content: "", author: user._id ?? "", category: "" });
      }
    } catch (err) {
      console.error("Fel vid skapande av blogg:", err);
      setUpdateStatus(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitForm}>
        {errorForm.title && <p className="error">{errorForm.title}</p>}
        <label htmlFor="title">Titel</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />

        {errorForm.content && <p className="error">{errorForm.content}</p>}
        <label htmlFor="content">Innehåll</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={(event) =>
            setFormData({ ...formData, content: event.target.value })
          }
        />

        {/* dropdown för kategori */}
        {errorForm.category && <p className="error">{errorForm.category}</p>}
        <label htmlFor="category">Kategori</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={(event) =>
            setFormData({ ...formData, category: event.target.value })
          }
          disabled={categoriesLoading} 
        >
          <option value="">Välj en kategori</option>
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Skapar..." : "Skapa blogg"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddBlogPage;