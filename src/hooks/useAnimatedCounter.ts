import { useEffect, useState } from 'react'

export function useAnimatedCounter(target: number, trigger: boolean, duration = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return

    const start = performance.now()

    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setValue(target * ease)
      if (p < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [trigger, target, duration])

  return value
}
