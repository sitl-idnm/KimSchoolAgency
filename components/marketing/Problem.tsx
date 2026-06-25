const problems = [
  { title: 'Списывают без понимания', text: 'Копируют ответы ИИ целиком, не разбирая логику и не формируя собственного мышления.' },
  { title: 'Доверяют ошибкам ИИ',    text: 'Не проверяют факты, не распознают галлюцинации — и сдают неверное как правильное.' },
  { title: 'Не знают о рисках данных',text: 'Вводят личную информацию, фото, имена близких — без понимания последствий.' },
  { title: 'Школа не даёт системы',   text: 'Системного AI-образования нет. Ребёнок учится стихийно, из TikTok и Telegram.' },
]

export default function Problem() {
  return (
    <section className="kim-section kim-section--soft">
      <div className="kim-container">
        <span className="kim-eyebrow">Почему это важно сейчас</span>
        <h2 className="kim-h2" style={{ marginBottom: 12 }}>Дети уже используют ИИ.<br />Но хаотично.</h2>
        <p className="kim-body" style={{ maxWidth: 560, marginBottom: 0 }}>
          Они копируют, не думая. Доверяют ошибкам. Не защищают данные.
          Школа не объясняет правил — а ИИ уже в каждом телефоне.
        </p>
        <div className="problem-grid">
          {problems.map(p => (
            <div className="problem-card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
