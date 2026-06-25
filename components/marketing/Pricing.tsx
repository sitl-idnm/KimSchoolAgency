/* Цены — по standoff §PRICE: тёмный закруглённый баннер, адаптирован для 3 планов */
'use client'

const plans = [
  {
    name:'Стартовый', sessions:'4 занятия',
    desc:'Базовая AI-грамотность и первый результат',
    features:['Вводная диагностика','Как работает ИИ','Запросы и промпты','ИИ для учёбы','Личная prompt-карта','Отчёт родителю'],
    cta:'Записаться', highlight:false,
  },
  {
    name:'Полный', sessions:'8 занятий',
    desc:'Полный навык + собственный AI-проект с защитой',
    features:['Всё из стартового','Проверка фактов и источников','Презентации с ИИ','Творческие задачи','Безопасность и этика','Финальный AI-проект','Карта навыков + отчёт'],
    cta:'Записаться', highlight:true,
  },
  {
    name:'Личный', sessions:'По запросу',
    desc:'Индивидуальная траектория под конкретного ребёнка',
    features:['Диагностика + личная карта','Гибкий темп и расписание','Наставничество 1-на-1','Глубокий разбор интересов','Полный отчёт + рекомендации'],
    cta:'Обсудить', highlight:false,
  },
]

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:2 }}>
    <path d="M5 13l4 4L19 7" stroke="#E52D43" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

type Plan = typeof plans[number]

function PlanCard({ p, onPick }: { p: Plan; onPick: () => void }) {
  return (
    <div style={{
      background: p.highlight ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
      border: p.highlight ? '1.5px solid rgba(229,45,67,.4)' : '1.5px solid rgba(255,255,255,.08)',
      borderRadius:20, padding:'32px 28px', display:'flex', flexDirection:'column',
      position:'relative', height:'100%',
    }}>
      {p.highlight && (
        <div style={{ position:'absolute', top:-13, left:28, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"700 10px/1 'Inter Tight'", letterSpacing:.8, textTransform:'uppercase', padding:'4px 12px', borderRadius:20 }}>
          Популярный
        </div>
      )}
      <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:400, fontSize:28, letterSpacing:'-0.5px', color:'#fff', marginBottom:6 }}>{p.name}</div>
      <div style={{ font:"700 40px/1 'Inter Tight'", letterSpacing:'-1px', color:'#fff', marginBottom:4 }}>{p.sessions}</div>
      <div style={{ font:"400 14px/1.5 'Manrope'", color:'rgba(255,255,255,.45)', marginBottom:24 }}>{p.desc}</div>
      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.12) 50%,transparent)', marginBottom:24 }} />
      <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:10, flex:1, marginBottom:28 }}>
        {p.features.map(f => (
          <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, font:"400 14px/1.45 'Manrope'", color:'rgba(255,255,255,.7)' }}>
            <Check />{f}
          </li>
        ))}
      </ul>
      <button onClick={onPick} style={{
        width:'100%', padding:15, borderRadius:10, border:'none', cursor:'pointer',
        background: p.highlight ? 'linear-gradient(-72deg,#CB172C,#E52D43)' : 'rgba(255,255,255,.08)',
        color: p.highlight ? '#fff' : 'rgba(255,255,255,.8)',
        font:"600 16px/1 'Inter Tight'", transition:'filter .2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.filter='brightness(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.filter='brightness(1)')}
      >{p.cta}</button>
    </div>
  )
}

export default function Pricing() {
  const go = () => document.getElementById('записаться')?.scrollIntoView({ behavior:'smooth' })

  return (
    <section id="цены" style={{ maxWidth:1440, margin:'0 auto', padding:'104px var(--sp) 0' }}>
      <div style={{ background:'linear-gradient(110deg,#16181B 0%,#241a1c 100%)', borderRadius:28, padding:'clamp(28px,5vw,72px)' }}>
        <div style={{ marginBottom:52 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#E52D43', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
            <span style={{ fontSize:15 }}>✳</span> Стоимость
          </span>
          <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.6vw,46px)', lineHeight:1.1, letterSpacing:'-1.2px', color:'#fff', margin:'0 0 14px' }}>
            Выберите формат
          </h2>
          <p style={{ font:"400 18px/1.6 'Manrope'", color:'rgba(255,255,255,0.6)', margin:0, maxWidth:480 }}>
            Начните с бесплатной диагностики — подберём программу под уровень и интересы ребёнка.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="pricing-cards" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {plans.map(p => <PlanCard key={p.name} p={p} onPick={go} />)}
        </div>

        {/* Mobile carousel */}
        <div className="pricing-carousel carousel-wrap">
          {plans.map(p => (
            <div key={p.name} className="carousel-item">
              <PlanCard p={p} onPick={go} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
