import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { AuthLayout } from '../components/layout/AuthLayout'

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})

  if (user) return <Navigate to="/dashboard" replace />

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {}
    if (!email.trim()) newErrors.email = t('errors.required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t('errors.invalidEmail')
    if (!password) newErrors.password = t('errors.required')
    else if (password.length < 6) newErrors.password = t('errors.passwordTooShort')
    if (!confirmPassword) newErrors.confirmPassword = t('errors.required')
    else if (password !== confirmPassword) newErrors.confirmPassword = t('errors.passwordMismatch')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const { error, needsConfirmation } = await signUp(email, password)
    setLoading(false)

    if (error) toast.error(t('errors.registerFailed'))
    else if (needsConfirmation) {
      toast.success(t('auth.checkEmail'), { duration: 6000 })
      navigate('/login')
    } else {
      toast.success(t('auth.registerSuccess'))
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{t('auth.createAccount')}</h2>
        <p className="text-text-secondary text-sm">{t('auth.startTrading')}</p>
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
          <label className="text-white text-xs font-semibold uppercase tracking-wider opacity-70">{t('auth.password')}</label>
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

        <div className="flex flex-col gap-2">
          <label className="text-white text-xs font-semibold uppercase tracking-wider opacity-70">{t('auth.confirmPassword')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-[20px]">shield</span>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              className={`w-full rounded-lg bg-background-dark/50 border text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-11 pr-4 text-sm transition-all ${errors.confirmPassword ? 'border-danger' : 'border-border-dark'}`}
            />
          </div>
          {errors.confirmPassword && <p className="text-danger text-xs">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold h-12 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(43,140,238,0.4)] hover:shadow-[0_6px_20px_rgba(43,140,238,0.6)]"
        >
          {loading ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : <span className="material-symbols-outlined text-[20px]">person_add</span>}
          <span>{t('auth.registerButton')}</span>
        </button>
      </form>
    </AuthLayout>
  )
}
