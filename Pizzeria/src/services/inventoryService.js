import productos from '../data/productos.json';

export const inventoryService = {
  getIngredientes() {
    return productos.ingredientes;
  },

  getIngredientesPorCategoria() {
    const ingredientes = productos.ingredientes;
    return {
      base: ingredientes.filter(i => i.categoria === 'base'),
      quesos: ingredientes.filter(i => i.categoria === 'quesos'),
      carnes: ingredientes.filter(i => i.categoria === 'carnes'),
      vegetales: ingredientes.filter(i => i.categoria === 'vegetales'),
      extras: ingredientes.filter(i => i.categoria === 'extras')
    };
  },

  getIngrediente(id) {
    return productos.ingredientes.find(i => i.id === id);
  },

  getCategories() {
    return ['base', 'quesos', 'carnes', 'vegetales', 'extras'];
  },

  getCategoryLabel(categoria) {
    const labels = {
      base: 'Base',
      quesos: 'Quesos',
      carnes: 'Carnes',
      vegetales: 'Vegetales',
      extras: 'Extras'
    };
    return labels[categoria] || categoria;
  }
};
