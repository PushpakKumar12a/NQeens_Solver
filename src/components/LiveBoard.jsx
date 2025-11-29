import { FaChessQueen } from 'react-icons/fa'

const LiveBoard = ({ celebrate, completed, running, validN, board }) => {
  const iconSize = Math.max(12, Math.min(28, Math.floor(180 / validN)))
  return (
    <section className={`rounded-2xl p-5 sm:p-6 ${celebrate ? 'bg-emerald-900/30 border-emerald-400/60 ring-2 ring-emerald-400' : 'bg-white/5 border border-white/10'}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-300">N = {validN}</div>
      </div>
      <div className="mx-auto select-none w-full max-w-[520px] relative">
        <div
          className="grid gap-[2px] bg-slate-700/40 p-[2px] rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${validN}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: validN }).map((_, r) => (
            Array.from({ length: validN }).map((_, c) => {
              const isDark = (r + c) % 2 === 1
              const isQ = board[r] === c
              return (
                <div key={`${r}-${c}`} className={`${isDark ? 'bg-slate-700' : 'bg-slate-300'} relative aspect-square rounded-[4px] flex items-center justify-center`}>
                  {isQ && (
                    <FaChessQueen className={`${isDark ? 'text-yellow-300' : 'text-yellow-700'}`} size={iconSize} />
                  )}
                </div>
              )
            })
          ))}
        </div>
        {completed && !running && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="rounded-xl px-4 py-2 border border-emerald-400/70 bg-emerald-900/50 text-emerald-200 text-2xl font-semibold tracking-wide">
              DONE
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LiveBoard
