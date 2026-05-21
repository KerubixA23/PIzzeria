export type IngredientCategory =
  | 'base'
  | 'quesos'
  | 'carnes'
  | 'vegetales'
  | 'extras'

export interface Ingredient {
  id: number
  nombre: string
  categoria: IngredientCategory
  precio: number
}