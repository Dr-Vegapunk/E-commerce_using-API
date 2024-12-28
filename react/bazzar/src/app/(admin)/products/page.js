'use client'
import axios from 'axios'
import { useEffect, useState } from 'react';

import ProductForm from './productForm';
import ProductList from './productList';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get("https://api.escuelajs.co/api/v1/products"),
        axios.get("https://api.escuelajs.co/api/v1/categories")
      ]);
      setProducts(productsResponse.data.map(product => ({...product, status: ['InStock', 'OutOfStock', 'CommingSoon'][Math.floor(Math.random() * 3)]})));
      setCategories(categoriesResponse.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      setError(null);
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${item.id}`);
      await fetchData();
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error('Error deleting product:', err);
    }
  };

  const handleSubmit = async (values, id) => {
    try {
      setError(null);
      const productData = {
        ...values,
        categoryId: parseInt(values.categoryId)
      };
      if (id) {
        await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, productData);
      } else {
        await axios.post("https://api.escuelajs.co/api/v1/products/", productData);
      }
      await fetchData();
    } catch (err) {
      setError(`Failed to ${id ? 'update' : 'add'} product. Please try again.`);
      console.error(`Error ${id ? 'updating' : 'adding'} product:`, err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading products...</div>
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
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductForm type="Add" handleSubmit={handleSubmit} categories={categories} />
      </div>
      <ProductList
        products={products} 
        handleDelete={handleDelete} 
        handleSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  )
}

export default Products

