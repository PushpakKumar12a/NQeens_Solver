import { FaChessQueen } from 'react-icons/fa'

const SavedSolutions = ({ solutions, current, setCurrent, validN }) => {
  const iconSize = Math.max(12, Math.min(28, Math.floor(180 / validN)))
  return (
    <section className="space-y-4">
      <div className='heading'>
        <h2 className="text-2xl font-bold">Saved Solutions</h2>
      </div>
      {solutions.length === 0 ? (
        <div className="text-center text-slate-400">No saved solutions yet.</div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-sm text-slate-300">Solution {current + 1} of {solutions.length}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrent((c) => (c - 1 + solutions.length) % solutions.length)} className="rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-700 px-3 py-1.5 text-sm">Prev</button>
              <button onClick={() => setCurrent((c) => (c + 1) % solutions.length)} className="rounded-md bg-slate-700 hover:bg-slate-600 active:bg-slate-700 px-3 py-1.5 text-sm">Next</button>
            </div>
          </div>
          <div className="mx-auto select-none w-full max-w-[520px]">
            <div key={`${validN}-${current}`} className="grid gap-[2px] bg-slate-700/40 p-[2px] rounded-lg overflow-hidden" style={{ gridTemplateColumns: `repeat(${validN}, minmax(0, 1fr))` }}>
              {Array.from({ length: validN }).map((_, r) => (
                Array.from({ length: validN }).map((_, c) => {
                  const isDark = (r + c) % 2 === 1
                  const isQ = solutions[current][r] === c
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
          </div>
        </div>
      )}
    </section>
  )
}

export default SavedSolutions
