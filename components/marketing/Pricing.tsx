'use client'

import { useEffect, useRef } from 'react'

const CheckIcon = () => (
  <svg className="pf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const plans = [
  { name:'Стартовый', desc:'Базовая AI-грамотность и первый результат уже после 4 занятий',  amount:'4',        unit:'занятия', popular:false, btnClass:'gl', btnText:'Записаться',
    features:['Вводная диагностика + карта развития','Как работает ИИ и почему ошибается','Запросы и промпты на практике','ИИ для учёбы без списывания','Личная prompt-карта','Отчёт родителю после каждого занятия'] },
  { name:'Полная',    desc:'Полный навык + собственный AI-проект с финальной защитой',        amount:'8',        unit:'занятий', popular:true,  btnClass:'cy', btnText:'Записаться',
    features:['Всё из стартового пакета','Проверка фактов и критическое мышление','Презентации и исследовательские проекты','Изображения, тексты, идеи с ИИ','Безопасность, данные, цифровая этика','Собственный AI-проект с защитой','Карта навыков + расширенный отчёт'] },
  { name:'Личное',    desc:'Индивидуальная траектория для сильных и нестандартных учеников', amount:'По запросу',unit:null,      popular:false, btnClass:'gl', btnText:'Обсудить',
    features:['Диагностика + личная карта целей','Гибкое расписание и темп','Наставничество 1-на-1','Глубокий разбор интересов ребёнка','Полный отчёт + рекомендации по развитию'] },
]

export default function Pricing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      s: Math.random() * 1.4 + .4, o: Math.random() * .35 + .05,
    }))
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${p.o})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const go = () => document.getElementById('записаться')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="kim-section pricing-section" id="цены">
      <canvas ref={canvasRef} className="pricing-canvas" />
      <div className="kim-container pricing-inner">
        <div className="kim-section-inner">
          <span className="kim-eyebrow">Стоимость</span>
          <h2 className="kim-h2" style={{ marginBottom: 12 }}>Выберите программу</h2>
          <p className="kim-body" style={{ color: 'rgba(255,255,255,.45)', maxWidth: 480 }}>
            Начните с бесплатной диагностики — уточним уровень, цели и подберём формат.
          </p>
          <div className="pricing-grid">
            {plans.map(p => (
              <div className={`pcard${p.popular ? ' pop' : ''}`} key={p.name}>
                {p.popular && <div className="pop-badge">Популярный</div>}
                <div className="pcard-name">{p.name}</div>
                <div className="pcard-desc">{p.desc}</div>
                <div className="pcard-amount">
                  <span className={`pcard-num${p.unit ? '' : ' sm'}`}>{p.amount}</span>
                  {p.unit && <span className="pcard-unit">{p.unit}</span>}
                </div>
                <div className="pcard-divider" />
                <ul className="pcard-features" style={{ listStyle: 'none' }}>
                  {p.features.map(f => <li className="pf" key={f}><CheckIcon />{f}</li>)}
                </ul>
                <button className={`pbtn ${p.btnClass}`} onClick={go}>{p.btnText}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
