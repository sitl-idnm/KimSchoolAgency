/* Как начать — по standoff §HOW TO START: 4-col step numbers */
const steps = [
  { n:'01', text:'Оставляете заявку — свяжемся в течение нескольких часов' },
  { n:'02', text:'Проводим бесплатную консультацию 15 минут' },
  { n:'03', text:'Проводим вводную диагностику ребёнка — уровень и интересы' },
  { n:'04', text:'Подбираем программу, подписываем договор, начинаем занятия' },
]

export default function Timeline() {
  return (
    <section style={{ maxWidth:1440, margin:'0 auto', padding:'104px clamp(20px,4vw,64px) 0' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
        <span style={{ fontSize:15 }}>✳</span> Как начать
      </span>
      <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,46px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:'0 0 52px', maxWidth:640 }}>
        Начать просто
      </h2>
      <div className="timeline-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
        {steps.map(s => (
          <div key={s.n} style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:52, letterSpacing:'-2px', color:'#E7E8EC', lineHeight:1 }}>{s.n}</span>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:19, lineHeight:1.35, color:'#16181B', margin:0 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
