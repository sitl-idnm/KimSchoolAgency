/* Блок «О подходе» — sticky заголовок слева + текст/цитата справа. Точно по standoff §INTRO */
export default function Intro() {
  return (
    <section id="методология" style={{ maxWidth:1440, margin:'0 auto', padding:'104px clamp(20px,4vw,64px) 0' }}>
      <div style={{ display:'grid', gridTemplateColumns:'0.85fr 1.15fr', gap:64, alignItems:'start' }}>

        {/* Sticky left */}
        <div style={{ position:'sticky', top:120 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
            <span style={{ fontSize:15 }}>✳</span> О подходе
          </span>
          <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.4vw,44px)', lineHeight:1.08, letterSpacing:'-1.2px', color:'#16181B', margin:0 }}>
            Не курс по ChatGPT — курс по AI-мышлению
          </h2>
        </div>

        {/* Right — paragraphs + quote */}
        <div style={{ display:'flex', flexDirection:'column', gap:26 }}>
          <p style={{ font:"400 19px/1.65 'Manrope'", color:'#52555b', margin:0 }}>
            Большинство детей уже используют нейросети — но хаотично. Копируют ответы, не проверяют факты, вводят личные данные, не понимают, почему ИИ ошибается. Это не их вина: никто не объяснил систему.
          </p>
          <p style={{ font:"400 19px/1.65 'Manrope'", color:'#52555b', margin:0 }}>
            KIM AI School — это не обучение инструментам. Это методология мышления: как ставить задачу, как проверять результат, как защищать данные и как создавать собственные проекты в новой цифровой среде.
          </p>
          <p style={{ font:"400 19px/1.65 'Manrope'", color:'#52555b', margin:0 }}>
            Каждое занятие — живое, с наставником. Практика с первого урока. Родитель получает отчёт после каждого занятия и видит прогресс ребёнка.
          </p>
          <div style={{ borderLeft:'3px solid #CB172C', padding:'6px 0 6px 24px', marginTop:6 }}>
            <p style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:22, lineHeight:1.45, color:'#16181B', margin:0 }}>
              Мы учим не пользоваться нейросетями — мы учим думать в среде, где ИИ уже везде.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
