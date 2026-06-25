'use client'

const BookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const PenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)
const CompassIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
)

/* Где применяется ИИ — по standoff §PLATFORMS: outline cards с иконкой */
const cases = [
  { Icon: BookIcon,    name:'Учёба',          desc:'Объяснить тему, сделать конспект, подготовиться к контрольной — без списывания' },
  { Icon: SearchIcon,  name:'Исследования',   desc:'Структура проекта, поиск источников, проверка фактов и подготовка к защите' },
  { Icon: PenIcon,     name:'Творчество',     desc:'Идеи, тексты, сценарии, изображения — ИИ как соавтор, а не замена' },
  { Icon: CompassIcon, name:'Профориентация', desc:'Карта интересов, навыки будущего, разбор профессий — с живым наставником' },
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
        {cases.map(({ Icon, name, desc }) => (
          <div key={name}
            style={{ border:'1.5px solid #ededed', borderRadius:20, padding:'32px 28px', minHeight:190, display:'flex', flexDirection:'column', justifyContent:'space-between', gap:20, transition:'border-color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='#CB172C')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='#ededed')}
          >
            <span style={{ display:'inline-flex', width:44, height:44, borderRadius:11, background:'linear-gradient(-72deg,#CB172C,#E52D43)', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon /></span>
            <div>
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:21, letterSpacing:'-0.4px', color:'#16181B', marginBottom:8 }}>{name}</div>
              <div style={{ font:"400 15px/1.5 'Manrope'", color:'#7a7d83' }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
