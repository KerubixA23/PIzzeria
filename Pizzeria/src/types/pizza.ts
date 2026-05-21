export interface CartItem {
  id: number | string
  nombre: string
  descripcion: string
  ingredientes: string[]
  precio: number
  imagen?: string
  personalizada?: boolean
}

export interface Pizza extends CartItem {
  id: number
  imagen: string
  personalizada?: false
}