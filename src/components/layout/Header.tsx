import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

export function Header() {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    toast.success(t('auth.logoutSuccess'))
  }

  return (
    <header className="bg-surface-dark/50 backdrop-blur-md border-b border-border-dark sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-xl">candlestick_chart</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Forex<span className="text-primary">MAM</span></h1>
              {user?.email && <p className="text-xs text-text-secondary truncate max-w-[180px]">{user.email}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-danger bg-surface-dark/50 border border-border-dark rounded-lg hover:border-danger/50 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden sm:inline">{t('auth.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
