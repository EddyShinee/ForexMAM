export interface Todo {
  id: string
  user_id: string
  task: string
  completed: boolean
  created_at: string
}

export type TodoInsert = Omit<Todo, 'id' | 'created_at'>
export type TodoUpdate = Partial<Pick<Todo, 'task' | 'completed'>>
