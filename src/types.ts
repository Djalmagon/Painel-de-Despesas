export type Categoria = 'Alimentos' | 'Transporte' | 'Lazer' | 'Saúde' | 'Outros'

export interface Despesa {
  id: string
  titulo: string
  valor: number
  categoria: Categoria
}
