import React from "react";
import { HandleCategory } from "../types/category.types";
import "./CategoryList.css";

interface CategoryTableProps {
  categories: HandleCategory;  // Now expecting a single category instead of an array
  onDelete: (id: string) => void;
  onUpdate: (category: HandleCategory) => void;
}

const CategoryList: React.FC<CategoryTableProps> = ({ categories, onDelete, onUpdate }) => {
  return (
    <div className="card-container">
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="category-name">{categories.name}</h3>
        </div>
        <div className="category-card-body">
          <p className="category-description">{categories.description}</p>
        </div>
        <div className="category-card-actions">
          <button className="update-btn" onClick={() => onUpdate(categories)}>
            Uppdatera
          </button>
          <button className="delete-btn" onClick={() => onDelete(categories._id)}>
            Radera
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;