const modules = [
  { num:'01', title:'Как работает ИИ',              badge:'starter', points:['Что такое нейросети простыми словами','Почему ИИ уверенно ошибается','Галлюцинации и как их замечать'] },
  { num:'02', title:'Запросы и постановка задач',   badge:'starter', points:['Принципы хорошего промпта','Контекст, роль, формат, ограничения','Личная prompt-карта'] },
  { num:'03', title:'Проверка фактов',              badge:'starter', points:['Как проверять ответы ИИ','Источники и критическое мышление','Практика: найти ошибку в ответе'] },
  { num:'04', title:'ИИ для учёбы',                 badge:'starter', points:['Учёба с ИИ без списывания','Объяснение → понимание → своими словами','Как родитель увидит прогресс'] },
  { num:'05', title:'Презентации и исследования',   badge:'full',    points:['Структура проекта с ИИ','Аргументы, источники, визуал','Итоговая презентация ученика'] },
  { num:'06', title:'Тексты, изображения, идеи',    badge:'full',    points:['Творческие задачи с ИИ','Midjourney и генерация изображений','Авторский голос vs ИИ-текст'] },
  { num:'07', title:'Безопасность и этика',         badge:'full',    points:['Что нельзя вводить в чат','Данные, приватность, цифровой след','Фейки и дипфейки: как не попасться'] },
  { num:'08', title:'Финальный проект и защита',    badge:'full',    points:['Собственный AI-проект на интересную тему','Ребёнок объясняет ход мысли','Отчёт родителю + карта навыков'] },
]

const label: Record<string,string> = { starter:'Стартовый', full:'Полная' }

export default function Curriculum() {
  return (
    <section className="kim-section" id="программа">
      <div className="kim-container">
        <span className="kim-eyebrow">Программа</span>
        <h2 className="kim-h2" style={{ marginBottom: 12 }}>8 модулей — от основ до защиты проекта</h2>
        <p className="kim-body" style={{ maxWidth: 560 }}>
          Стартовый пакет — модули 1–4. Полная программа — все 8 модулей с финальным AI-проектом.
        </p>
        <div className="modules-grid">
          {modules.map(m => (
            <div className="kim-card--outline" key={m.num} style={{ padding: '18px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                <span className="kim-small" style={{ fontFamily:'var(--kim-font-head)', fontWeight:700, letterSpacing:1, width:24 }}>{m.num}</span>
                <span className="kim-h3" style={{ fontSize:14, flex:1 }}>{m.title}</span>
                <span className={`mod-badge ${m.badge}`}>{label[m.badge]}</span>
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
