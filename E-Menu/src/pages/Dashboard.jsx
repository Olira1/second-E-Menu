import React, { useState } from 'react'
import { useMenuItems } from '../hooks/useMenuItems'
import { Table } from '../components/Table'
import { Card } from '../components/Card'
import { Modal } from '../components/Modal'
import { FormMenuItem } from '../components/FormMenuItem'
import { Grid, List, Plus, Search } from 'lucide-react'

export function Dashboard() {
  const { items, loading, error, updateItem, deleteItem } = useMenuItems()
  const [viewMode, setViewMode] = useState('table') // 'table' or 'cards'
  const [editingItem, setEditingItem] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const handleEdit = (item) => {
    setEditingItem(item)
  }

  const handleUpdate = async (updatedItem) => {
    const result = await updateItem(editingItem.id, updatedItem)
    if (result.success) {
      setEditingItem(null)
    }
  }

  const handleDelete = (itemId) => {
    setShowDeleteConfirm(itemId)
  }

  const confirmDelete = async () => {
    if (showDeleteConfirm) {
      await deleteItem(showDeleteConfirm)
      setShowDeleteConfirm(null)
    }
  }

  const handleToggleStatus = async (itemId) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      await updateItem(itemId, {
        ...item,
        status: item.status === 'active' ? 'inactive' : 'active',
      })
    }
  }

  // Categories from items (dynamic)
  const categories = ['All','Main Course', 'Breakfast', 'Lunch', 'Fast Food']

  // Filtered items by category & search
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading menu items...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading menu items: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Menu Items</h2>
          <p className="text-slate-400">
            {filteredItems.length} items •{' '}
            {filteredItems.filter((item) => item.status === 'active').length}{' '}
            active
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 🔎 Search + Categories */}
      <div className="flex flex-col items-center space-y-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-6 text-lg font-semibold">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-slate-400 hover:text-white'
              } pb-1`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No menu items found
          </h3>
          <p className="text-slate-400 mb-6">
            Try adjusting your search or add a new item
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg">
            Add First Item
          </button>
        </div>
      ) : (
        <>
          {/* ✅ Table View */}
          {viewMode === 'table' && (
            <Table
              items={filteredItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {/* ✅ Cards View */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Menu Item"
      >
        {editingItem && (
          <FormMenuItem
            item={editingItem}
            onSubmit={handleUpdate}
            onCancel={() => setEditingItem(null)}
            loading={loading}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Confirm Deletion"
      >
        <div className="p-6">
          <p className="text-slate-300 mb-6">
            Are you sure you want to delete this menu item? This action cannot
            be undone.
          </p>
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
            >
              Delete Item
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
