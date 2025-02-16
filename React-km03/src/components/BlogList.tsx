import React, { useState } from "react";
import { HandleBlog } from "../types/blog.types"; // Importera HandleBlog-typen
import './BlogList.css'
import moment from "moment";

interface BlogListProps {
  blog: HandleBlog; // Acceptera en blogg som en prop
  onDelete: () => void; // Funktion för att hantera borttagning
  onUpdate: (blog: HandleBlog) => void; // Funktion för att hantera uppdatering
  loading: boolean;
  errorMessage: string | null
}

const BlogList: React.FC<BlogListProps> = ({ blog, onDelete, onUpdate, loading, errorMessage }) => {
  const token = localStorage.getItem("token");
  const [isReadMore, setIsReadMore] = useState(true);

  return (
    <div className="blog-card">
  {loading && <div className="loading">Laddar...</div>}
  {errorMessage && <div className="error">Error: {errorMessage}</div>}
  <h3>{blog.title}</h3>
  <div className="meta-info">
    <span>Författare: {blog.author?.username ?? "Unknown"}</span> | 
    <span> Kategori: {blog.category.name}</span> | 
    <span> skapad: {moment(blog.createdAt).format('YYYY-MM-DD HH:MM')}</span>
  </div>
  <p>{isReadMore ? blog.content.slice(0, 150) : blog.content}
  {blog.content.length > 150 && <span className="readMore-btn" onClick={()=> setIsReadMore(!isReadMore)}>
      {isReadMore ? '...Läs mer' : '...Läs mindre'}
    </span>}
    </p>
  {
    token &&
  <div className="blog-actions">
    <button className="update-btn" onClick={() => onUpdate(blog)}>Uppdatera</button>
    <button className="delete-btn" onClick={onDelete}>Radera</button>
  </div>
  }
</div>
  );
};

export default BlogList;