'use client'
/* Сетка преимуществ — точно по standoff §WHY US: numbered cards */
const adv = [
  { n:'01', title:'Научится формулировать задачи и промпты' },
  { n:'02', title:'Будет проверять ответы и замечать галлюцинации' },
  { n:'03', title:'Создаст собственный AI-проект с защитой' },
  { n:'04', title:'Поймёт риски и научится защищать данные' },
  { n:'05', title:'Разовьёт системное мышление в цифровой среде' },
  { n:'06', title:'Получит карту навыков и отчёт для родителя' },
]

export default function Advantages() {
  return (
    <section style={{ maxWidth:1440, margin:'0 auto', padding:'104px clamp(20px,4vw,64px) 0' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
        <span style={{ fontSize:15 }}>✳</span> Что получит ребёнок
      </span>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:24, marginBottom:44 }}>
        <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,44px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:0, maxWidth:620 }}>
          Навыки, которые остаются на всю жизнь
        </h2>
        <p style={{ font:"400 18px/1.6 'Manrope'", color:'#52555b', margin:0, maxWidth:420 }}>
          Не абстрактные знания — конкретные умения, которые применяются уже во время курса.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
        {adv.map(a => (
          <div key={a.n}
            style={{ background:'#F7F7F7', borderRadius:20, padding:'34px 32px', display:'flex', flexDirection:'column', gap:16, transition:'background .2s' }}
            onMouseEnter={e => (e.currentTarget.style.background='#EFEFF2')}
            onMouseLeave={e => (e.currentTarget.style.background='#F7F7F7')}
          >
            <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:40, letterSpacing:'-1px', color:'#CB172C', lineHeight:1 }}>{a.n}</span>
            <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:21, lineHeight:1.3, letterSpacing:'-0.3px', color:'#16181B' }}>{a.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
