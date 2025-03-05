import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCategories, createCategory, deleteCategory } from '../services/categoryService';
import Modal from './Modal';

export default function CategoryList() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '#000000',
    limit: ''
  });

  useEffect(() => {
    getCategories(auth).then(setCategories);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(auth, formData);
      const updatedCategories = await getCategories(auth);
      setCategories(updatedCategories);
      setShowNewForm(false);
      setFormData({ name: '', color: '#000000', limit: '' });
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(auth, categoryId);
        setCategories(categories.filter(cat => cat.id !== categoryId));
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  useEffect(() => {
    getCategories(auth).then(categories => {
      // Modifier des couleurs pour 
      const updatedCategories = categories.map(category => {
        switch (category.name) {
          case 'Food':
            return { ...category, color: '#991900' }; // Nouvelle couleur pour Food
          case 'Transport':
            return { ...category, color: '#00660F' }; // Nouvelle couleur pour Transport
          case 'Bills':
            return { ...category, color: '#002BF5' }; // Nouvelle couleur pour Bills
          case 'Entertainment':
            return { ...category, color: '#990092' }; // Nouvelle couleur pour Entertainment
          case 'Shopping':
            return { ...category, color: '#993000' }; // Nouvelle couleur pour Shopping
          default:
            return category;
        }
      });
      setCategories(updatedCategories);
    });
  }, [auth]);

  return (
    <div aria-label='category-list' className="category-list">
      <h2>Categories</h2>
      <button className="fab-button" onClick={() => setShowNewForm(true)}>+</button>
      
      <div aria-label='categories' className="categories">
        {categories.map(category => (
          <div key={category.id} className="category-item" style={{ backgroundColor: category.color }}>
            <div aria-label='category-content' className="category-content">
              <div aria-label='category-name' className="category-name">{category.name}</div>
              {category.limit && <div className="category-limit">Limit: ${category.limit}</div>}
            </div>
            <button 
              className="delete-button"
              onClick={() => handleDelete(category.id)}
              aria-label={`Delete ${category.name} category`}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showNewForm}
        onClose={() => setShowNewForm(false)}
        title="New Category"
      >
        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="color"
            value={formData.color}
            onChange={e => setFormData({...formData, color: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Monthly Limit (optional)"
            value={formData.limit}
            onChange={e => setFormData({...formData, limit: e.target.value})}
          />
          <button type="submit">Create Category</button>
        </form>
      </Modal>
    </div>
  );
}
