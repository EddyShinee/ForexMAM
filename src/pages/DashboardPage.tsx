import { useState, useEffect, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/layout/Header'
import { TodoItem } from '../components/TodoItem'
import { EmptyState } from '../components/EmptyState'
import { QuickConfigPanel } from '../components/QuickConfigPanel'
import { fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodoCompleted } from '../services/todoService'
import type { Todo } from '../types/todo'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [todos, setTodos] = useState<Todo[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [showQuickConfig, setShowQuickConfig] = useState(false)

  const loadTodos = async (showLoader = true) => {
    if (!user) return
    if (showLoader) setLoading(true)
    else setRefreshing(true)

    const { data, error } = await fetchTodos(user.id)
    if (error) toast.error(t('errors.networkError'))
    else setTodos(data || [])

    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => { loadTodos() }, [user])

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault()
    if (!newTask.trim() || !user) return

    setSubmitting(true)
    const { data, error } = await addTodo(newTask.trim(), user.id)
    setSubmitting(false)

    if (error) toast.error(t('todo.addFailed'))
    else if (data) {
      setTodos([data, ...todos])
      setNewTask('')
      toast.success(t('todo.addSuccess'))
    }
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)))
    const { error } = await toggleTodoCompleted(id, completed)
    if (error) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)))
      toast.error(t('todo.updateFailed'))
    }
  }

  const handleUpdateTodo = async (id: string, task: string) => {
    const originalTodo = todos.find((todo) => todo.id === id)
    if (!originalTodo) return

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task } : todo)))
    const { error } = await updateTodo(id, { task })
    if (error) {
      setTodos(todos.map((todo) => (todo.id === id ? originalTodo : todo)))
      toast.error(t('todo.updateFailed'))
    } else toast.success(t('todo.updateSuccess'))
  }

  const handleDeleteTodo = async (id: string) => {
    const originalTodos = [...todos]
    setTodos(todos.filter((todo) => todo.id !== id))
    const { error } = await deleteTodo(id)
    if (error) {
      setTodos(originalTodos)
      toast.error(t('todo.deleteFailed'))
    } else toast.success(t('todo.deleteSuccess'))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="min-h-screen dashboard-bg text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col md:flex-row gap-6">
        {/* Left: Todo content */}
        <section className="flex-1 max-w-3xl mx-auto md:mx-0">
          <div className="bg-surface-dark/50 backdrop-blur-sm border border-border-dark rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                  {t('dashboard.todoList')}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">{completedCount}</span>
                  <span className="text-text-secondary">
                    / {todos.length} {t('dashboard.completedTasks')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuickConfig((v) => !v)}
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-text-secondary hover:text-white bg-background-dark/40 border border-border-dark rounded-lg hover:border-primary/50"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>{showQuickConfig ? 'Hide Quick Config' : 'Show Quick Config'}</span>
                </button>
                <button
                  onClick={() => loadTodos(false)}
                  disabled={refreshing}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-white bg-background-dark/30 border border-border-dark rounded-lg hover:border-primary/50 disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-[18px] ${refreshing ? 'animate-spin' : ''}`}>
                    refresh
                  </span>
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddTodo} className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-text-secondary text-[20px]">add_task</span>
                </div>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder={t('dashboard.todoPlaceholder')}
                  className="w-full h-12 pl-11 pr-4 text-white bg-surface-dark border border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary placeholder-text-secondary/50"
                />
              </div>
              <button
                type="submit"
                disabled={!newTask.trim() || submitting}
                className="h-12 px-4 sm:px-6 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-2 shadow-[0_4px_14px_rgba(43,140,238,0.4)]"
              >
                {submitting ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[20px]">add</span>
                )}
                <span className="hidden sm:inline">{t('dashboard.addTodo')}</span>
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <span className="material-symbols-outlined text-primary text-4xl animate-spin">
                  progress_activity
                </span>
              </div>
            ) : todos.length === 0 ? (
              <EmptyState />
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </div>
        </section>

        {/* Right: Quick Config (module riêng, có thể bật/tắt) */}
        {showQuickConfig && (
          <div className="w-full md:w-auto">
            <QuickConfigPanel />
          </div>
        )}
      </main>
    </div>
  )
}
