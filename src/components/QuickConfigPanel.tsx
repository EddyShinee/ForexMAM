import { useState } from 'react'

export function QuickConfigPanel() {
  const [defaultLot, setDefaultLot] = useState(0.1)
  const [riskPercent, setRiskPercent] = useState(1.0)
  const [oneClickTrading, setOneClickTrading] = useState(true)
  const [autoBreakeven, setAutoBreakeven] = useState(false)

  const adjustLot = (delta: number) => {
    setDefaultLot((current) => {
      const next = Math.max(0, Number((current + delta).toFixed(2)))
      return next
    })
  }

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-surface-dark/80 border border-border-dark rounded-xl md:rounded-none md:border-l md:border-border-dark/80 md:bg-surface-dark/90 flex flex-col">
      <div className="p-4 border-b border-border-dark/80">
        <h2 className="text-white font-bold text-base flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary">tune</span>
          <span>Quick Config</span>
        </h2>
      </div>

      <div className="p-4 flex flex-col gap-6 overflow-y-auto flex-1">
        {/* Trading defaults */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Trading Defaults
          </label>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/90">Default Lot Size</label>
            <div className="flex items-center rounded-lg bg-background-dark/80 border border-border-dark/80 p-1">
              <button
                type="button"
                onClick={() => adjustLot(-0.01)}
                className="w-8 h-8 flex items-center justify-center hover:bg-surface-dark rounded text-text-secondary"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <input
                className="bg-transparent border-none text-center w-full text-white font-mono focus:ring-0 focus:outline-none text-sm"
                type="number"
                step={0.01}
                min={0}
                value={defaultLot}
                onChange={(e) => setDefaultLot(Number(e.target.value))}
              />
              <button
                type="button"
                onClick={() => adjustLot(0.01)}
                className="w-8 h-8 flex items-center justify-center hover:bg-surface-dark rounded text-text-secondary"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/90">Risk % Per Trade</label>
            <div className="relative">
              <input
                className="w-full bg-background-dark/80 border border-border-dark/80 rounded-lg py-2 px-3 text-white font-mono text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
              />
              <span className="absolute right-3 top-2.5 text-text-secondary font-mono text-xs">%</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-border-dark/80" />

        {/* Execution toggles */}
        <div className="flex flex-col gap-4">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Execution
          </label>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/90">One-Click Trading</span>
            <button
              type="button"
              onClick={() => setOneClickTrading((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                oneClickTrading ? 'bg-primary' : 'bg-surface-dark'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  oneClickTrading ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/90">Auto Breakeven</span>
            <button
              type="button"
              onClick={() => setAutoBreakeven((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoBreakeven ? 'bg-primary' : 'bg-surface-dark'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  autoBreakeven ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="h-px bg-border-dark/80" />

        {/* System notice (dummy) */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
            <div>
              <p className="text-sm font-medium text-white">System Notice</p>
              <p className="text-xs text-text-secondary mt-1">
                NFP News Release in 30 minutes. High volatility expected.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border-dark/80">
        <button
          type="button"
          className="w-full py-2 bg-surface-dark hover:bg-background-dark text-white rounded-lg text-sm font-medium transition-colors border border-border-dark/80"
        >
          Reset to Default
        </button>
      </div>
    </aside>
  )
}

