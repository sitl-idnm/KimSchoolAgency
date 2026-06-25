import Nav from '@/components/marketing/Nav'
import Hero from '@/components/marketing/Hero'
import Trust from '@/components/marketing/Trust'
import Problem from '@/components/marketing/Problem'
import WhyStarted from '@/components/marketing/WhyStarted'
import Methodology from '@/components/marketing/Methodology'
import Artifacts from '@/components/marketing/Artifacts'
import UseCases from '@/components/marketing/UseCases'
import Curriculum from '@/components/marketing/Curriculum'
import Pricing from '@/components/marketing/Pricing'
import Mentor from '@/components/marketing/Mentor'
import Timeline from '@/components/marketing/Timeline'
import Reviews from '@/components/marketing/Reviews'
import FAQ from '@/components/marketing/FAQ'
import CTA from '@/components/marketing/CTA'
import Footer from '@/components/marketing/Footer'
import RevealInit from '@/components/marketing/RevealInit'

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <Hero />
      <Trust />
      <Problem />
      <WhyStarted />
      <Methodology />
      <Artifacts />
      <UseCases />
      <Curriculum />
      <Pricing />
      <Mentor />
      <Timeline />
      <Reviews />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
