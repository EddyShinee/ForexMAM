import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center auth-bg px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-danger/10 border border-danger/20 rounded-full mb-6">
          <span className="material-symbols-outlined text-danger text-4xl">error</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">{t('notFound.title')}</h2>
        <p className="text-text-secondary mb-8">{t('notFound.description')}</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-[0_4px_14px_rgba(43,140,238,0.4)]">
          <span className="material-symbols-outlined text-[20px]">home</span>
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  )
}
