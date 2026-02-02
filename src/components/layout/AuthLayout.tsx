import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../LanguageSwitcher'

export function AuthLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className="auth-bg min-h-screen w-full flex items-center justify-center text-white font-display p-4">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-[480px] flex flex-col items-center">
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-3xl">candlestick_chart</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Forex<span className="text-primary">MAM</span>
            </h1>
            <p className="text-text-secondary text-sm mt-1">Professional Multi-Account Management</p>
          </div>
        </div>

        <div className="w-full bg-surface-dark/50 backdrop-blur-sm border border-border-dark p-6 sm:p-8 rounded-2xl shadow-2xl">
          <div className="w-full mb-8">
            <div className="flex border-b border-border-dark">
              <Link to="/login" className="flex-1 pb-4 pt-2 text-center relative">
                <span className={`font-semibold text-sm ${isLoginPage ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>
                  {t('auth.loginTitle')}
                </span>
                {isLoginPage && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_-2px_8px_rgba(43,140,238,0.5)]"></div>}
              </Link>
              <Link to="/register" className="flex-1 pb-4 pt-2 text-center relative">
                <span className={`font-semibold text-sm ${!isLoginPage ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>
                  {t('auth.registerTitle')}
                </span>
                {!isLoginPage && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_-2px_8px_rgba(43,140,238,0.5)]"></div>}
              </Link>
            </div>
          </div>
          {children}
        </div>

        <div className="mt-8 text-center">
          <p className="text-text-secondary text-[13px]">
            {t('auth.termsText')}{' '}
            <a href="#" className="text-white hover:text-primary underline">{t('auth.terms')}</a>
            {' '}{t('common.and')}{' '}
            <a href="#" className="text-white hover:text-primary underline">{t('auth.privacy')}</a>
          </p>
          <p className="mt-6 text-[11px] text-text-secondary/50 font-bold uppercase tracking-[2px]">
            © {new Date().getFullYear()} ForexMAM Inc.
          </p>
        </div>
      </div>
    </div>
  )
}
