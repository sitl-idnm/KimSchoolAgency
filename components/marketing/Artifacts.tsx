import { IconLayers, IconSearch, IconPresentation, IconShieldCheck, IconMapPin, IconCpu, IconAward } from '@/components/icons'

const arts = [
  { Icon: IconLayers,       accent: 'red', title: 'Личная prompt-карта',   desc: 'Шаблоны запросов под задачи ребёнка: учёба, проекты, творчество', tag: 'Занятие 2' },
  { Icon: IconSearch,       accent: 'cy',  title: 'Мини-исследование',     desc: 'Реальная тема + проверенные источники + структура',               tag: 'Занятие 4' },
  { Icon: IconPresentation, accent: 'dk',  title: 'Презентация',           desc: 'Структура, аргументы, визуальная часть — вместе с ИИ',            tag: 'Занятие 5' },
  { Icon: IconShieldCheck,  accent: 'red', title: 'Чек-лист безопасности', desc: 'Что вводить в чат нельзя и почему — свои правила',               tag: 'Занятие 7' },
  { Icon: IconMapPin,       accent: 'cy',  title: 'Карта навыков',         desc: 'Что умею, где применяю, куда развиваться дальше',                tag: 'Занятие 6' },
  { Icon: IconCpu,          accent: 'dk',  title: 'AI-проект',             desc: 'Собственный проект на тему интересов ребёнка',                   tag: 'Занятие 8' },
  { Icon: IconAward,        accent: 'red', title: 'Итоговая защита',       desc: 'Ребёнок объясняет проект своими словами и показывает ход мысли', tag: 'Финал' },
]

const accentColor = {
  red: 'var(--kim-red)',
  cy:  'var(--cy)',
  dk:  'var(--kim-ink)',
}
const accentBg = {
  red: 'rgba(203,23,44,.07)',
  cy:  'rgba(34,211,238,.08)',
  dk:  'rgba(22,24,27,.06)',
}

export default function Artifacts() {
  return (
    <section className="kim-section kim-section--soft">
      <div className="kim-container">
        <span className="kim-eyebrow reveal">Результат обучения</span>
        <h2 className="kim-h2 reveal d1" style={{ marginBottom: 12 }}>Что ребёнок создаст</h2>
        <p className="kim-body reveal d2" style={{ maxWidth: 520 }}>
          Не абстрактные «знания», а конкретные артефакты, которые остаются после курса.
        </p>
        <div className="artifacts-grid">
          {arts.map(({ Icon, accent, title, desc, tag }, i) => (
            <div className={`artifact-card reveal d${(i % 4) + 1}`} key={title}>
              <div className="artifact-body">
                <div style={{ width: 44, height: 44, borderRadius: 12, background: accentBg[accent as keyof typeof accentBg], display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: accentColor[accent as keyof typeof accentColor] }}>
                  <Icon />
                </div>
                <div className="kim-h3" style={{ fontSize: 14, marginBottom: 7 }}>{title}</div>
                <p className="kim-small">{desc}</p>
                <span className="artifact-tag">{tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
