// Yandex.Metrika helper.
// Counter id lives in NEXT_PUBLIC_YM_COUNTER_ID (public, safe to expose).

export const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_COUNTER_ID

type YmFn = (id: number | string, action: string, ...args: unknown[]) => void

declare global {
  interface Window {
    ym?: YmFn
  }
}

/** Fire a Metrika goal. Goals are wired up incrementally as features ship. */
export function ymGoal(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.ym || !YM_COUNTER_ID) return
  window.ym(YM_COUNTER_ID, 'reachGoal', name, params)
}

/** Register a virtual page view (SPA route change). */
export function ymHit(url: string) {
  if (typeof window === 'undefined' || !window.ym || !YM_COUNTER_ID) return
  window.ym(YM_COUNTER_ID, 'hit', url)
}
