import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CategorySelector = ({ selectedCategory, selectedSubcategory, onCategoryChange, onSubcategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        if (response && response.data) setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await api.getSubcategories(selectedCategory);
          if (response && response.data) setSubcategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  return (
    <div className="mb-3">
      <div className="mb-3">
        <label className="form-label">Catégorie</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="mb-3">
          <label className="form-label">Sous-catégorie</label>
          <select
            value={selectedSubcategory}
            onChange={(e) => onSubcategoryChange(e.target.value)}
            className="form-select"
          >
            <option value="">Sélectionner une sous-catégorie</option>
            {subcategories.map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;