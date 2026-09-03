import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProblemSection } from './components/ProblemSection'
import { SystemReveal } from './components/SystemReveal'
import { FiltrationSection } from './components/FiltrationSection'
import { WaterJourney } from './components/WaterJourney'
import { TanklessSection } from './components/TanklessSection'
import { MineralizationSection } from './components/MineralizationSection'
import { LifestyleSection } from './components/LifestyleSection'
import { SpecsSection } from './components/SpecsSection'
import { TrustSection } from './components/TrustSection'
import { ReviewsSection } from './components/ReviewsSection'
import { OfferSection } from './components/OfferSection'
import { FaqSection } from './components/FaqSection'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { StickyAddToCart } from './components/StickyAddToCart'

export default function App() {
  useEffect(() => {
    // Videos and webfonts change section heights after first paint; one
    // refresh once the page has settled keeps every trigger honest.
    const onLoad = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        {/* Hero -> Problem -> Purification -> RO technology -> Why this
            system -> Product experience -> Proof -> Offer -> FAQ -> Close. */}
        <Hero />
        <ProblemSection />
        <SystemReveal />
        <FiltrationSection />
        <WaterJourney />
        <TanklessSection />
        <MineralizationSection />
        <LifestyleSection />
        <SpecsSection />
        <TrustSection />
        <ReviewsSection />
        <OfferSection />
        <FaqSection />
        <FinalCTA />
      </main>

      <Footer />
      <StickyAddToCart />
    </>
  )
}
