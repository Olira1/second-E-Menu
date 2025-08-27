// Mock API Service - Ready to be replaced with real backend calls

// Mock data for menu items
const mockMenuItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    category: 'Fast Food',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    price: 24.99,
    image:
      'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    category: 'Fast Food',
    description: 'Fresh romaine lettuce with caesar dressing',
    price: 12.99,
    image:
      'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    category: 'Fast Food',
    description: 'Rich chocolate cake with ganache',
    price: 8.99,
    image:
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Beef Burger',
    category: 'Main Course',
    description: 'Juicy beef patty with fresh vegetables',
    price: 16.99,
    image:
      'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
  {
    id: 5,
    name: 'Margherita Pizza',
    category: 'Main Course',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 18.99,
    image:
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
  {
    id: 6,
    name: 'Margherita Pizza',
    category: 'Lunch',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 18.99,
    image:
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
  {
    id: 7,
    name: 'Margherita Pizza',
    category: 'Breakfast',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 18.99,
    image:
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
  {
    id: 8,
    name: 'Margherita Pizza',
    category: 'Breakfast',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 18.99,
    image:
      'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
  },
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let nextId = mockMenuItems.length + 1;
let menuItems = [...mockMenuItems];

export const api = {
  // Get all menu items
  async getMenuItems() {
    await delay(300); // Simulate network delay
    return { success: true, data: [...menuItems] };
  },

  // Add new menu item
  async addMenuItem(item) {
    await delay(500);
    const newItem = {
      ...item,
      id: nextId++,
      status: item.status || 'active'
    };
    menuItems.push(newItem);
    return { success: true, data: newItem };
  },

  // Update existing menu item
  async updateMenuItem(id, updatedItem) {
    await delay(500);
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) {
      return { success: false, error: 'Item not found' };
    }
    menuItems[index] = { ...menuItems[index], ...updatedItem };
    return { success: true, data: menuItems[index] };
  },

  // Delete menu item
  async deleteMenuItem(id) {
    await delay(300);
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) {
      return { success: false, error: 'Item not found' };
    }
    const deletedItem = menuItems.splice(index, 1)[0];
    return { success: true, data: deletedItem };
  },

  // Get single menu item by ID
  async getMenuItem(id) {
    await delay(200);
    const item = menuItems.find(item => item.id === id);
    if (!item) {
      return { success: false, error: 'Item not found' };
    }
    return { success: true, data: item };
  }
};