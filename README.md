# N-Queens Problem

The **N-Queens problem** is a classic puzzle in computer science and mathematics:

> Place **N queens** on an **N × N chessboard** so that **no two queens attack each other**.

That means:

- No two queens share the **same row**
- No two queens share the **same column**
- No two queens share the **same diagonal**

---

## Formal Definition

Given an integer **N ≥ 1**, find all ways to place N queens on an N×N chessboard such that:

- For any two queens at positions (r₁, c₁) and (r₂, c₂):

  - r₁ ≠ r₂  (different rows)  
  - c₁ ≠ c₂  (different columns)  
  - |r₁ − r₂| ≠ |c₁ − c₂| (different diagonals)

A **solution** is one complete placement of N queens satisfying these constraints.

---

## Existence of Solutions

- N = 1 → 1 solution  
- N = 2 and N = 3 → **no** solutions  
- N ≥ 4 → at least one solution exists

For each valid N, the number of distinct solutions grows quickly as N increases.

---

## Common Algorithm: Backtracking

A standard way to solve N-Queens is **backtracking**:

1. Place **one queen per row**.
2. For the current row, try each column:
   - If placing a queen there does not conflict with existing queens, place it and move to the next row.
3. If no column works in a row, **backtrack**: remove the previous queen and try a different column.
4. Repeat until:
   - A full placement of N queens is found (one solution), or  
   - All possibilities have been tried (all solutions).

To check safety efficiently, we track:

- Used columns: `cols[col]`
- Main diagonals (r − c): `diag1[r - c]`
- Anti-diagonals (r + c): `diag2[r + c]`

These structures allow **O(1)** conflict checking.

---

## Time Complexity

- In the worst case, backtracking explores a large portion of the search space.
- The problem is **exponential** in N; there is no known polynomial-time algorithm for listing all solutions.
- Pruning using columns and diagonals makes it feasible for **moderate N** on modern hardware.

---

## Applications

Even though N-Queens is a puzzle, it’s widely used for:

- Teaching **backtracking** and **constraint satisfaction**
- Studying **search algorithms** and **pruning techniques**
- Benchmarking **optimization**, **heuristics**, and **AI search** methods

---