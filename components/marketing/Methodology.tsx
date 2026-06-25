import { IconBrain, IconTarget, IconCheckCircle, IconZap, IconShield } from '@/components/icons'

const steps = [
  { Icon: IconBrain,       title: 'Понять',          desc: 'Как работает ИИ и почему он ошибается', active: false },
  { Icon: IconTarget,      title: 'Поставить задачу', desc: 'Формулировать запросы и не получать мусор', active: false },
  { Icon: IconCheckCircle, title: 'Проверить',        desc: 'Факты, источники, логика, галлюцинации', active: true },
  { Icon: IconZap,         title: 'Применить',        desc: 'Учёба, проекты, презентации, творчество', active: false },
  { Icon: IconShield,      title: 'Защитить',         desc: 'Презентовать проект, показать ход мысли', active: false },
]

export default function Methodology() {
  return (
    <section className="kim-section" id="методология">
      <div className="kim-container">
        <span className="kim-eyebrow reveal">Методология</span>
        <h2 className="kim-h2 reveal d1" style={{ marginBottom: 12 }}>Как мы учим думать с ИИ</h2>
        <p className="kim-body reveal d2" style={{ maxWidth: 520 }}>
          Пять этапов, которые превращают хаотичное использование нейросетей в осознанный навык.
        </p>
        <div className="method-steps">
          {steps.map((s, i) => (
            <div className={`method-step reveal d${i + 1}`} key={s.title}>
              <div className={`method-step-circle${s.active ? ' active' : ''}`}>
                <s.Icon />
              </div>
              <div className="kim-h3" style={{ fontSize: 15, marginBottom: 6 }}>{s.title}</div>
              <p className="kim-small">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
