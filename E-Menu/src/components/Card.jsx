import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export function Card({ item, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/10">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => onToggleStatus(item.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
              item.status === 'active'
                ? 'bg-green-500/80 text-white'
                : 'bg-red-500/80 text-white'
            }`}
          >
            {item.status}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium">
              {item.category}
            </span>
          </div>
          <span className="text-xl font-bold text-white">
            ${item.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-end space-x-2">
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
      </div>
    </div>
  );
}