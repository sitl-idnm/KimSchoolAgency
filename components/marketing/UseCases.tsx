const cases = [
  { icon: '📚', title: 'Учёба',               items: ['Объяснить сложную тему', 'Сделать конспект', 'Подготовиться к ответу'] },
  { icon: '🔬', title: 'Проекты',             items: ['Структура исследования', 'Поиск и проверка источников', 'Подготовка к защите'] },
  { icon: '🎨', title: 'Творчество',          items: ['Идеи, тексты, сценарии', 'Изображения и визуал', 'Нейтральная обратная связь'] },
  { icon: '🧭', title: 'Профориентация',      items: ['Разобраться в профессиях', 'Навыки будущего', 'Карта интересов'] },
  { icon: '🌍', title: 'Английский',          items: ['Тренировка диалогов', 'Объяснение грамматики', 'Разбор ошибок'] },
  { icon: '⚡', title: 'Личная эффективность',items: ['Планирование дня и целей', 'Подготовка к выступлениям', 'Структура мышления'] },
]

export default function UseCases() {
  return (
    <section className="kim-section kim-section--dark">
      <div className="kim-container">
        <div className="kim-section-inner">
          <span className="kim-eyebrow">Где применять</span>
          <h2 className="kim-h2" style={{ marginBottom: 12 }}>Где ребёнок будет использовать ИИ</h2>
          <p className="kim-body" style={{ maxWidth: 520, color: 'rgba(255,255,255,.45)' }}>
            Практика с первого занятия — в задачах, которые уже есть у ребёнка.
          </p>
          <div className="uc-grid">
            {cases.map(c => (
              <div className="uc-card" key={c.title}>
                <div className="uc-icon">{c.icon}</div>
                <div className="kim-h3" style={{ fontSize: 15, color: 'rgba(255,255,255,.8)', marginBottom: 4 }}>{c.title}</div>
                <ul className="uc-list">
                  {c.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
