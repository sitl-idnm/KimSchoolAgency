'use client'

import { useState } from 'react'

const items = [
  { q:'Какой возраст подходит для курса?',               a:'Курс рассчитан на школьников 12–17 лет. Если ребёнок активно использует смартфон и интересуется технологиями — самое время.' },
  { q:'Нужен ли опыт с нейросетями?',                   a:'Нет. Мы начинаем с нуля и объясняем, как работает ИИ, прежде чем переходить к практике.' },
  { q:'Как проходят занятия?',                          a:'Онлайн, 1–2 раза в неделю, 60 минут. Живой наставник + экран ребёнка. Никаких записанных видео без обратной связи.' },
  { q:'Что получит родитель?',                          a:'После каждого занятия — короткий отчёт: что разобрали, что получилось, что повторить. В конце — полная карта навыков ребёнка.' },
  { q:'Чем отличается стартовый пакет от полного?',     a:'Стартовый (4 занятия) даёт базу. Полный (8 занятий) добавляет проекты, творчество, безопасность и собственный AI-проект с защитой.' },
  { q:'Как оплатить?',                                  a:'Картой через ЮKassa (все карты РФ, СБП, ЮMoney) или Stripe (международные). После диагностики пришлём ссылку на оплату.' },
  { q:'Можно ли вернуть деньги?',                       a:'Да. Если после первого занятия вам не понравилось — возвращаем 100% без вопросов.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="kim-section kim-section--soft" id="faq">
      <div className="kim-container">
        <span className="kim-eyebrow reveal">FAQ</span>
        <h2 className="kim-h2 reveal d1" style={{ marginBottom: 0 }}>Частые вопросы</h2>
        <div className="faq-list">
          {items.map((item, i) => (
            <div className={`fq reveal d${(i % 4) + 1}${open === i ? ' open' : ''}`} key={i}>
              <div className="fq-q" onClick={() => setOpen(open === i ? null : i)}>
                {item.q}
                <div className="fq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12" style={{ transition:'opacity .25s', opacity: open === i ? 0 : 1 }}/>
                  </svg>
                </div>
              </div>
              <div className="fq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
