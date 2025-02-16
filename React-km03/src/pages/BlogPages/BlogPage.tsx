import { useEffect, useState } from "react";
import useGet from "../../Hooks/useGet";
import { HandleBlog } from "../../types/blog.types"; 
import useDelete from "../../Hooks/useDelete";
import { useNavigate } from "react-router-dom";
import BlogList from "../../components/BlogList";

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [updateStatus, setUpdateStatus] = useState(false); // kontrollera om uppdatering av listan
  const {
    data: blogs,
    error,
    loading,
    fetchData
  } = useGet<HandleBlog[]>(`${apiUrl}/blog`, updateStatus); // hämta bloggar
  const { deleteData } = useDelete<HandleBlog>(`${apiUrl}/blog/delete`); // hantera borttagning av bloggar

  useEffect(()=> {
    fetchData();
  }, [updateStatus])

  // hantera borttagning av blogg
  const handleDelete = async (blogId: string) => {
    if (confirm("Är du säker att du vill ta bort bloggen?")) {
      try {
        await deleteData(blogId); // anropa deleteData för att ta bort bloggen
        setUpdateStatus(((updateStatus) => !updateStatus)); // uppdatera statusen för att hämta de senaste bloggarna
        alert("Bloggen har raderats.");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // hantera uppdatering av blogg
  const handleUpdate = (blog: HandleBlog) => {
    navigate(`/UpdateBlogPage/${blog._id}`); // navigera till uppdateringssidan med blogg id i url
  };

  return (
    <>
      <div className="main-container">
        <h1>Bloggar</h1>
        {loading || blogs.length==0 && <div className="loading">
        <p>Laddar data... </p>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWYzYzMxNTNqZTRsc3hzenIwcWZyZDdnOTh3ajNpMGdxZzNwNG45MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rIq2x7gddEDXL1Vg1X/giphy.gif" alt="loading" />
      </div>}
        <div className="blog-container">
          {blogs &&
            blogs.map((blog) => {
              const blogWithNames = {
                ...blog,
                authorName: blog.author,
                categoryName: blog.category,
              };

              return (
                <BlogList
                  key={blog._id}
                  blog={blogWithNames} // passera blog 
                  onDelete={() => handleDelete(blog._id)} // passera delete handler
                  onUpdate={handleUpdate} // passera update handler
                  loading={loading}
                  errorMessage={error}
                />
              );
            })}
        </div>
          {
            token && 
            <div className="btn-container">
              <button
                className="add-btn"
                onClick={() => navigate("/AddBlogPage")}
              >
                Skapa blogg
              </button>
            </div>
          }
      </div>
    </>
  );
};

export default BlogPage;
