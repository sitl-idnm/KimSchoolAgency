const reviews = [
  { text:'Сын после курса сам нашёл ошибку в ответе ChatGPT и объяснил нам, почему нейросеть «придумала» источник. Это дорогого стоит.', author:'Елена К.', role:'Мама ученика, 14 лет' },
  { text:'Дочь стала задавать правильные вопросы ИИ, а не просто копировать ответы. Преподаватель в школе заметил, что работы стали сильнее.', author:'Андрей М.', role:'Папа ученицы, 13 лет' },
  { text:'Константин объясняет так, что даже сложные темы становятся понятны. После занятий ребёнок сам начал читать о нейросетях.', author:'Татьяна Р.', role:'Мама ученика, 16 лет' },
]

const Stars = () => (
  <div style={{ display:'flex', gap:3, marginBottom:14 }}>
    {[...Array(5)].map((_,i) => <div className="rev-star" key={i} />)}
  </div>
)

export default function Reviews() {
  return (
    <section className="kim-section">
      <div className="kim-container">
        <span className="kim-eyebrow">Отзывы</span>
        <h2 className="kim-h2" style={{ marginBottom: 0 }}>Что говорят родители</h2>
        <div className="reviews-grid">
          {reviews.map(r => (
            <div className="kim-card" key={r.author}>
              <Stars />
              <p className="kim-body" style={{ fontStyle:'italic', marginBottom:16 }}>{r.text}</p>
              <div className="kim-h3" style={{ fontSize:14 }}>{r.author}</div>
              <div className="kim-small">{r.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
