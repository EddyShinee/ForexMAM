import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/layout/Header'

export default function DashboardPage() {
  const { user } = useAuth()
  const [showSidebar, setShowSidebar] = useState(false)

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Trader'
  const plan = user?.user_metadata?.plan || user?.user_metadata?.account_type || 'Pro Plan'

  return (
    <div className="min-h-screen dashboard-bg text-white flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 relative">
        {/* Backdrop: mobile only, khi sidebar mở */}
        <button
          type="button"
          aria-label="Đóng menu"
          className={`md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity ${
            showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setShowSidebar(false)}
        />

        {/* Sidebar: bật/tắt; mobile = drawer, desktop = cột ẩn/hiện */}
        <aside
          className={`
            w-64 max-w-[85vw] bg-surface-dark border-r border-border-dark flex-shrink-0
            fixed md:relative inset-y-0 left-0 z-40
            flex flex-col
            transform transition-transform duration-200 ease-out md:transform-none
            ${showSidebar ? 'translate-x-0 md:flex' : '-translate-x-full md:hidden'}
          `}
        >
          <div className="p-4 md:p-6 flex items-center justify-between md:block border-b border-border-dark md:border-b-0">
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">candlestick_chart</span>
                FX Command
              </h1>
              <p className="text-text-secondary text-xs pl-8 hidden md:block">Multi-Account Manager</p>
            </div>
            <button
              type="button"
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-background-dark/50"
              aria-label="Đóng sidebar"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-4 py-2 flex-1 overflow-y-auto">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary text-white shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined filled">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-text-secondary hover:bg-background-dark/30 hover:text-white"
            >
              <span className="material-symbols-outlined">account_balance_wallet</span>
              <span className="text-sm font-medium">Accounts</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-text-secondary hover:bg-background-dark/30 hover:text-white"
            >
              <span className="material-symbols-outlined">show_chart</span>
              <span className="text-sm font-medium">Trading</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-text-secondary hover:bg-background-dark/30 hover:text-white"
            >
              <span className="material-symbols-outlined">analytics</span>
              <span className="text-sm font-medium">Statistics</span>
            </a>
            <div className="h-px bg-border-dark my-2" />
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-text-secondary hover:bg-background-dark/30 hover:text-white"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </nav>
          <div className="p-4 border-t border-border-dark mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-background-dark flex items-center justify-center text-xs font-bold flex-shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">{displayName}</span>
                <span className="text-xs text-text-secondary truncate">{plan}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar: nút toggle sidebar + stats */}
          <header className="bg-surface-dark/50 backdrop-blur-md border-b border-border-dark p-3 sm:p-4 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setShowSidebar((v) => !v)}
                className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark text-text-secondary hover:text-white hover:bg-background-dark/50 transition-colors"
                aria-label={showSidebar ? 'Đóng menu' : 'Mở menu'}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {showSidebar ? 'close' : 'menu'}
                </span>
              </button>
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                    Market Status
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                    </span>
                    <span className="text-white font-bold text-sm truncate">OPEN (London)</span>
                  </div>
                </div>
                <div className="h-6 w-px bg-border-dark hidden sm:block" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">
                    Server Time (UTC)
                  </span>
                  <span className="text-white font-mono text-sm">09:42:15</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 items-center bg-background-dark/50 px-3 py-2 rounded-lg border border-border-dark flex-shrink-0 overflow-x-auto">
              <div className="flex flex-col items-end min-w-0">
                <span className="text-xs text-text-secondary font-medium uppercase">Total Equity</span>
                <span className="text-white text-base sm:text-lg font-bold font-mono whitespace-nowrap">
                  $145,230.50
                </span>
              </div>
              <div className="flex flex-col items-end min-w-0">
                <span className="text-xs text-text-secondary font-medium uppercase">Daily P/L</span>
                <div className="flex items-center gap-1 text-success">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span className="font-bold font-mono text-xs sm:text-sm whitespace-nowrap">
                    +$3,240.00 (+2.4%)
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            <section className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h2 className="text-white text-lg font-bold">Multi-Account Overview</h2>
                <button
                  type="button"
                  className="text-primary text-sm font-medium hover:opacity-80 flex items-center gap-1 self-start sm:self-auto"
                >
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-surface-dark rounded-xl p-4 sm:p-5 border border-border-dark hover:border-primary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-xs">OANDA</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-bold">Main Aggressive</h3>
                        <p className="text-text-secondary text-xs">Oanda - 9382910</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-success/10 text-success text-xs font-bold border border-success/20 w-fit">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-text-secondary text-xs mb-1">Equity</p>
                      <p className="text-white text-lg sm:text-xl font-bold font-mono">$52,420.00</p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs mb-1">Balance</p>
                      <p className="text-white/90 text-base sm:text-lg font-medium font-mono">$51,180.00</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border-dark flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded bg-surface-dark hover:bg-background-dark text-white text-xs font-medium"
                    >
                      History
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-medium"
                    >
                      Manage
                    </button>
                  </div>
                </div>
                <div className="bg-surface-dark rounded-xl p-4 sm:p-5 border border-border-dark hover:border-primary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-xs">IC</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-bold">Swing Fund</h3>
                        <p className="text-text-secondary text-xs">IC Markets - 110255</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-success/10 text-success text-xs font-bold border border-success/20 w-fit">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-text-secondary text-xs mb-1">Equity</p>
                      <p className="text-white text-lg sm:text-xl font-bold font-mono">$93,230.50</p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-xs mb-1">Balance</p>
                      <p className="text-white/90 text-base sm:text-lg font-medium font-mono">$90,100.00</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border-dark flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded bg-surface-dark hover:bg-background-dark text-white text-xs font-medium"
                    >
                      History
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-medium"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-4">
                <div>
                  <h2 className="text-white text-lg font-bold">Active Trades</h2>
                  <p className="text-text-secondary text-sm">Real-time positions across all accounts</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 rounded border border-border-dark text-text-secondary hover:bg-surface-dark text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">filter_list</span>
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 text-xs font-medium"
                  >
                    Close All
                  </button>
                </div>
              </div>
              <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-background-dark/50 text-text-secondary uppercase text-xs font-semibold">
                      <tr>
                        <th className="px-4 sm:px-6 py-3">Symbol</th>
                        <th className="px-4 sm:px-6 py-3">Type</th>
                        <th className="px-4 sm:px-6 py-3 text-right">Volume</th>
                        <th className="px-4 sm:px-6 py-3 text-right hidden sm:table-cell">Entry</th>
                        <th className="px-4 sm:px-6 py-3 text-right hidden sm:table-cell">Current</th>
                        <th className="px-4 sm:px-6 py-3 text-right">Profit</th>
                        <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-dark text-white/90">
                      <tr className="hover:bg-background-dark/20">
                        <td className="px-4 sm:px-6 py-3 font-medium">EUR/USD</td>
                        <td className="px-4 sm:px-6 py-3"><span className="text-success font-bold">BUY</span></td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono">1.50</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono text-text-secondary hidden sm:table-cell">1.08450</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono hidden sm:table-cell">1.08750</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono font-bold text-success">+$450.00</td>
                        <td className="px-4 sm:px-6 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button type="button" className="text-text-secondary hover:text-primary p-1" aria-label="Edit">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button type="button" className="text-text-secondary hover:text-danger p-1" aria-label="Close">
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-background-dark/20">
                        <td className="px-4 sm:px-6 py-3 font-medium">GBP/JPY</td>
                        <td className="px-4 sm:px-6 py-3"><span className="text-danger font-bold">SELL</span></td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono">0.50</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono text-text-secondary hidden sm:table-cell">182.400</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono hidden sm:table-cell">182.600</td>
                        <td className="px-4 sm:px-6 py-3 text-right font-mono font-bold text-danger">-$120.00</td>
                        <td className="px-4 sm:px-6 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button type="button" className="text-text-secondary hover:text-primary p-1" aria-label="Edit">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button type="button" className="text-text-secondary hover:text-danger p-1" aria-label="Close">
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
