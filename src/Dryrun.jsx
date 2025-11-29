import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import Controls from './components/Controls.jsx'
import LiveBoard from './components/LiveBoard.jsx'
import SavedSolutions from './components/SavedSolutions.jsx'

const Dryrun = () => {
  const [n, setN] = useState(6);
  const [speedMs, setSpeedMs] = useState(300);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);
  const speedRef = useRef(300);
  const [solutionCount, setSolutionCount] = useState(0);
  const [board, setBoard] = useState([]); // board[r] = c or -1
  
  const [solutions, setSolutions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const runTokenRef = useRef(0);

  // Ensure completion/celebration are cleared on initial mount
  useEffect(() => {
    setCompleted(false);
    setCelebrate(false);
  }, []);

  // Read N from URL only once on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hn = Number(params.get("n"));
    if (Number.isFinite(hn)) {
      setN(hn);
    }
  }, []);

  // When N changes, reset the board and related run state
  useEffect(() => {
    setBoard(Array.from({ length: n }, () => -1));
    setSolutionCount(0);
    setRunning(false);
    runningRef.current = false;
    setSolutions([]);
    setCurrent(0);
    setCompleted(false);
  }, [n]);

  // Do not auto-start: require user to click Start so
  // the page opens clean without results by default.

  useEffect(() => {
    speedRef.current = speedMs;
  }, [speedMs]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const validN = useMemo(() => {
    const x = Number(n);
    if (!Number.isFinite(x)) return 4;
    const intX = Math.max(1, Math.min(12, Math.floor(x)));
    return intX;
  }, [n]);

  async function startDryrun() {
    setSolutionCount(0);
    setRunning(true);
    runningRef.current = true;
    setPaused(false);
    pausedRef.current = false;
    setCompleted(false);
    const myToken = ++runTokenRef.current;
    await backtrack(
      0,
      Array.from({ length: validN }, () => -1),
      new Set(),
      new Set(),
      new Set(),
      myToken
    );
    // Only set completed if not cancelled/reset mid-run
    if (runningRef.current && myToken === runTokenRef.current) {
      setRunning(false);
      runningRef.current = false;
      setCompleted(true);
    } else {
      setRunning(false);
      setCompleted(false);
    }
  }

  function resetDryrun() {
    // stop any ongoing run
    runningRef.current = false;
    setRunning(false);
    pausedRef.current = false;
    setPaused(false);
    // invalidate current run to stop any in-flight recursion
    runTokenRef.current++;
    // clear all state
    setBoard(Array.from({ length: validN }, () => -1));
    
    setSolutionCount(0);
    setSolutions([]);
    setCurrent(0);
    setCompleted(false);
    setCelebrate(false);
  }

  async function backtrack(row, b, cols, d1, d2, token) {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    if (!runningRef.current || token !== runTokenRef.current) return;
    // pause loop: wait until resumed
    while (pausedRef.current) {
      await sleep(50);
      if (!runningRef.current || token !== runTokenRef.current) return;
    }
    if (row === validN) {
      // highlight and pause to celebrate a found solution
      if (!runningRef.current || token !== runTokenRef.current) return;
      setCelebrate(true);
      setSolutionCount((c) => c + 1);
      setSolutions((prev) => {
        const next = [...prev, [...b]];
        setCurrent(next.length - 1);
        return next;
      });
      await sleep(900);
      if (!runningRef.current || token !== runTokenRef.current) return;
      // If paused while celebrating, hold the border until resume
      while (pausedRef.current) {
        await sleep(50);
        if (!runningRef.current || token !== runTokenRef.current) return;
      }
      setCelebrate(false);
      // if at root call, after finishing all branches we'll mark completed in startDryrun
      return;
    }
    for (let col = 0; col < validN; col++) {
      if (!runningRef.current || token !== runTokenRef.current) return;
      while (pausedRef.current) {
        await sleep(50);
        if (!runningRef.current || token !== runTokenRef.current) return;
      }
      const md = row - col;
      const ad = row + col;
      const safe = !cols.has(col) && !d1.has(md) && !d2.has(ad);
      if (safe) {
        b[row] = col;
        cols.add(col);
        d1.add(md);
        d2.add(ad);
        if (!runningRef.current || token !== runTokenRef.current) return;
        setBoard([...b]);
        // setVisited({ cols: new Set(cols), d1: new Set(d1), d2: new Set(d2) });
        await sleep(speedRef.current);
        while (pausedRef.current) {
          await sleep(50);
          if (!runningRef.current || token !== runTokenRef.current) return;
        }
        await backtrack(row + 1, b, cols, d1, d2, token);
        cols.delete(col);
        d1.delete(md);
        d2.delete(ad);
        b[row] = -1;
        if (!runningRef.current || token !== runTokenRef.current) return;
        setBoard([...b]);
        // setVisited({ cols: new Set(cols), d1: new Set(d1), d2: new Set(d2) });
        await sleep(speedRef.current);
        while (pausedRef.current) {
          await sleep(50);
          if (!runningRef.current || token !== runTokenRef.current) return;
        }
      } else {
        // visualize rejection
        if (!runningRef.current || token !== runTokenRef.current) return;
        setBoard((prev) => [...prev]);
        await sleep(Math.max(60, speedRef.current / 2));
        while (pausedRef.current) {
          await sleep(50);
          if (!runningRef.current || token !== runTokenRef.current) return;
        }
      }
      if (!runningRef.current || token !== runTokenRef.current) return;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            N-Queens Dry Run
          </h1>
          <Link
            to="/"
            className="rounded-md bg-slate-700 hover:bg-slate-600 px-3 py-1.5 text-sm"
          >
            Back to Solver
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Controls
          validN={validN}
          n={n}
          setN={setN}
          speedMs={speedMs}
          setSpeedMs={setSpeedMs}
          running={running}
          onStart={startDryrun}
          onTogglePause={() => { const next = !pausedRef.current; pausedRef.current = next; setPaused(next); }}
          paused={paused}
          onReset={resetDryrun}
        />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="mb-4 text-sm text-slate-300">Solutions found: {solutionCount}</div>
          <LiveBoard celebrate={celebrate} completed={completed} running={running} validN={validN} board={board} />
        </div>

        <SavedSolutions solutions={solutions} current={current} setCurrent={setCurrent} validN={validN} />
      </main>
    </div>
  );
};

export default Dryrun;
