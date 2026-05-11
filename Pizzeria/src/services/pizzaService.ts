import ingredientes from '../data/ingredientes.json'

export interface Ingrediente {
  id: number
  nombre: string
  precio: number
  categoria: string
}

export interface Pizza {
  id?: string
  ingredientesSeleccionados: Ingrediente[]
  precioBase: number
  precioTotal: number
}

const PRECIO_BASE = 8.00

export function calcularPrecioTotal(ingredientesSeleccionados: Ingrediente[]): number {
  const precioIngredientes = ingredientesSeleccionados.reduce((total, ingrediente) => {
    return total + ingrediente.precio
  }, 0)
  
  return PRECIO_BASE + precioIngredientes
}

export function obtenerIngredientes(): Ingrediente[] {
  return ingredientes
}

export function obtenerIngredientesPorCategoria(categoria: string): Ingrediente[] {
  return ingredientes.filter(ing => ing.categoria === categoria)
}

export function crearPizza(ingredientesSeleccionados: Ingrediente[]): Pizza {
  return {
    id: Date.now().toString(),
    ingredientesSeleccionados,
    precioBase: PRECIO_BASE,
    precioTotal: calcularPrecioTotal(ingredientesSeleccionados)
  }
}
