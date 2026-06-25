'use client'

import { useEffect, useRef } from 'react'

const CheckIcon = () => (
  <svg className="pf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const plans = [
  {
    name: 'Стартовый',
    desc: 'Базовая AI-грамотность и первый результат уже после 4 занятий',
    amount: '4',
    unit: 'занятия',
    popular: false,
    features: [
      'Вводная диагностика + карта развития',
      'Как работает ИИ и почему ошибается',
      'Запросы и промпты на практике',
      'ИИ для учёбы без списывания',
      'Личная prompt-карта',
      'Отчёт родителю после каждого занятия',
    ],
    btnClass: 'gl',
    btnText: 'Записаться',
  },
  {
    name: 'Полная',
    desc: 'Полный навык + собственный AI-проект с финальной защитой',
    amount: '8',
    unit: 'занятий',
    popular: true,
    features: [
      'Всё из стартового пакета',
      'Проверка фактов и критическое мышление',
      'Презентации и исследовательские проекты',
      'Изображения, тексты, идеи с ИИ',
      'Безопасность, данные, цифровая этика',
      'Собственный AI-проект с защитой',
      'Карта навыков + расширенный отчёт',
    ],
    btnClass: 'cy',
    btnText: 'Записаться',
  },
  {
    name: 'Личное',
    desc: 'Индивидуальная траектория для сильных и нестандартных учеников',
    amount: 'По запросу',
    unit: null,
    popular: false,
    features: [
      'Диагностика + личная карта целей',
      'Гибкое расписание и темп',
      'Наставничество 1-на-1',
      'Глубокий разбор интересов ребёнка',
      'Полный отчёт + рекомендации по развитию',
    ],
    btnClass: 'gl',
    btnText: 'Обсудить',
  },
]

export default function Pricing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${p.opacity})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToForm = () =>
    document.getElementById('записаться')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="pricing-sec" id="цены">
      <canvas ref={canvasRef} className="pricing-canvas-el" />
      <div className="wrap pricing-in">
        <span className="lbl cy">Стоимость</span>
        <h2 className="h2 lt">Выберите программу</h2>
        <p className="sub lt">Начните с бесплатной диагностики — уточним уровень, цели и подберём формат.</p>
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
              <ul className="pcard-features">
                {p.features.map(f => (
                  <li className="pf" key={f}><CheckIcon />{f}</li>
                ))}
              </ul>
              <button className={`pbtn ${p.btnClass}`} onClick={scrollToForm}>
                {p.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
