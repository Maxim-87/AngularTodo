export interface Todo {
  id: string,
  title: string,
  addedDate: string,
  order: number,
}

export type FilterType = 'all' | 'active' | 'completed'


export interface DomainTodo extends Todo {
  filter: FilterType,
}
