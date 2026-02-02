import { useTranslation } from 'react-i18next'

export function EmptyState() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 bg-surface-dark border border-border-dark rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-text-secondary text-4xl">checklist</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{t('dashboard.emptyTodos')}</h3>
      <p className="text-text-secondary max-w-sm">{t('dashboard.emptyTodosDescription')}</p>
    </div>
  )
}
