'use client'
/* Программа — точно по standoff §STAGES: ряды с разделителями */
const modules = [
  { n:'01', title:'Как работает ИИ',             desc:'Что такое нейросеть, почему она уверенно ошибается, что такое галлюцинации и как их замечать.' },
  { n:'02', title:'Запросы и промпты',            desc:'Принципы хорошего промпта. Контекст, роль, формат, ограничения. Личная prompt-карта ребёнка.' },
  { n:'03', title:'Проверка фактов',             desc:'Как проверять ответы ИИ, работать с источниками и практиковать критическое мышление.' },
  { n:'04', title:'ИИ для учёбы',                desc:'Учёба с ИИ без списывания. Объяснение → понимание → своими словами. Отчёт родителю.' },
  { n:'05', title:'Презентации и исследования',   desc:'Структура проекта с ИИ, аргументы, источники, визуал. Итоговая презентация ученика.' },
  { n:'06', title:'Тексты, изображения, идеи',   desc:'Творческие задачи с ИИ, генерация изображений, авторский голос vs ИИ-текст.' },
  { n:'07', title:'Безопасность и этика',         desc:'Что нельзя вводить в чат, данные и приватность, цифровой след, фейки и дипфейки.' },
  { n:'08', title:'Финальный проект и защита',    desc:'Собственный AI-проект на тему интересов ребёнка. Объясняет ход мысли. Карта навыков + отчёт.' },
]

export default function Curriculum() {
  return (
    <section id="программа" style={{ maxWidth:1440, margin:'0 auto', padding:'104px clamp(20px,4vw,64px) 0' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
        <span style={{ fontSize:15 }}>✳</span> Программа
      </span>
      <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,46px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:'0 0 52px', maxWidth:640 }}>
        8 модулей — от основ до защиты проекта
      </h2>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {modules.map((m, i) => (
          <div key={m.n} className="cur-row"
            style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:32, padding:'30px 0', borderTop:'1px solid #ededed', alignItems:'baseline', transition:'background .15s', borderRadius:4 }}
            onMouseEnter={e => (e.currentTarget.style.background='#fafafa')}
            onMouseLeave={e => (e.currentTarget.style.background='transparent')}
          >
            <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:40, letterSpacing:'-1px', color:'#CB172C' }}>{m.n}</span>
            <div className="cur-row-inner" style={{ display:'grid', gridTemplateColumns:'0.6fr 1fr', gap:32, alignItems:'baseline' }}>
              <h3 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:24, letterSpacing:'-0.4px', color:'#16181B', margin:0 }}>{m.title}</h3>
              <p style={{ font:"400 17px/1.55 'Manrope'", color:'#6c6f75', margin:0 }}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
