'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const textRef = useRef<HTMLSpanElement>(null)
  const curRef = useRef<HTMLSpanElement>(null)
  const sendRef = useRef<HTMLDivElement>(null)
  const chk1Ref = useRef<HTMLDivElement>(null)
  const chk2Ref = useRef<HTMLDivElement>(null)
  const resRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prompt = 'Как работают нейросети? Объясни просто.'
    let i = 0
    let phase = 0

    const typeInterval = setInterval(() => {
      if (phase === 0) {
        if (i <= prompt.length) {
          if (textRef.current) textRef.current.textContent = prompt.slice(0, i)
          i++
        } else {
          clearInterval(typeInterval)
          if (sendRef.current) sendRef.current.style.display = 'block'
          if (curRef.current) curRef.current.style.display = 'none'
          setTimeout(() => {
            if (chk1Ref.current) chk1Ref.current.classList.add('show')
            setTimeout(() => {
              if (chk2Ref.current) chk2Ref.current.classList.add('show')
              setTimeout(() => {
                if (resRef.current) resRef.current.classList.add('show')
              }, 600)
            }, 600)
          }, 600)
        }
      }
    }, 55)

    return () => clearInterval(typeInterval)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero gbg">
      <div className="hero-in">
        <div className="hero-left">
          <div className="hero-pill">Для школьников 12–17 лет</div>
          <h1 className="hero-h1">
            Школа<br /><span className="ai">AI</span>-мышления<br />для подростков
          </h1>
          <p className="hero-sub">
            Учим не просто пользоваться нейросетями, а думать, проверять, создавать
            проекты и безопасно работать с ИИ.
          </p>
          <div className="hero-btns">
            <button className="btn btn-red" onClick={() => scrollTo('записаться')}>
              Записаться на диагностику
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('программа')}>
              Посмотреть программу
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hstat-n">200+</div>
              <div className="hstat-l">Проектов</div>
            </div>
            <div>
              <div className="hstat-n">2015</div>
              <div className="hstat-l">KIM.agency</div>
            </div>
            <div>
              <div className="hstat-n">4–8</div>
              <div className="hstat-l">Занятий</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo">
            <div className="photo-hint">Фото наставника</div>
            <div className="photo-mono">КК</div>
            <div className="photo-name">Константин Ким</div>
            <div className="photo-role">Основатель KIM.agency</div>
          </div>

          <div className="ai-card">
            <div className="ai-hdr">
              <div className="ai-dots">
                <span /><span /><span />
              </div>
              <span className="ai-htitle">KIM AI School</span>
              <span className="ai-live">
                <span className="ai-live-dot" />Онлайн
              </span>
            </div>
            <div className="ai-body">
              <div className="ai-step">
                <span className="ai-snum">01</span>
                <div className="ai-sc">
                  <div className="ai-slbl">Запрос</div>
                  <div className="ai-prompt">
                    <span ref={textRef} />
                    <span className="ai-cursor" ref={curRef}>|</span>
                    <div className="ai-send" ref={sendRef} style={{ display: 'none' }}>
                      Отправить →
                    </div>
                  </div>
                </div>
              </div>
              <div className="ai-div" />
              <div className="ai-step">
                <span className="ai-snum">02</span>
                <div className="ai-sc">
                  <div className="ai-slbl">Проверка</div>
                  <div className="ai-checks">
                    <div className="ai-chk ok" ref={chk1Ref}>
                      <div className="ai-ci">✓</div>
                      <span>Аргументы проверены</span>
                    </div>
                    <div className="ai-chk warn" ref={chk2Ref}>
                      <div className="ai-ci">!</div>
                      <span>Источник нужно уточнить</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ai-div" />
              <div className="ai-step">
                <span className="ai-snum">03</span>
                <div className="ai-sc">
                  <div className="ai-slbl">Результат</div>
                  <div className="ai-res" ref={resRef}>
                    <div>
                      <div className="ai-rt">Проект готов к защите</div>
                      <div className="ai-rs">Черновик доработан ребёнком</div>
                    </div>
                    <div className="ai-rb">ГОТОВО</div>
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
