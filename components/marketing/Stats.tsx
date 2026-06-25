/* Тёмная секция статистики — точно по standoff §STATS */
const stats = [
  { num:'200+',  label:'реализованных проектов в KIM.agency' },
  { num:'10+',   label:'лет в digital-маркетинге и разработке' },
  { num:'4–8',   label:'занятий в программе — живые, с наставником' },
  { num:'100%',  label:'занятий проходят онлайн в реальном времени' },
  { num:'2023',  label:'год — начало AI-практики в реальных проектах' },
  { num:'12–17', label:'лет — возраст учеников' },
]

export default function Stats() {
  return (
    <section style={{ marginTop:104, background:'#16181B', color:'#fff' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'96px clamp(20px,4vw,64px)' }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#E52D43', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
          <span style={{ fontSize:15 }}>✳</span> Цифры и факты
        </span>
        <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,46px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#fff', margin:'0 0 52px', maxWidth:640 }}>
          Опыт и команда за каждым занятием
        </h2>
        <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'48px 32px' }}>
          {stats.map(s => (
            <div key={s.num} style={{ borderTop:'1px solid rgba(255,255,255,0.16)', paddingTop:24 }}>
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(44px,5vw,68px)', lineHeight:1, letterSpacing:'-2px', color:'#fff', marginBottom:14 }}>{s.num}</div>
              <div style={{ font:"400 17px/1.45 'Manrope'", color:'rgba(255,255,255,0.62)', maxWidth:260 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
