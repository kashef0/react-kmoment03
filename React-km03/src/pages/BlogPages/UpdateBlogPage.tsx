import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HandleBlog } from "../../types/blog.types";
import usePut from "../../Hooks/usePut";

const UpdateBlogPage: React.FC = () => {
  // hämtar bloggens id från url parametrarna
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();  // navigeringsfunktion
  const apiUrl = import.meta.env.VITE_API_URL;  
  const { updateData, loading, error } = usePut<HandleBlog>(`${apiUrl}/blog/update`);  // hook för  update förfrågan

  // hämtar användardata från lokal lagring 
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // state för att lagra kategorier och formdata
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [formData, setFormData] = useState<HandleBlog>({
    _id: "",
    title: "",
    content: "",
    author: user,  // sätter inloggad användare som författare i formdata
    category: { _id: "", name: "" },
    createdAt: "",
  });

  useEffect(() => {
    // hämtar bloggens information baserat på id
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${apiUrl}/blog/${id}`);
        if (!response.ok) {
          throw new Error("Unable to fetch blog");
        }
        const data = await response.json();
        const blogData = {
          ...data,
          author: data.author || { _id: "", username: "" },  
          category: data.category || { _id: "", name: "" }, 
        };
        setFormData(blogData);  
      } catch (error) {
        console.error(error);  
      }
    };

    // hämtar alla kategorier från api
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/category`);
        if (!response.ok) {
          throw new Error("Unable to fetch categories");
        }
        const data = await response.json();
        setCategories(data);  // uppdaterar kategorier i state
      } catch (error) {
        console.error(error); 
      }
    };

    fetchBlog();  // hämtar blogginformation
    fetchCategories();  // hämtar kategorier
  }, [id, apiUrl]);  

  // hanterar formulärsubmit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    if (!formData._id) {
      console.error("Blog ID is missing."); 
      return;
    }
    const updatedBlogData = { ...formData };  // kopiera formdata för att uppdatera
    try {
      await updateData(updatedBlogData, formData._id!);  // skickar uppdaterade blogginformationen
      alert("Bloggen har uppdaterats framgångsrikt."); 
      navigate("/BlogPage");  
    } catch (error) {
      console.error(error); 
    }
  };

  const getCategoryName = (cateId: string) => {

    const foundCategory = categories.find(category => category._id === cateId);
    return foundCategory && foundCategory.name;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titel</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={(event) => setFormData({ ...formData, title: event.target.value })}  // uppdatera titel
        />
        <label htmlFor="content">Innehåll</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={(event) => setFormData({ ...formData, content: event.target.value })}  // uppdatera innehåll
        />
        <label htmlFor="category">Kategori</label>
        <select
        className="select"
          name="category"
          id="category"
          value={formData.category._id}
          onChange={(event) =>
            setFormData({
              ...formData,
              category: categories.find((category) => category._id === event.target.value) || { _id: "", name: "" },
            })  // uppdatera vald kategori
          }
        >
            <option value={formData.category}>{getCategoryName(formData.category)}</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Uppdaterar..." : "Uppdatera"}  
        </button>
        {error && <p className="error">{error}</p>} 
      </form>
    </div>
  );
};

export default UpdateBlogPage;
