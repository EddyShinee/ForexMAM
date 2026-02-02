import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { AuthLayout } from '../components/layout/AuthLayout'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  // Nếu đã đăng nhập sẵn, chuyển thẳng sang dashboard HTML
  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard.html'
    }
  }, [user])

  if (user) return null

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email.trim()) newErrors.email = t('errors.required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t('errors.invalidEmail')
    if (!password) newErrors.password = t('errors.required')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)

    if (error) toast.error(t('errors.loginFailed'))
    else {
      toast.success(t('auth.loginSuccess'))
      // Sau khi đăng nhập thành công, chuyển sang dashboard HTML
      window.location.href = '/dashboard.html'
    }
  }

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{t('auth.welcomeBack')}</h2>
        <p className="text-text-secondary text-sm">{t('auth.secureAccess')}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-white text-xs font-semibold uppercase tracking-wider opacity-70">{t('auth.email')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-[20px]">mail</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              className={`w-full rounded-lg bg-background-dark/50 border text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-sm transition-all ${errors.email ? 'border-danger' : 'border-border-dark'}`}
            />
          </div>
          {errors.email && <p className="text-danger text-xs">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-white text-xs font-semibold uppercase tracking-wider opacity-70">{t('auth.password')}</label>
            <a href="#" className="text-[11px] font-semibold text-primary hover:text-primary-hover">{t('auth.forgotPassword')}</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-[20px]">lock</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordPlaceholder')}
              className={`w-full rounded-lg bg-background-dark/50 border text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-12 text-sm transition-all ${errors.password ? 'border-danger' : 'border-border-dark'}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-white">
              <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          {errors.password && <p className="text-danger text-xs">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold h-12 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(43,140,238,0.4)] hover:shadow-[0_6px_20px_rgba(43,140,238,0.6)]"
        >
          {loading ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : <span className="material-symbols-outlined text-[20px]">login</span>}
          <span>{t('auth.loginButton')}</span>
        </button>

        <div className="relative py-2 flex items-center">
          <div className="flex-grow border-t border-border-dark"></div>
          <span className="flex-shrink-0 mx-4 text-text-secondary text-[10px] uppercase font-bold tracking-widest opacity-60">{t('auth.orContinueWith')}</span>
          <div className="flex-grow border-t border-border-dark"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-2 h-11 bg-background-dark/30 border border-border-dark hover:bg-background-dark/60 text-white rounded-lg font-medium text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 h-11 bg-background-dark/30 border border-border-dark hover:bg-background-dark/60 text-white rounded-lg font-medium text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.684.816-1.813 1.508-2.932 1.498-.158-1.12.33-2.24 1.03-2.99.7-.75 1.93-1.54 3.08-1.58zm-5.708.19c1.666-.02 3.02 1.05 3.73 1.05.71 0 2.03-1.19 3.65-1.07 1.29.02 2.92.57 4.02 2.05-3.32 1.84-2.88 5.75.52 7.15-.71 1.83-1.7 3.6-2.95 3.59-1.15 0-1.54-.74-2.88-.74-1.34 0-1.8.72-2.9.72-1.2.02-2.18-1.74-2.97-2.97-1.48-2.31-1.32-5.9.03-7.92.74-1.11 1.98-1.77 2.76-1.86z"/></svg>
            Apple
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
