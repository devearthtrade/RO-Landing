import { useEffect, useState } from 'react'

/** Subscribes to a media query, so layout branches stay in sync with CSS. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Matches the `--bp-md` breakpoint used throughout the stylesheets. */
export const useIsDesktop = () => useMediaQuery('(min-width: 900px)')
