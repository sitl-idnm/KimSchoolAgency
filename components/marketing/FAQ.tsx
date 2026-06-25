'use client'
import { useState } from 'react'

/* FAQ — точно по standoff §FAQ: sticky heading left + accordion right */
const faqs = [
  { q:'Какой возраст подходит для курса?',             a:'Курс рассчитан на школьников 12–17 лет. Если ребёнок активно использует смартфон и интересуется технологиями — самое время.' },
  { q:'Нужен ли опыт с нейросетями?',                 a:'Нет. Мы начинаем с нуля: объясняем, как работает ИИ, прежде чем переходить к практике.' },
  { q:'Как проходят занятия?',                        a:'Онлайн, 1–2 раза в неделю, 60 минут. Живой наставник + экран ребёнка. Никаких записанных видео без обратной связи.' },
  { q:'Что получит родитель?',                        a:'После каждого занятия — короткий отчёт: что разобрали, что получилось, что повторить. В конце — полная карта навыков ребёнка.' },
  { q:'Чем отличается стартовый пакет от полного?',   a:'Стартовый (4 занятия) даёт базу — понять ИИ, научиться промптам, применить для учёбы. Полный (8 занятий) добавляет проекты, творчество, безопасность и собственный AI-проект с защитой.' },
  { q:'Как оплатить?',                                a:'Картой через ЮKassa (все карты РФ, СБП, ЮMoney) или Stripe (международные). После диагностики пришлём ссылку на оплату.' },
  { q:'Можно ли вернуть деньги?',                     a:'Да. Если после первого занятия вам не понравилось — возвращаем 100% без вопросов.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number>(-1)

  return (
    <section id="faq" style={{ maxWidth:1440, margin:'0 auto', padding:'104px var(--sp) 0' }}>
      <div className="faq-grid" style={{ display:'grid', gridTemplateColumns:'0.7fr 1.3fr', gap:64, alignItems:'start' }}>

        {/* Sticky heading */}
        <div className="faq-sticky" style={{ position:'sticky', top:120 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
            <span style={{ fontSize:15 }}>✳</span> FAQ
          </span>
          <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,44px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:0 }}>
            Часто задаваемые вопросы
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((fq, i) => (
            <div key={i} style={{ borderTop:'1px solid #ededed' }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:24, padding:'28px 0', textAlign:'left' }}
              >
                <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:'clamp(19px,2vw,23px)', letterSpacing:'-0.3px', color:'#16181B' }}>{fq.q}</span>
                <span style={{
                  flexShrink:0, width:36, height:36, borderRadius:'50%', border:'1.5px solid #e2e2e2',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:22, color:'#CB172C', lineHeight:1,
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition:'transform .3s ease',
                }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? 400 : 0, overflow:'hidden', transition:'max-height .35s ease' }}>
                <p style={{ font:"400 17px/1.65 'Manrope'", color:'#5c5f65', margin:0, padding:'0 0 28px', maxWidth:680 }}>{fq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
