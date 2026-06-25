const cases = [
  { icon: '📚', title: 'Учёба', items: ['Объяснить сложную тему', 'Сделать конспект', 'Подготовиться к ответу'] },
  { icon: '🔬', title: 'Проекты', items: ['Структура исследования', 'Поиск и проверка источников', 'Подготовка к защите'] },
  { icon: '🎨', title: 'Творчество', items: ['Идеи, тексты, сценарии', 'Изображения и визуал', 'Нейтральная обратная связь'] },
  { icon: '🧭', title: 'Профориентация', items: ['Разобраться в профессиях', 'Навыки будущего', 'Карта интересов'] },
  { icon: '🌍', title: 'Английский', items: ['Тренировка диалогов', 'Объяснение грамматики', 'Разбор ошибок'] },
  { icon: '⚡', title: 'Личная эффективность', items: ['Планирование дня и целей', 'Подготовка к выступлениям', 'Структура мышления'] },
]

export default function UseCases() {
  return (
    <section className="sec dark gbg">
      <div className="wrap">
        <span className="lbl cy">Где применять</span>
        <h2 className="h2 lt">Где ребёнок будет использовать ИИ</h2>
        <p className="sub lt">Практика с первого занятия — в задачах, которые уже есть у ребёнка.</p>
        <div className="uc-grid">
          {cases.map(c => (
            <div className="uc-card" key={c.title}>
              <div className="uc-ico">{c.icon}</div>
              <div className="uc-title">{c.title}</div>
              <ul className="uc-list">
                {c.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
