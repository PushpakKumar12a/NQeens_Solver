const Controls = ({ n, validN, error, setN, speedMs, setSpeedMs, running, onStart, onTogglePause, paused, onReset }) => {
  return (
    <section className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/20">
      <form className="grid gap-4 sm:grid-cols-3 items-end" onSubmit={(e) => { e.preventDefault(); if (!running && !error) onStart(); }}>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Board size (N)</label>
          <p className="text-xs text-slate-400 mb-2">Valid range: 1–12</p>
          <input
            type="text"
            min={1}
            max={12}
            value={n}
            onChange={e => setN(e.target.value)}
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/60"
          />
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Speed (ms)</label>
          <input
            type="range"
            min={60}
            max={800}
            value={speedMs}
            onChange={e => setSpeedMs(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-slate-400 mt-1">{speedMs} ms</div>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={running || !!error} className={`flex-1 rounded-lg px-4 py-2 font-medium ${(running || error) ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'}`}>Start</button>
          <button type="button" onClick={onTogglePause} className="flex-1 rounded-lg px-4 py-2 font-medium bg-slate-700 hover:bg-slate-600">{paused ? 'Resume' : 'Pause'}</button>
          <button type="button" onClick={onReset} className="flex-1 rounded-lg px-4 py-2 font-medium bg-rose-600 hover:bg-rose-500">Reset</button>
        </div>
      </form>
    </section>
  )
}

export default Controls
