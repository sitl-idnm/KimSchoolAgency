const modules = [
  { num: '01', title: 'Как работает ИИ', badge: 'starter', points: ['Что такое нейросети простыми словами', 'Почему ИИ уверенно ошибается', 'Галлюцинации и как их замечать'] },
  { num: '02', title: 'Запросы и постановка задач', badge: 'starter', points: ['Принципы хорошего промпта', 'Контекст, роль, формат, ограничения', 'Личная prompt-карта'] },
  { num: '03', title: 'Проверка фактов', badge: 'starter', points: ['Как проверять ответы ИИ', 'Источники и критическое мышление', 'Практика: найти ошибку в ответе'] },
  { num: '04', title: 'ИИ для учёбы', badge: 'starter', points: ['Учёба с ИИ без списывания', 'Объяснение → понимание → своими словами', 'Как родитель увидит прогресс'] },
  { num: '05', title: 'Презентации и исследования', badge: 'full', points: ['Структура проекта с ИИ', 'Аргументы, источники, визуал', 'Итоговая презентация ученика'] },
  { num: '06', title: 'Тексты, изображения, идеи', badge: 'full', points: ['Творческие задачи с ИИ', 'Midjourney и генерация изображений', 'Авторский голос vs ИИ-текст'] },
  { num: '07', title: 'Безопасность и этика', badge: 'full', points: ['Что нельзя вводить в чат', 'Данные, приватность, цифровой след', 'Фейки и дипфейки: как не попасться'] },
  { num: '08', title: 'Финальный проект и защита', badge: 'full', points: ['Собственный AI-проект на интересную тему', 'Ребёнок объясняет ход мысли', 'Отчёт родителю + карта навыков'] },
]

const badgeLabel: Record<string, string> = { starter: 'Стартовый', full: 'Полная' }

export default function Curriculum() {
  return (
    <section className="sec" id="программа">
      <div className="wrap">
        <span className="kim-eyebrow">Программа</span>
        <h2 className="h2">8 модулей — от основ до защиты проекта</h2>
        <p className="sub">Стартовый пакет — модули 1–4. Полная программа — все 8 модулей с финальным AI-проектом.</p>
        <div style={{ height: 28 }} />
        <div className="cur-grid">
          {modules.map(m => (
            <div className="mod" key={m.num}>
              <div className="mod-head">
                <span className="mod-num">{m.num}</span>
                <span className="mod-title">{m.title}</span>
                <span className={`mod-badge ${m.badge}`}>{badgeLabel[m.badge]}</span>
              </div>
              <ul className="mod-points">
                {m.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
