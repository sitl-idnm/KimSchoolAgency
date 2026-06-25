/* Отзывы — точно по standoff §REVIEWS */
const reviews = [
  { name:'Елена К.',  role:'Мама ученика, 14 лет', initial:'Е', text:'Сын после курса сам нашёл ошибку в ответе ChatGPT и объяснил нам, почему нейросеть «придумала» источник. Это дорогого стоит.' },
  { name:'Андрей М.', role:'Папа ученицы, 13 лет', initial:'А', text:'Дочь стала задавать правильные вопросы ИИ, а не просто копировать ответы. Преподаватель в школе заметил, что работы стали сильнее.' },
  { name:'Татьяна Р.', role:'Мама ученика, 16 лет', initial:'Т', text:'Константин объясняет так, что даже сложные темы становятся понятны. После занятий ребёнок сам начал читать про нейросети.' },
]

type Review = typeof reviews[number]

function ReviewCard({ r }: { r: Review }) {
  return (
    <div style={{ background:'#F7F7F7', borderRadius:20, padding:'34px 32px', display:'flex', flexDirection:'column', gap:24, height:'100%' }}>
      <div style={{ display:'flex', gap:4 }}>
        {'★★★★★'.split('').map((s,i) => <span key={i} style={{ color:'#CB172C', fontSize:18 }}>{s}</span>)}
      </div>
      <p style={{ font:"400 17px/1.6 'Manrope'", color:'#3c3f45', margin:0, flex:1 }}>
        «{r.text}»
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:18, color:'#fff', flexShrink:0 }}>
          {r.initial}
        </div>
        <div>
          <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:16, color:'#16181B' }}>{r.name}</div>
          <div style={{ font:"400 14px/1.3 'Manrope'", color:'#8a8d93' }}>{r.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section style={{ maxWidth:1440, margin:'0 auto', padding:'104px var(--sp) 0' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
        <span style={{ fontSize:15 }}>✳</span> Отзывы
      </span>
      <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,46px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:'0 0 52px', maxWidth:640 }}>
        Что говорят родители
      </h2>

      {/* Desktop grid */}
      <div className="reviews-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
        {reviews.map(r => <ReviewCard key={r.name} r={r} />)}
      </div>

      {/* Mobile carousel */}
      <div className="reviews-carousel carousel-wrap">
        {reviews.map(r => (
          <div key={r.name} className="carousel-item">
            <ReviewCard r={r} />
          </div>
        ))}
      </div>
    </section>
  )
}
