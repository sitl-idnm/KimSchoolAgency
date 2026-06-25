import { IconBookOpen, IconFlask, IconPenTool, IconCompass, IconGlobe, IconTrendingUp } from '@/components/icons'

const cases = [
  { Icon: IconBookOpen,   title: 'Учёба',               items: ['Объяснить сложную тему','Сделать конспект','Подготовиться к ответу'] },
  { Icon: IconFlask,      title: 'Проекты',             items: ['Структура исследования','Поиск и проверка источников','Подготовка к защите'] },
  { Icon: IconPenTool,    title: 'Творчество',          items: ['Идеи, тексты, сценарии','Изображения и визуал','Нейтральная обратная связь'] },
  { Icon: IconCompass,    title: 'Профориентация',      items: ['Разобраться в профессиях','Навыки будущего','Карта интересов'] },
  { Icon: IconGlobe,      title: 'Английский',          items: ['Тренировка диалогов','Объяснение грамматики','Разбор ошибок'] },
  { Icon: IconTrendingUp, title: 'Личная эффективность',items: ['Планирование дня и целей','Подготовка к выступлениям','Структура мышления'] },
]

export default function UseCases() {
  return (
    <section className="kim-section kim-section--dark">
      <div className="kim-container">
        <div className="kim-section-inner">
          <span className="kim-eyebrow reveal">Где применять</span>
          <h2 className="kim-h2 reveal d1" style={{ marginBottom: 12 }}>Где ребёнок будет использовать ИИ</h2>
          <p className="kim-body reveal d2" style={{ maxWidth: 520, color: 'rgba(255,255,255,.45)' }}>
            Практика с первого занятия — в задачах, которые уже есть у ребёнка.
          </p>
          <div className="uc-grid">
            {cases.map(({ Icon, title, items }, i) => (
              <div className={`uc-card reveal d${(i % 3) + 1}`} key={title}>
                <div className="uc-icon"><Icon /></div>
                <div className="kim-h3" style={{ fontSize: 15, color: 'rgba(255,255,255,.85)', marginBottom: 8 }}>{title}</div>
                <ul className="uc-list">
                  {items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
