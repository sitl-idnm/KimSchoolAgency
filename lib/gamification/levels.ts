// Level curve for KIM AI School gamification.
// Cumulative XP to COMPLETE level n = 100 * n*(n+1)/2 = 50*n*(n+1).
// So the XP needed to *reach* level L is threshold(L-1); level 1 starts at 0 XP.

export function xpThreshold(level: number): number {
  if (level <= 0) return 0
  return 50 * level * (level + 1)
}

/** Current level for a given cumulative XP (level 1 = 0 XP). */
export function levelFromXp(xp: number): number {
  let level = 1
  while (xp >= xpThreshold(level)) level++
  return level
}

export type LevelInfo = {
  level: number
  /** XP into the current level. */
  intoLevel: number
  /** XP span of the current level. */
  levelSpan: number
  /** 0..1 progress through the current level. */
  progress: number
  /** XP remaining to next level. */
  toNext: number
}

export function levelInfo(xp: number): LevelInfo {
  const level = levelFromXp(xp)
  const base = xpThreshold(level - 1)
  const next = xpThreshold(level)
  const intoLevel = xp - base
  const levelSpan = next - base
  return {
    level,
    intoLevel,
    levelSpan,
    progress: levelSpan > 0 ? intoLevel / levelSpan : 0,
    toNext: Math.max(0, next - xp),
  }
}
