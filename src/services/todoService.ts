import { supabase } from './supabaseClient'
import type { Todo, TodoInsert, TodoUpdate } from '../types/todo'

export async function fetchTodos(userId: string) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data: data as Todo[] | null, error }
}

export async function addTodo(task: string, userId: string) {
  const newTodo: TodoInsert = {
    task,
    user_id: userId,
    completed: false,
  }

  const { data, error } = await supabase
    .from('todos')
    .insert(newTodo)
    .select()
    .single()

  return { data: data as Todo | null, error }
}

export async function updateTodo(todoId: string, updates: TodoUpdate) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', todoId)
    .select()
    .single()

  return { data: data as Todo | null, error }
}

export async function deleteTodo(todoId: string) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)

  return { error }
}

export async function toggleTodoCompleted(todoId: string, completed: boolean) {
  return updateTodo(todoId, { completed })
}
