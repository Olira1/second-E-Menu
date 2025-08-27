import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { api } from '../services/api';

const MenuContext = createContext();

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedItem: null
};

function menuReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false, error: null };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload };
    default:
      return state;
  }
}

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const fetchItems = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.getMenuItems();
      if (response.success) {
        dispatch({ type: 'SET_ITEMS', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch items' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const addItem = useCallback(async (item) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.addMenuItem(item);
      if (response.success) {
        dispatch({ type: 'ADD_ITEM', payload: response.data });
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: true };
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add item' });
        return { success: false };
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false };
    }
  }, []);

  const updateItem = useCallback(async (id, item) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.updateMenuItem(id, item);
      if (response.success) {
        dispatch({ type: 'UPDATE_ITEM', payload: response.data });
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: true };
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update item' });
        return { success: false };
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false };
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.deleteMenuItem(id);
      if (response.success) {
        dispatch({ type: 'DELETE_ITEM', payload: id });
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: true };
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to delete item' });
        return { success: false };
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false };
    }
  }, []);

  const value = {
    ...state,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    setSelectedItem: (item) => dispatch({ type: 'SET_SELECTED_ITEM', payload: item })
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}