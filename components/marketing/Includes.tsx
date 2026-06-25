/* Что создаст ребёнок — по standoff §INCLUDES: sticky left + checklist right */
const items = [
  'Личная prompt-карта (шаблоны запросов)',
  'Мини-исследование на реальную тему',
  'Презентация с аргументами и визуалом',
  'Чек-лист цифровой безопасности',
  'Карта навыков и зон роста',
  'Собственный AI-проект',
  'Итоговая защита проекта перед наставником',
  'Отчёт родителю с картой навыков',
]

const Check = () => (
  <span style={{ flexShrink:0, width:26, height:26, borderRadius:'50%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
)

export default function Includes() {
  return (
    <section style={{ marginTop:104, background:'#FAFAFA' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'96px var(--sp)' }}>
        <div className="includes-grid" style={{ display:'grid', gridTemplateColumns:'0.8fr 1.2fr', gap:64, alignItems:'start' }}>
          <div className="includes-sticky" style={{ position:'sticky', top:120 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
              <span style={{ fontSize:15 }}>✳</span> Что создаст ребёнок
            </span>
            <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,44px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:'0 0 18px' }}>
              Конкретные артефакты — не абстрактные знания
            </h2>
            <p style={{ font:"400 18px/1.6 'Manrope'", color:'#52555b', margin:0 }}>
              После курса у ребёнка остаются реальные работы, которые он сделал сам — с помощью ИИ, но своим умом.
            </p>
          </div>
          <div className="includes-checklist" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {items.map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:16, background:'#fff', borderRadius:14, padding:'22px 24px' }}>
                <Check />
                <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:17, color:'#16181B' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
