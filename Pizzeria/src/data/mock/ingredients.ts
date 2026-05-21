import type { Ingredient, IngredientCategory } from '../../types/ingredient'

export const ingredients: Ingredient[] = [
  { id: 1, nombre: 'Salsa de tomate', categoria: 'base', precio: 0 },
  { id: 2, nombre: 'Salsa BBQ', categoria: 'base', precio: 1.5 },
  { id: 3, nombre: 'Salsa blanca', categoria: 'base', precio: 1.5 },

  { id: 4, nombre: 'Mozzarella', categoria: 'quesos', precio: 2 },
  { id: 5, nombre: 'Parmesano', categoria: 'quesos', precio: 2.5 },
  { id: 6, nombre: 'Gorgonzola', categoria: 'quesos', precio: 3 },
  { id: 7, nombre: 'Provolone', categoria: 'quesos', precio: 2.5 },

  { id: 8, nombre: 'Pepperoni', categoria: 'carnes', precio: 3 },
  { id: 9, nombre: 'Jamón', categoria: 'carnes', precio: 2.5 },
  { id: 10, nombre: 'Salchicha', categoria: 'carnes', precio: 3 },
  { id: 11, nombre: 'Pollo', categoria: 'carnes', precio: 3.5 },
  { id: 12, nombre: 'Carne molida', categoria: 'carnes', precio: 3.5 },

  { id: 13, nombre: 'Champiñones', categoria: 'vegetales', precio: 2 },
  { id: 14, nombre: 'Pimientos', categoria: 'vegetales', precio: 1.5 },
  { id: 15, nombre: 'Cebolla', categoria: 'vegetales', precio: 1 },
  { id: 16, nombre: 'Aceitunas', categoria: 'vegetales', precio: 2 },
  { id: 17, nombre: 'Tomate', categoria: 'vegetales', precio: 1.5 },
  { id: 18, nombre: 'Piña', categoria: 'vegetales', precio: 2 },

  { id: 19, nombre: 'Albahaca', categoria: 'extras', precio: 1 },
  { id: 20, nombre: 'Orégano', categoria: 'extras', precio: 0.5 },
  { id: 21, nombre: 'Aceite de oliva', categoria: 'extras', precio: 1 },
]

export const categoryOrder: IngredientCategory[] = [
  'base',
  'quesos',
  'carnes',
  'vegetales',
  'extras',
]

export const categoryLabels: Record<IngredientCategory, string> = {
  base: 'Base',
  quesos: 'Quesos',
  carnes: 'Carnes',
  vegetales: 'Vegetales',
  extras: 'Extras',
}