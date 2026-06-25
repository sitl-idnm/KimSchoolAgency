export default function Problem() {
  const problems = [
    { title: 'Списывают без понимания', text: 'Копируют ответы ИИ целиком, не разбирая логику и не формируя собственного мышления.' },
    { title: 'Доверяют ошибкам ИИ', text: 'Не проверяют факты, не распознают галлюцинации — и сдают неверное как правильное.' },
    { title: 'Не знают о рисках данных', text: 'Вводят личную информацию, фото, имена близких — без понимания последствий.' },
    { title: 'Школа не даёт системы', text: 'Системного AI-образования нет. Ребёнок учится стихийно, из TikTok и Telegram.' },
  ]

  return (
    <section className="sec alt">
      <div className="wrap">
        <span className="kim-eyebrow">Почему это важно сейчас</span>
        <h2 className="h2">Дети уже используют ИИ.<br />Но хаотично.</h2>
        <p className="sub">Они копируют, не думая. Доверяют ошибкам. Не защищают данные. Школа не объясняет правил — а ИИ уже в каждом телефоне.</p>
        <div className="prob-grid">
          {problems.map(p => (
            <div className="pc" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
