import { useEffect } from 'react';
import { useMenu } from '../context/MenuContext';

export function useMenuItems() {
  const {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    selectedItem,
    setSelectedItem
  } = useMenu();

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      fetchItems();
    }
  }, [fetchItems, items.length, loading, error]);

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    addItem,
    updateItem,
    deleteItem,
    selectedItem,
    setSelectedItem
  };
}