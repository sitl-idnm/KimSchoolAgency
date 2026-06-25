'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const textRef = useRef<HTMLSpanElement>(null)
  const curRef  = useRef<HTMLSpanElement>(null)
  const sendRef = useRef<HTMLDivElement>(null)
  const chk1    = useRef<HTMLDivElement>(null)
  const chk2    = useRef<HTMLDivElement>(null)
  const res     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = 'Объясни, почему нейросеть ошибается'
    let i = 0
    const t = setInterval(() => {
      if (i <= text.length) {
        if (textRef.current) textRef.current.textContent = text.slice(0, i++)
      } else {
        clearInterval(t)
        if (sendRef.current) sendRef.current.style.display = 'block'
        if (curRef.current)  curRef.current.style.display  = 'none'
        setTimeout(() => {
          chk1.current?.classList.add('in')
          setTimeout(() => { chk2.current?.classList.add('in'); setTimeout(() => res.current?.classList.add('in'), 600) }, 600)
        }, 500)
      }
    }, 48)
    return () => clearInterval(t)
  }, [])

  return (
    /* Точно по standoff: max-width 1440, padding 30px сверху, сетка 1.05fr / 0.95fr */
    <section id="top" style={{ maxWidth:1440, margin:'0 auto', padding:'30px clamp(20px,4vw,64px) 0' }}>
      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:8, font:"500 13px/1 'Manrope'", color:'#9a9a9a', marginBottom:40 }}>
        <span>Онлайн-курс</span>
        <span style={{ opacity:.5 }}>/</span>
        <span style={{ color:'#CB172C' }}>KIM AI School</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.05fr 0.95fr', gap:56, alignItems:'center' }}>
        {/* Left */}
        <div>
          <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#CB172C', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:24 }}>
            <span style={{ fontSize:15 }}>✳</span> Школа AI-мышления · 12–17 лет
          </span>
          <h1 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(40px,5.4vw,72px)', lineHeight:1.04, letterSpacing:'-2px', color:'#16181B', margin:'0 0 26px' }}>
            Научим думать,<br />а не <span style={{ color:'#CB172C' }}>списывать</span><br />с нейросетей
          </h1>
          <p style={{ font:"400 19px/1.6 'Manrope'", color:'#52555b', margin:'0 0 36px', maxWidth:560 }}>
            Онлайн-курс для подростков: промпты, проверка фактов, собственный AI-проект и безопасная работа с нейросетями.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:16 }}>
            <a href="#записаться"
              onClick={e => { e.preventDefault(); document.getElementById('записаться')?.scrollIntoView({ behavior:'smooth' }) }}
              style={{ display:'inline-flex', alignItems:'center', padding:'18px 32px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#FAFAFA', font:"500 17px/1 'Inter Tight'", textDecoration:'none' }}>
              Записаться на диагностику
            </a>
            <a href="#программа"
              onClick={e => { e.preventDefault(); document.getElementById('программа')?.scrollIntoView({ behavior:'smooth' }) }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'18px 30px', borderRadius:8, border:'1.5px solid #e2e2e2', color:'#16181B', font:"500 17px/1 'Inter Tight'", textDecoration:'none' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor='#16181B')}
              onMouseLeave={e => (e.currentTarget.style.borderColor='#e2e2e2')}
            >Программа курса</a>
          </div>
        </div>

        {/* Right — AI demo card вместо image-slot */}
        <div style={{ width:'100%', height:480, borderRadius:24, background:'linear-gradient(160deg,#1c2235,#0e1014)', border:'1px solid rgba(255,255,255,.06)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Card header */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 18px', background:'rgba(0,0,0,.3)', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
            <div style={{ display:'flex', gap:5 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />)}
            </div>
            <span style={{ font:"600 11px/1 'Inter Tight'", color:'rgba(255,255,255,.3)', marginLeft:4 }}>KIM AI School — занятие</span>
            <span style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:5, font:"700 10px/1 'Inter Tight'", color:'#22d3ee', letterSpacing:.5, textTransform:'uppercase' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee', animation:'pulse 2s infinite' }} />
              Онлайн
            </span>
          </div>

          {/* Card body */}
          <div style={{ padding:24, flex:1, display:'flex', flexDirection:'column', gap:18 }}>
            {/* Step 01 */}
            <div style={{ display:'flex', gap:12 }}>
              <span style={{ font:"700 10px/1 'Inter Tight'", color:'#22d3ee', letterSpacing:1, flexShrink:0, paddingTop:1, width:18 }}>01</span>
              <div style={{ flex:1 }}>
                <div style={{ font:"700 10px/1 'Inter Tight'", color:'rgba(255,255,255,.2)', textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:7 }}>Запрос</div>
                <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:6, padding:'10px 12px', font:"400 12px/1.55 'Manrope'", color:'rgba(255,255,255,.45)', minHeight:44 }}>
                  <span ref={textRef} />
                  <span ref={curRef} style={{ display:'inline-block', width:1, height:13, background:'#22d3ee', marginLeft:1, verticalAlign:'middle', animation:'blink .8s step-end infinite' }} />
                  <div ref={sendRef} style={{ display:'none', font:"600 10px/1 'Inter Tight'", color:'#22d3ee', marginTop:5, opacity:.7 }}>Отправить →</div>
                </div>
              </div>
            </div>
            <hr style={{ border:'none', borderTop:'1px solid rgba(255,255,255,.05)', margin:0 }} />

            {/* Step 02 */}
            <div style={{ display:'flex', gap:12 }}>
              <span style={{ font:"700 10px/1 'Inter Tight'", color:'#22d3ee', letterSpacing:1, flexShrink:0, paddingTop:1, width:18 }}>02</span>
              <div style={{ flex:1 }}>
                <div style={{ font:"700 10px/1 'Inter Tight'", color:'rgba(255,255,255,.2)', textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:7 }}>Проверка</div>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  {[
                    { cls:'ok',   color:'rgba(34,211,238,.12)', tc:'#22d3ee', ico:'✓', text:'Аргументы проверены' },
                    { cls:'warn', color:'rgba(203,23,44,.12)',  tc:'#CB172C', ico:'!', text:'Источник нужно уточнить' },
                  ].map(c => (
                    <div key={c.cls} ref={c.cls==='ok' ? chk1 : chk2}
                      className="reveal"
                      style={{ display:'flex', alignItems:'center', gap:8, font:"400 12px/1 'Manrope'", color:'rgba(255,255,255,.35)' }}>
                      <div style={{ width:16, height:16, borderRadius:'50%', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', font:"700 9px/1 'Inter Tight'", color:c.tc, flexShrink:0 }}>{c.ico}</div>
                      {c.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr style={{ border:'none', borderTop:'1px solid rgba(255,255,255,.05)', margin:0 }} />

            {/* Step 03 */}
            <div style={{ display:'flex', gap:12 }}>
              <span style={{ font:"700 10px/1 'Inter Tight'", color:'#22d3ee', letterSpacing:1, flexShrink:0, paddingTop:1, width:18 }}>03</span>
              <div style={{ flex:1 }}>
                <div style={{ font:"700 10px/1 'Inter Tight'", color:'rgba(255,255,255,.2)', textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:7 }}>Результат</div>
                <div ref={res} className="reveal" style={{ background:'rgba(34,211,238,.04)', border:'1px solid rgba(34,211,238,.12)', borderRadius:6, padding:'10px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                  <div>
                    <div style={{ font:"600 12px/1 'Inter Tight'", color:'rgba(255,255,255,.7)' }}>Проект готов к защите</div>
                    <div style={{ font:"400 10px/1 'Manrope'", color:'rgba(255,255,255,.25)', marginTop:2 }}>Черновик доработан ребёнком</div>
                  </div>
                  <div style={{ background:'#22d3ee', color:'#000', font:"800 9px/1 'Inter Tight'", padding:'3px 8px', borderRadius:3, letterSpacing:.6, flexShrink:0 }}>ГОТОВО</div>
                </div>
              </div>
            </div>

            {/* Mentor */}
            <div style={{ marginTop:'auto', display:'flex', alignItems:'center', gap:12, paddingTop:16, borderTop:'1px solid rgba(255,255,255,.05)' }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(34,211,238,.08)', border:'2px solid rgba(34,211,238,.18)', display:'flex', alignItems:'center', justifyContent:'center', font:"700 14px/1 'Inter Tight'", color:'#22d3ee', flexShrink:0 }}>КК</div>
              <div>
                <div style={{ font:"600 13px/1 'Inter Tight'", color:'rgba(255,255,255,.7)' }}>Константин Ким</div>
                <div style={{ font:"400 11px/1 'Manrope'", color:'rgba(255,255,255,.3)', marginTop:3 }}>Основатель KIM.agency · Наставник</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,.4)} 70%{box-shadow:0 0 0 5px rgba(34,211,238,0)} }
      `}</style>
    </section>
  )
}
