const steps = [
  { icon: '🔍', title: 'Понять',          desc: 'Как работает ИИ и почему он ошибается' },
  { icon: '🎯', title: 'Поставить задачу', desc: 'Формулировать запросы и не получать мусор' },
  { icon: '✓',  title: 'Проверить',        desc: 'Факты, источники, логика, галлюцинации', active: true },
  { icon: '⚡', title: 'Применить',        desc: 'Учёба, проекты, презентации, творчество' },
  { icon: '🛡', title: 'Защитить',         desc: 'Презентовать проект, показать ход мысли' },
]

export default function Methodology() {
  return (
    <section className="kim-section" id="методология">
      <div className="kim-container">
        <span className="kim-eyebrow">Методология</span>
        <h2 className="kim-h2" style={{ marginBottom: 12 }}>Как мы учим думать с ИИ</h2>
        <p className="kim-body" style={{ maxWidth: 520 }}>
          Пять этапов, которые превращают хаотичное использование нейросетей в осознанный навык.
        </p>
        <div className="method-steps">
          {steps.map(s => (
            <div className={`method-step${s.active ? ' active' : ''}`} key={s.title}>
              <div className="method-step-circle">{s.icon}</div>
              <div className="kim-h3" style={{ fontSize: 15, marginBottom: 8 }}>{s.title}</div>
              <p className="kim-small">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
