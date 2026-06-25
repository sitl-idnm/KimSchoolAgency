'use client'
/* Где применяется ИИ — по standoff §PLATFORMS: outline cards с иконкой */
const cases = [
  { short:'📚', name:'Учёба',               desc:'Объяснить тему, сделать конспект, подготовиться к контрольной — без списывания' },
  { short:'🔬', name:'Исследования',        desc:'Структура проекта, поиск источников, проверка фактов и подготовка к защите' },
  { short:'🎨', name:'Творчество',          desc:'Идеи, тексты, сценарии, изображения — ИИ как соавтор, а не замена' },
  { short:'🧭', name:'Профориентация',      desc:'Карта интересов, навыки будущего, разбор профессий — с живым наставником' },
]

export default function UseCases() {
  return (
    <section id="применение" style={{ maxWidth:1440, margin:'0 auto', padding:'104px clamp(20px,4vw,64px) 0' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
        <span style={{ fontSize:15 }}>✳</span> Где применяет ИИ
      </span>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:24, marginBottom:44 }}>
        <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,44px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:0, maxWidth:620 }}>
          Практика с первого занятия — в реальных задачах
        </h2>
        <p style={{ font:"400 18px/1.6 'Manrope'", color:'#52555b', margin:0, maxWidth:420 }}>
          Ребёнок работает с задачами, которые у него уже есть — домашние, творческие, личные.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
        {cases.map(c => (
          <div key={c.name}
            style={{ border:'1.5px solid #ededed', borderRadius:20, padding:'32px 28px', minHeight:190, display:'flex', flexDirection:'column', justifyContent:'space-between', gap:20, transition:'border-color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='#CB172C')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='#ededed')}
          >
            <span style={{ display:'inline-flex', width:44, height:44, borderRadius:11, background:'linear-gradient(-72deg,#CB172C,#E52D43)', alignItems:'center', justifyContent:'center', fontSize:22 }}>
              {c.short}
            </span>
            <div>
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:21, letterSpacing:'-0.4px', color:'#16181B', marginBottom:8 }}>{c.name}</div>
              <div style={{ font:"400 15px/1.5 'Manrope'", color:'#7a7d83' }}>{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
