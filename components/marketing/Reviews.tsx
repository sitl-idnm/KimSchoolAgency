const reviews = [
  { text:'Сын после курса сам нашёл ошибку в ответе ChatGPT и объяснил нам, почему нейросеть «придумала» источник. Это дорогого стоит.', author:'Елена К.', role:'Мама ученика, 14 лет', initial:'Е' },
  { text:'Дочь стала задавать правильные вопросы ИИ, а не просто копировать ответы. Преподаватель в школе заметил, что работы стали сильнее.', author:'Андрей М.', role:'Папа ученицы, 13 лет', initial:'А' },
  { text:'Константин объясняет так, что даже сложные темы становятся понятны. После занятий ребёнок сам начал читать о нейросетях.', author:'Татьяна Р.', role:'Мама ученика, 16 лет', initial:'Т' },
]

const Stars = () => (
  <div style={{ display:'flex', gap:3 }}>
    {[...Array(5)].map((_,i) => <div className="rev-star" key={i} />)}
  </div>
)

export default function Reviews() {
  return (
    <section className="kim-section">
      <div className="kim-container">
        <span className="kim-eyebrow reveal">Отзывы</span>
        <h2 className="kim-h2 reveal d1" style={{ marginBottom: 0 }}>Что говорят родители</h2>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div className={`kim-card reveal d${i + 1}`} key={r.author} style={{ display:'flex', flexDirection:'column', gap: 16 }}>
              <Stars />
              <p className="kim-body" style={{ fontSize: 15, fontStyle:'italic', flex: 1, lineHeight: 1.75, color: 'var(--kim-body)' }}>
                «{r.text}»
              </p>
              <div style={{ display:'flex', alignItems:'center', gap: 12, paddingTop: 16, borderTop: '1px solid var(--kim-border)' }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'var(--kim-grad)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--kim-font-head)', fontSize:15, fontWeight:700, color:'#fff', flexShrink:0 }}>
                  {r.initial}
                </div>
                <div>
                  <div className="kim-h3" style={{ fontSize: 14 }}>{r.author}</div>
                  <div className="kim-small">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
