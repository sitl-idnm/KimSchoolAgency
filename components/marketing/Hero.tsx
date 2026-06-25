'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const textRef = useRef<HTMLSpanElement>(null)
  const curRef  = useRef<HTMLSpanElement>(null)
  const sendRef = useRef<HTMLDivElement>(null)
  const chk1Ref = useRef<HTMLDivElement>(null)
  const chk2Ref = useRef<HTMLDivElement>(null)
  const resRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prompt = 'Как работают нейросети? Объясни просто.'
    let i = 0
    const t = setInterval(() => {
      if (i <= prompt.length) {
        if (textRef.current) textRef.current.textContent = prompt.slice(0, i)
        i++
      } else {
        clearInterval(t)
        if (sendRef.current) sendRef.current.style.display = 'block'
        if (curRef.current)  curRef.current.style.display  = 'none'
        setTimeout(() => {
          chk1Ref.current?.classList.add('show')
          setTimeout(() => {
            chk2Ref.current?.classList.add('show')
            setTimeout(() => resRef.current?.classList.add('show'), 600)
          }, 600)
        }, 600)
      }
    }, 55)
    return () => clearInterval(t)
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero-section">
      <div className="hero-inner">

        {/* Left */}
        <div>
          <div className="hero-pill">Для школьников 12–17 лет</div>
          <h1 className="kim-h1" style={{ color: '#f1f2f4', marginBottom: 20, fontSize: 'clamp(38px,5vw,68px)' }}>
            Школа<br /><span style={{ color: 'var(--cy)' }}>AI</span>-мышления<br />для подростков
          </h1>
          <p className="kim-body" style={{ color: 'rgba(255,255,255,.5)', maxWidth: 460, marginBottom: 36 }}>
            Учим не просто пользоваться нейросетями, а думать, проверять, создавать
            проекты и безопасно работать с ИИ.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <button className="kim-btn kim-btn--primary kim-btn--lg" onClick={() => go('записаться')}>
              Записаться на диагностику
            </button>
            <button className="kim-btn kim-btn--ghost" onClick={() => go('программа')}
              style={{ color: 'rgba(255,255,255,.6)', borderColor: 'rgba(255,255,255,.18)' }}>
              Посмотреть программу
            </button>
          </div>
          <div className="hero-stats">
            {[['200+','Проектов'],['2015','KIM.agency'],['4–8','Занятий']].map(([n,l]) => (
              <div key={l}>
                <div className="hero-stat-n">{n}</div>
                <div className="hero-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="hero-right">
          <div className="hero-photo">
            <div className="hero-photo-hint">Фото наставника</div>
            <div className="hero-ava">КК</div>
            <div className="hero-photo-name">Константин Ким</div>
            <div className="hero-photo-role">Основатель KIM.agency</div>
          </div>

          <div className="ai-card">
            <div className="ai-card-hdr">
              <div className="ai-dots"><span /><span /><span /></div>
              <span className="ai-card-title">KIM AI School</span>
              <span className="ai-card-live"><span className="ai-live-dot" />Онлайн</span>
            </div>
            <div className="ai-card-body">
              <div className="ai-step">
                <span className="ai-step-num">01</span>
                <div className="ai-step-content">
                  <div className="ai-step-label">Запрос</div>
                  <div className="ai-prompt">
                    <span ref={textRef} />
                    <span className="ai-cursor" ref={curRef}>|</span>
                    <div className="ai-send" ref={sendRef} style={{ display: 'none' }}>Отправить →</div>
                  </div>
                </div>
              </div>
              <hr className="ai-divider" />
              <div className="ai-step">
                <span className="ai-step-num">02</span>
                <div className="ai-step-content">
                  <div className="ai-step-label">Проверка</div>
                  <div className="ai-checks">
                    <div className="ai-chk ok" ref={chk1Ref}><div className="ai-ci">✓</div><span>Аргументы проверены</span></div>
                    <div className="ai-chk warn" ref={chk2Ref}><div className="ai-ci">!</div><span>Источник нужно уточнить</span></div>
                  </div>
                </div>
              </div>
              <hr className="ai-divider" />
              <div className="ai-step">
                <span className="ai-step-num">03</span>
                <div className="ai-step-content">
                  <div className="ai-step-label">Результат</div>
                  <div className="ai-result" ref={resRef}>
                    <div>
                      <div className="ai-result-text">Проект готов к защите</div>
                      <div className="ai-result-sub">Черновик доработан ребёнком</div>
                    </div>
                    <div className="ai-result-badge">ГОТОВО</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
