import React from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';

export function Table({ items, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50 border-b border-slate-600">
            <tr>
              <th className="text-left p-6 text-slate-300 font-semibold">Item</th>
              <th className="text-left p-6 text-slate-300 font-semibold">Category</th>
              <th className="text-left p-6 text-slate-300 font-semibold">Price</th>
              <th className="text-left p-6 text-slate-300 font-semibold">Status</th>
              <th className="text-center p-6 text-slate-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
              >
                <td className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-slate-400 mt-1 max-w-xs truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </td>
                <td className="p-6">
                  <span className="text-white font-semibold text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </td>
                <td className="p-6">
                  <button
                    onClick={() => onToggleStatus(item.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      item.status === 'active'
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="p-6">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Edit item"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}