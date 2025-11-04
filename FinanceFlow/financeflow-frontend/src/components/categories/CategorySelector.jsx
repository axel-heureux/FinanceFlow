import React, { useState, useEffect } from 'react';

const CategorySelector = ({ selectedCategory, selectedSubcategory, onCategoryChange, onSubcategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // TODO: Fetch categories from API
    const fetchCategories = async () => {
      try {
        // const response = await api.getCategories();
        // setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // TODO: Fetch subcategories for selected category from API
      const fetchSubcategories = async () => {
        try {
          // const response = await api.getSubcategories(selectedCategory);
          // setSubcategories(response.data);
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