import { IconCopy, IconAlertTri, IconLock, IconXCircle } from '@/components/icons'

const problems = [
  { Icon: IconCopy,     title: 'Списывают без понимания',  text: 'Копируют ответы ИИ целиком, не разбирая логику и не формируя собственного мышления.' },
  { Icon: IconAlertTri, title: 'Доверяют ошибкам ИИ',     text: 'Не проверяют факты, не распознают галлюцинации — и сдают неверное как правильное.' },
  { Icon: IconLock,     title: 'Не знают о рисках данных', text: 'Вводят личную информацию, фото, имена близких — без понимания последствий.' },
  { Icon: IconXCircle,  title: 'Школа не даёт системы',    text: 'Системного AI-образования нет. Ребёнок учится стихийно, из TikTok и Telegram.' },
]

export default function Problem() {
  return (
    <section className="kim-section kim-section--soft">
      <div className="kim-container">
        <span className="kim-eyebrow reveal">Почему это важно сейчас</span>
        <h2 className="kim-h2 reveal d1" style={{ marginBottom: 12 }}>
          Дети уже используют ИИ.<br />Но хаотично.
        </h2>
        <p className="kim-body reveal d2" style={{ maxWidth: 560, marginBottom: 0 }}>
          Они копируют, не думая. Доверяют ошибкам. Не защищают данные.
          Школа не объясняет правил — а ИИ уже в каждом телефоне.
        </p>
        <div className="problem-grid">
          {problems.map(({ Icon, title, text }, i) => (
            <div className={`problem-card reveal d${i + 1}`} key={title}>
              <div className="icon-circle soft" style={{ marginBottom: 18 }}>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
