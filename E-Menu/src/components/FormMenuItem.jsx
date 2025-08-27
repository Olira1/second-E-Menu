import React, { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'

const categories = ['Main Course','Breakfast', 'Lunch', 'Fast Food']

export function FormMenuItem({ item, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    description: '',
    price: '',
    image: '',
    status: 'active',
  })

  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'Main Course',
        description: item.description || '',
        price: item.price?.toString() || '',
        image: item.image || '',
        status: item.status || 'active',
      })
      setImagePreview(item.image || '')
    }
  }, [item])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value,
    }))
  }

  const handleImageChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, image: value }))
    setImagePreview(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: parseFloat(formData.price) || 0,
    })
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview and URL */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            Item Image
          </label>
          {imagePreview && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setImagePreview('')}
              />
            </div>
          )}
          <div className="relative">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
              placeholder="Enter image URL (e.g., https://...)"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Item Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter item name"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-slate-800">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Enter item description"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Price ($) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0.00"
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-3">
          <label
            htmlFor="status"
            className="text-sm font-medium text-slate-300"
          >
            Status
          </label>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: prev.status === 'active' ? 'inactive' : 'active',
              }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              formData.status === 'active' ? 'bg-green-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-slate-400">
            {formData.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  )
}
