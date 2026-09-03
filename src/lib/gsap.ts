import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger recalculates on resize, which on mobile fires every time the
 * browser chrome collapses. Ignoring pure height changes keeps pinned sections
 * from jumping as the address bar hides.
 */
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
