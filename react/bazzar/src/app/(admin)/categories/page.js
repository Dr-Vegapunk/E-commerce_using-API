'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import CategoriesList from './categoriesList'
import CategoriesForm from './categoriesForm'
import ProductForm from '../products/productForm'



const Categories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/categories");
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories. Please try again later.');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      setError(null);
      await axios.delete(`https://api.escuelajs.co/api/v1/categories/${item.id}`);
      await fetchData();
    } catch (err) {
      setError('Failed to delete category. Please try again.');
      console.error('Error deleting category:', err);
    }
  };

  const handleSubmit = async (values, id) => {
    try {
      setError(null);
      if (id) {
        await axios.put(`https://api.escuelajs.co/api/v1/categories/${id}`, values);
      } else {
        await axios.post("https://api.escuelajs.co/api/v1/categories/", values);
      }
      await fetchData();
    } catch (err) {
      setError(`Failed to ${id ? 'update' : 'add'} category. Please try again.`);
      console.error(`Error ${id ? 'updating' : 'adding'} category:`, err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading categories...</div>
      </div>
    );
  }


  return (
    <div className="p-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoriesForm type="Add" handleSubmit={handleSubmit} />
      </div>
      <CategoriesList 
        categories={categories} 
        handleDelete={handleDelete} 
        handleSubmit={handleSubmit}
      />
      <ProductForm 
      categories={categories}
      />
      
    </div>
  )
}

export default Categories