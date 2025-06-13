import React from 'react'

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => 
  {
  return (
    <div className="category-selector">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategorySelector
