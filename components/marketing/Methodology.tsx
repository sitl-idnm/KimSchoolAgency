const steps = [
  { icon: '🔍', title: 'Понять', desc: 'Как работает ИИ и почему он ошибается' },
  { icon: '🎯', title: 'Поставить задачу', desc: 'Формулировать запросы и не получать мусор' },
  { icon: '✓', title: 'Проверить', desc: 'Факты, источники, логика, галлюцинации', active: true },
  { icon: '⚡', title: 'Применить', desc: 'Учёба, проекты, презентации, творчество' },
  { icon: '🛡', title: 'Защитить', desc: 'Презентовать проект, показать ход мысли' },
]

export default function Methodology() {
  return (
    <section className="sec" id="методология">
      <div className="wrap">
        <span className="kim-eyebrow">Методология</span>
        <h2 className="h2">Как мы учим думать с ИИ</h2>
        <p className="sub">Пять этапов, которые превращают хаотичное использование нейросетей в осознанный навык.</p>
        <div className="method-steps">
          {steps.map(s => (
            <div className={`mstep${s.active ? ' active' : ''}`} key={s.title}>
              <div className="mstep-num"><div className="mstep-icon">{s.icon}</div></div>
              <div className="mstep-title">{s.title}</div>
              <div className="mstep-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
