const arts = [
  { color: 'red', icon: '🗺', title: 'Личная prompt-карта',   desc: 'Шаблоны запросов под задачи ребёнка: учёба, проекты, творчество', tag: 'Занятие 2' },
  { color: 'cy',  icon: '🔬', title: 'Мини-исследование',     desc: 'Реальная тема + проверенные источники + структура',               tag: 'Занятие 4' },
  { color: 'dk',  icon: '📊', title: 'Презентация',           desc: 'Структура, аргументы, визуальная часть — вместе с ИИ',            tag: 'Занятие 5' },
  { color: 'red', icon: '🛡', title: 'Чек-лист безопасности', desc: 'Что вводить в чат нельзя и почему — свои правила',               tag: 'Занятие 7' },
  { color: 'cy',  icon: '🧭', title: 'Карта навыков',         desc: 'Что умею, где применяю, куда развиваться дальше',                tag: 'Занятие 6' },
  { color: 'dk',  icon: '🚀', title: 'AI-проект',             desc: 'Собственный проект на тему интересов ребёнка',                   tag: 'Занятие 8' },
  { color: 'red', icon: '🎤', title: 'Итоговая защита',       desc: 'Ребёнок объясняет проект своими словами и показывает ход мысли', tag: 'Финал' },
]

export default function Artifacts() {
  return (
    <section className="kim-section kim-section--soft">
      <div className="kim-container">
        <span className="kim-eyebrow">Результат обучения</span>
        <h2 className="kim-h2" style={{ marginBottom: 12 }}>Что ребёнок создаст</h2>
        <p className="kim-body" style={{ maxWidth: 520 }}>
          Не абстрактные «знания», а конкретные артефакты, которые остаются после курса.
        </p>
        <div className="artifacts-grid">
          {arts.map(a => (
            <div className="artifact-card" key={a.title}>
              <div className={`artifact-top ${a.color}`} />
              <div className="artifact-body">
                <div className="artifact-icon">{a.icon}</div>
                <div className="kim-h3" style={{ fontSize: 14, marginBottom: 6 }}>{a.title}</div>
                <p className="kim-small">{a.desc}</p>
                <span className="artifact-tag">Артефакт · {a.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
