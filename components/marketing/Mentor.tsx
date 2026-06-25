'use client'
/* Наставник — по standoff §REVIEWS layout, но для ментора */
export default function Mentor() {
  return (
    <section id="наставник" style={{ maxWidth:1440, margin:'0 auto', padding:'104px clamp(20px,4vw,64px) 0' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
        <span style={{ fontSize:15 }}>✳</span> Наставник
      </span>
      <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,46px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:'0 0 52px', maxWidth:640 }}>
        Живой практик, а не теоретик
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'0.85fr 1.15fr', gap:64, alignItems:'start' }}>

        {/* Photo */}
        <div style={{ background:'#E7E8EC', borderRadius:24, padding:28, display:'flex', flexDirection:'column', gap:24, position:'sticky', top:100 }}>
          <div style={{ width:'100%', height:360, borderRadius:14, background:'linear-gradient(160deg,#1c2235,#0e1014)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
            <div style={{ width:96, height:96, borderRadius:'50%', background:'rgba(34,211,238,.08)', border:'2px solid rgba(34,211,238,.18)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:30, color:'#22d3ee' }}>КК</div>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:18, color:'#f1f2f4' }}>Константин Ким</div>
            <div style={{ font:"400 12px/1 'Manrope'", color:'rgba(255,255,255,.4)' }}>Основатель KIM.agency</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', padding:'0 20px', marginTop:4 }}>
              {['200+ проектов','AI с 2023','ТПП Москвы','Наставник с 2022'].map(c => (
                <span key={c} style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.08)', borderRadius:4, padding:'4px 10px', font:"600 10px/1 'Inter Tight'", color:'rgba(255,255,255,.4)' }}>{c}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:24, letterSpacing:'-0.5px', color:'#16181B', marginBottom:6 }}>Константин Ким</div>
            <div style={{ font:"400 15px/1.5 'Manrope'", color:'#5c5f65' }}>Предприниматель · Основатель KIM.agency · Член ТПП Москвы</div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ display:'flex', flexDirection:'column', gap:26 }}>
          <p style={{ font:"400 19px/1.65 'Manrope'", color:'#52555b', margin:0 }}>
            Практик AI-внедрений в бизнесе с 2023 года. Использует нейросети в маркетинге, продажах, аналитике, стратегии и разработке. Не объясняет теорию ради теории — показывает, как ИИ работает в реальных задачах.
          </p>
          <p style={{ font:"400 19px/1.65 'Manrope'", color:'#52555b', margin:0 }}>
            Запустил KIM AI School, потому что увидел: дети используют ИИ неправильно, а родители не знают, как помочь. При этом навык AI-мышления становится таким же базовым, как умение читать.
          </p>
          <div style={{ borderLeft:'3px solid #CB172C', padding:'6px 0 6px 24px', marginTop:6 }}>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:22, lineHeight:1.45, color:'#16181B', margin:0 }}>
              Ребёнка нужно научить не списывать — а думать в среде, где ИИ уже везде.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14, marginTop:10 }}>
            {[
              { n:'200+', l:'проектов KIM.agency' },
              { n:'2015', l:'год основания агентства' },
              { n:'2023', l:'AI-практика с года' },
              { n:'2022', l:'наставничество с года' },
            ].map(s => (
              <div key={s.n} style={{ background:'#F7F7F7', borderRadius:14, padding:'18px 20px' }}>
                <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:28, letterSpacing:'-0.8px', color:'#16181B' }}>{s.n}</div>
                <div style={{ font:"400 14px/1.3 'Manrope'", color:'#8a8d93', marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Media */}
          <div>
            <div style={{ font:"600 12px/1 'Inter Tight'", letterSpacing:'1.2px', textTransform:'uppercase', color:'#8a8d93', marginBottom:14 }}>Медиа и выступления</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {['Москва 24','РБК','Сбер Про Медиа','Sostav','Т-Бизнес','Шмаркетинг'].map(m => (
                <span key={m} style={{ border:'1px solid #ededed', borderRadius:6, padding:'7px 14px', font:"400 14px/1 'Manrope'", color:'#6c6f75' }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
