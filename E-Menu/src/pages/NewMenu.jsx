import React, { useState } from 'react';
import { useMenuItems } from '../hooks/useMenuItems';
import { Modal } from '../components/Modal';
import { FormMenuItem } from '../components/FormMenuItem';
import { Plus, Utensils } from 'lucide-react';

export function NewMenu() {
  const { addItem, loading } = useMenuItems();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = async (item) => {
    const result = await addItem(item);
    if (result.success) {
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Add New Menu Item</h2>
        <p className="text-slate-400">
          Create a new item for your restaurant menu
        </p>
      </div>

      {/* Add Card */}
      <div className="max-w-md">
        <button
          onClick={() => setShowForm(true)}
          className="w-full h-80 bg-slate-800/50 backdrop-blur-sm border-2 border-dashed border-slate-600 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-blue-500 hover:bg-slate-700/50 transition-all duration-300 group"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Add New Item</h3>
            <p className="text-slate-400">Click to create a new menu item</p>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Utensils className="w-5 h-5 text-blue-400" />
          <span>Quick Tips</span>
        </h3>
        <div className="space-y-3 text-slate-300">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Use high-quality images for better presentation</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Write clear, appetizing descriptions</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Set competitive pricing for your market</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Organize items into appropriate categories</span>
          </div>
        </div>
      </div>

      {/* Add Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Menu Item"
      >
        <FormMenuItem
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
}