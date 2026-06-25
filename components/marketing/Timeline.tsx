const steps = [
  { n: '1', cls: '', title: 'Заявка от родителя', sub: 'Оставляете контакт на сайте' },
  { n: '2', cls: '', title: 'Короткая консультация', sub: '15 минут — знакомство, ответы на вопросы' },
  { n: '3', cls: 'r', title: 'Вводная диагностика ребёнка', sub: 'Уровень, интересы, карта развития' },
  { n: '4', cls: '', title: 'Подбор программы', sub: 'Формат и темп — индивидуально' },
  { n: '5', cls: '', title: 'Занятия онлайн', sub: '4 или 8 занятий, 1–2 раза в неделю' },
  { n: '6', cls: 'a', title: 'AI-проект ребёнка', sub: 'Личный проект на интересную тему' },
  { n: '7', cls: 'a', title: 'Итоговый отчёт для родителя', sub: 'Что освоил, навыки, рекомендации' },
]

export default function Timeline() {
  return (
    <section className="sec alt">
      <div className="wrap">
        <span className="kim-eyebrow">Как всё устроено</span>
        <h2 className="h2">7 шагов от заявки до результата</h2>
        <div className="tl">
          {steps.map(s => (
            <div className="tli" key={s.n}>
              <div className={`tli-c${s.cls ? ` ${s.cls}` : ''}`}>{s.n}</div>
              <div>
                <div className="tli-title">{s.title}</div>
                <div className="tli-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
