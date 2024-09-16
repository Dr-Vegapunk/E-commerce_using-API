'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import CategoriesList from './categoriesList'
import CategoriesForm from './categoriesForm'



const Categories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/categories")
      setCategories(data)
    } catch (err) {
      setError('Failed to fetch categories. Please try again later.')
      console.error('Error fetching categories:', err)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async (item) => { 
    debugger;
    try {
      const {data}= await axios.delete(`https://api.escuelajs.co/api/v1/categories/${item.id}`)
      fetchData()
    } catch (err) {
      console.error('Error deleting category:', err)
    }
  }
  const handleSubmit = async (values, id) => {
    
      if (id) {
        const { data } = await axios.put(`https://api.escuelajs.co/api/v1/categories/${id}`, values)
        fetchData()
      } else {
        const { data } = await axios.post("https://api.escuelajs.co/api/v1/categories/", values)
        fetchData()
      }
  
  }


  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div size="xl">Loading categories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <CategoriesList categories={categories} handleDelete={handleDelete} handleSubmit={handleSubmit}/>
      <div>
        <CategoriesForm type={'Add'}  handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Categories