import Nav         from '@/components/marketing/Nav'
import Hero        from '@/components/marketing/Hero'
import Intro       from '@/components/marketing/Intro'
import Advantages  from '@/components/marketing/Advantages'
import Stats       from '@/components/marketing/Stats'
import UseCases    from '@/components/marketing/UseCases'
import Curriculum  from '@/components/marketing/Curriculum'
import Includes    from '@/components/marketing/Includes'
import Pricing     from '@/components/marketing/Pricing'
import Mentor      from '@/components/marketing/Mentor'
import Reviews     from '@/components/marketing/Reviews'
import Timeline    from '@/components/marketing/Timeline'
import FAQ         from '@/components/marketing/FAQ'
import CTA         from '@/components/marketing/CTA'
import Footer      from '@/components/marketing/Footer'
import RevealInit  from '@/components/marketing/RevealInit'

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      {/* Отступ под sticky nav */}
      <div style={{ paddingTop: 72 }}>
        <Hero />
        <Intro />
        <Advantages />
        <Stats />
        <UseCases />
        <Curriculum />
        <Includes />
        <Pricing />
        <Mentor />
        <Reviews />
        <Timeline />
        <FAQ />
        <CTA />
        {/* SEO-абзац */}
        <section style={{ background:'#FAFAFA' }}>
          <div style={{ maxWidth:1000, margin:'0 auto', padding:'88px var(--sp)' }}>
            <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:26, letterSpacing:'-0.5px', color:'#16181B', margin:'0 0 24px' }}>
              KIM AI School — школа AI-мышления для подростков
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {[
                'Мы не учим пользоваться ChatGPT — мы учим думать в среде, где ИИ уже везде. Подросток должен понимать, почему нейросеть ошибается, как ставить задачу, как проверять результат и как защищать свои данные.',
                'Каждое занятие проходит онлайн с живым наставником — не в записи, не по скриптам. Практика с первого урока: ребёнок работает с реальными задачами, которые у него уже есть в школе и жизни.',
                'Программа рассчитана на подростков 12–17 лет без опыта работы с нейросетями. После курса ребёнок создаёт собственный AI-проект и защищает его перед наставником. Родитель получает подробный отчёт и карту навыков.',
              ].map((t,i) => (
                <p key={i} style={{ font:"400 16px/1.7 'Manrope'", color:'#6c6f75', margin:0 }}>{t}</p>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}
