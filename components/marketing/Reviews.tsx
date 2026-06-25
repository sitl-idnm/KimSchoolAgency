const reviews = [
  {
    text: 'Сын после курса сам нашёл ошибку в ответе ChatGPT и объяснил нам, почему нейросеть «придумала» источник. Это дорогого стоит.',
    author: 'Елена К.',
    role: 'Мама ученика, 14 лет',
  },
  {
    text: 'Дочь стала задавать правильные вопросы ИИ, а не просто копировать ответы. Преподаватель в школе заметил, что работы стали сильнее.',
    author: 'Андрей М.',
    role: 'Папа ученицы, 13 лет',
  },
  {
    text: 'Константин объясняет так, что даже сложные темы становятся понятны. После занятий ребёнок сам начал читать о нейросетях.',
    author: 'Татьяна Р.',
    role: 'Мама ученика, 16 лет',
  },
]

const Stars = () => (
  <div className="rev-stars">
    {[...Array(5)].map((_, i) => <div className="rev-star" key={i} />)}
  </div>
)

export default function Reviews() {
  return (
    <section className="sec">
      <div className="wrap">
        <span className="kim-eyebrow">Отзывы</span>
        <h2 className="h2">Что говорят родители</h2>
        <div className="rev-grid">
          {reviews.map(r => (
            <div className="rev-card" key={r.author}>
              <Stars />
              <p className="rev-text">{r.text}</p>
              <div className="rev-author">{r.author}</div>
              <div className="rev-role">{r.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
