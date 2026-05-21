import type { Pizza } from '../../types/pizza'

export const pizzas: Pizza[] = [
  {
    id: 1,
    nombre: 'Pizza Pepperoni',
    descripcion: 'Pizza clásica con queso mozzarella y pepperoni.',
    ingredientes: ['Queso mozzarella', 'Salsa de tomate', 'Pepperoni'],
    precio: 85,
    imagen:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    nombre: 'Pizza Hawaiana',
    descripcion: 'Pizza con jamón y piña.',
    ingredientes: ['Jamón', 'Piña', 'Queso mozzarella'],
    precio: 90,
    imagen:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    nombre: 'Pizza Suprema',
    descripcion: 'Pizza con carnes y vegetales.',
    ingredientes: ['Pepperoni', 'Cebolla', 'Chile', 'Aceitunas'],
    precio: 110,
    imagen:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    nombre: 'Cuatro Quesos',
    descripcion: 'Mezcla cremosa de quesos con sabor intenso.',
    ingredientes: ['Mozzarella', 'Parmesano', 'Gorgonzola', 'Provolone'],
    precio: 95,
    imagen:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=80',
  },
]