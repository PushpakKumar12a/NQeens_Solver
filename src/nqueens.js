export function solveNQueens(n) {
  const solutions = [];
  const cols = new Set();
  const diag1 = new Set(); // r - c
  const diag2 = new Set(); // r + c
  const placement = Array(n).fill(-1); // placement[row] = col

  function backtrack(row) {
    if (row === n) {
      solutions.push([...placement]);
      return;
    }
    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;
      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      placement[row] = col;
      backtrack(row + 1);
      placement[row] = -1;
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  if (Number.isInteger(n) && n > 0) backtrack(0);
  return solutions;
}
