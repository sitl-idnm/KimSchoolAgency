const arts = [
  { color: 'r', icon: '🗺', title: 'Личная prompt-карта', desc: 'Шаблоны запросов под задачи ребёнка: учёба, проекты, творчество', tag: 'Артефакт · Занятие 2' },
  { color: 'c', icon: '🔬', title: 'Мини-исследование', desc: 'Реальная тема + проверенные источники + структура', tag: 'Артефакт · Занятие 4' },
  { color: 'd', icon: '📊', title: 'Презентация', desc: 'Структура, аргументы, визуальная часть — вместе с ИИ', tag: 'Артефакт · Занятие 5' },
  { color: 'r', icon: '🛡', title: 'Чек-лист безопасности', desc: 'Что вводить в чат нельзя и почему — свои правила', tag: 'Артефакт · Занятие 7' },
  { color: 'c', icon: '🧭', title: 'Карта навыков', desc: 'Что умею, где применяю, куда развиваться дальше', tag: 'Артефакт · Занятие 6' },
  { color: 'd', icon: '🚀', title: 'AI-проект', desc: 'Собственный проект на тему интересов ребёнка', tag: 'Артефакт · Занятие 8' },
  { color: 'r', icon: '🎤', title: 'Итоговая защита', desc: 'Ребёнок объясняет проект своими словами и показывает ход мысли', tag: 'Артефакт · Финал' },
]

export default function Artifacts() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <span className="kim-eyebrow">Результат обучения</span>
        <h2 className="h2">Что ребёнок создаст</h2>
        <p className="sub">Не абстрактные «знания», а конкретные артефакты, которые остаются после курса.</p>
        <div className="arts-grid" style={{ marginTop: 44 }}>
          {arts.map(a => (
            <div className="art-card" key={a.title}>
              <div className={`art-top ${a.color}`} />
              <div className="art-body">
                <div className="art-ico">{a.icon}</div>
                <div className="art-title">{a.title}</div>
                <div className="art-desc">{a.desc}</div>
                <div className="art-tag">{a.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
