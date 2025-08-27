import React, { useState, useEffect } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { FormMenuItem } from '../components/FormMenuItem';
import { ArrowLeft, Search } from 'lucide-react';

export function EditMenu() {
  const { items, updateItem, loading } = useMenuItems();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdate = async (updatedItem) => {
    if (selectedItem) {
      const result = await updateItem(selectedItem.id, updatedItem);
      if (result.success) {
        setSelectedItem(null);
      }
    }
  };

  if (selectedItem) {
    return (
      <div className="space-y-6 p-4">
        {/* Back Button */}
        <button
          onClick={() => setSelectedItem(null)}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to item list</span>
        </button>

        {/* Edit Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">Edit Menu Item</h2>
            <p className="text-slate-400 mt-1">Update the details for "{selectedItem.name}"</p>
          </div>
          <FormMenuItem
            item={selectedItem}
            onSubmit={handleUpdate}
            onCancel={() => setSelectedItem(null)}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Edit Menu Items</h2>
        <p className="text-slate-400">
          Select an item to edit its details
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">
            {searchQuery ? 'No items found matching your search.' : 'No menu items available to edit.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:scale-105 hover:border-blue-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/10 text-left group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    item.status === 'active'
                      ? 'bg-green-500/80 text-white'
                      : 'bg-red-500/80 text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {item.name}
                    </h3>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}