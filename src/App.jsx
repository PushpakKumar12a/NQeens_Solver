import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { solveNQueens } from './nqueens'
import { FaChessQueen } from 'react-icons/fa'

const App = () => {
  const [n, setN] = useState(4)
  const [solutions, setSolutions] = useState([])
  const [current, setCurrent] = useState(0)
  const [error, setError] = useState('')

  const validN = useMemo(() => {
    const x = Number(n)
    if (!Number.isFinite(x)) return 0
    const intX = Math.floor(x)
    if (intX < 1 || intX > 12) {
      setError(intX < 1 ? 'N must be at least 1' : 'N must be at most 12')
    } else {
      setError('')
    }
    return Math.max(1, Math.min(12, intX))
  }, [n])

  function handleSolve() {
    if (error) return
    const res = solveNQueens(validN)
    setSolutions(res)
    setCurrent(0)
  }

  function nextSolution() {
    if (solutions.length === 0) return
    setCurrent((c) => (c + 1) % solutions.length)
  }

  function prevSolution() {
    if (solutions.length === 0) return
    setCurrent((c) => (c - 1 + solutions.length) % solutions.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 overflow-x-hidden">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">N-Queens Solver</h1>
          <a href="https://en.wikipedia.org/wiki/Eight_queens_puzzle" target="_blank" className="text-slate-300 hover:text-white text-sm">What is this?</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <form
              className="flex-1"
              onSubmit={(e) => {
                e.preventDefault()
                handleSolve()
              }}
            >
              <label className="block text-sm text-slate-300 mb-1">Board size (N)</label>
              <p className="text-xs text-slate-400 mb-2">Valid range: 1–12</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <input
                  type="text"
                  min={1}
                  max={12}
                  value={n}
                  onChange={e => setN(e.target.value)}
                  className="w-full sm:w-28 rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400"
                />
                <button
                  type="submit"
                  disabled={!!error}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${error ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'}`}
                >
                  Solve
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400">{error}</p>
              )}
            </form>

            <div className="grid auto-cols-fr grid-flow-col gap-3 text-center">
              <div className="rounded-lg bg-slate-900/60 border border-white/10 px-4 py-2">
                <div className="text-xs text-slate-400">N</div>
                <div className="text-lg font-semibold">{validN}</div>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-white/10 px-4 py-2">
                <div className="text-xs text-slate-400">Solutions</div>
                <div className="text-lg font-semibold">{solutions.length}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          {solutions.length === 0 ? (
            <div className="text-center text-slate-400">Enter N and press Solve to view solutions.</div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-sm text-slate-300">Solution {current + 1} of {solutions.length}</div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dryrun?n=${validN}`}
                    className="hidden sm:inline-block rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-3 py-1.5 text-sm text-white"
                  >Dry Run</Link>
                  <button
                    onClick={prevSolution}
                    className="rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-700 px-3 py-1.5 text-sm"
                  >Prev</button>
                  <button
                    onClick={nextSolution}
                    className="rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-700 px-3 py-1.5 text-sm"
                  >Next</button>
                </div>
              </div>

              {/* Mobile-only full-width Dry Run button spanning the card width */}
              <Link
                to={`/dryrun?n=${validN}`}
                className="sm:hidden block w-full rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-3 py-2 text-sm text-white text-center mb-4"
              >Dry Run</Link>

              <div className="mx-auto select-none w-full max-w-[520px]">
                <div
                  key={`${validN}-${current}`}
                  className="grid gap-[2px] bg-slate-700/40 p-[2px] rounded-lg overflow-hidden"
                  style={{ gridTemplateColumns: `repeat(${validN}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: validN }).map((_, r) => (
                    Array.from({ length: validN }).map((_, c) => {
                      const isDark = (r + c) % 2 === 1
                      const isQ = solutions[current][r] === c
                      const iconSize = Math.max(12, Math.min(28, Math.floor(180 / validN)))
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`${isDark ? 'bg-slate-700' : 'bg-slate-300'} relative aspect-square rounded-[4px] flex items-center justify-center`}
                        >
                          {isQ && (
                            <FaChessQueen className={`${isDark ? 'text-yellow-300' : 'text-yellow-700'}`} size={iconSize} />
                          )}
                        </div>
                      )
                    })
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App