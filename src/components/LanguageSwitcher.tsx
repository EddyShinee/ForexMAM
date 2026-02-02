import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('i18nextLng', code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-surface-dark/50 border border-border-dark rounded-lg hover:bg-surface-dark hover:border-primary/50 transition-all"
      >
        <span className="material-symbols-outlined text-text-secondary text-[18px]">language</span>
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.label}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-surface-dark border border-border-dark rounded-lg shadow-xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm ${
                i18n.language === lang.code ? 'bg-primary/10 text-primary' : 'text-white hover:bg-background-dark/50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
