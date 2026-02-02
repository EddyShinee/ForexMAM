import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onUpdate: (id: string, task: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.task)

  const handleSubmitEdit = (e?: FormEvent) => {
    e?.preventDefault()
    const trimmedValue = editValue.trim()
    if (trimmedValue && trimmedValue !== todo.task) {
      onUpdate(todo.id, trimmedValue)
    } else {
      setEditValue(todo.task)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmitEdit()
    else if (e.key === 'Escape') {
      setEditValue(todo.task)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm(t('todo.deleteConfirm'))) {
      onDelete(todo.id)
    }
  }

  return (
    <div className={`group flex items-center gap-3 p-4 bg-surface-dark border rounded-xl transition-all hover:border-primary/30 ${
      todo.completed ? 'border-success/30 bg-success/5' : 'border-border-dark'
    }`}>
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          todo.completed ? 'bg-success border-success text-white' : 'border-border-dark hover:border-primary'
        }`}
      >
        {todo.completed && <span className="material-symbols-outlined text-[16px]">check</span>}
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmitEdit} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-3 py-1.5 text-white bg-background-dark border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button type="submit" className="p-2 text-white bg-primary hover:bg-primary-hover rounded-lg">
            <span className="material-symbols-outlined text-[18px]">check</span>
          </button>
          <button type="button" onClick={() => { setEditValue(todo.task); setIsEditing(false) }} className="p-2 text-text-secondary hover:text-white bg-surface-dark border border-border-dark rounded-lg">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </form>
      ) : (
        <>
          <span className={`flex-1 break-words ${todo.completed ? 'line-through text-text-secondary' : 'text-white'}`}>
            {todo.task}
          </span>
          <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setIsEditing(true)} className="p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-primary/10" title={t('common.edit')}>
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button onClick={handleDelete} className="p-2 text-text-secondary hover:text-danger rounded-lg hover:bg-danger/10" title={t('common.delete')}>
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
