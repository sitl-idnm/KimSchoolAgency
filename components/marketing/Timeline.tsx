const steps = [
  { n:'1', cls:'',      title:'Заявка от родителя',              sub:'Оставляете контакт на сайте' },
  { n:'2', cls:'',      title:'Короткая консультация',           sub:'15 минут — знакомство, ответы на вопросы' },
  { n:'3', cls:'red',   title:'Вводная диагностика ребёнка',     sub:'Уровень, интересы, карта развития' },
  { n:'4', cls:'',      title:'Подбор программы',                sub:'Формат и темп — индивидуально' },
  { n:'5', cls:'',      title:'Занятия онлайн',                  sub:'4 или 8 занятий, 1–2 раза в неделю' },
  { n:'6', cls:'accent',title:'AI-проект ребёнка',               sub:'Личный проект на интересную тему' },
  { n:'7', cls:'accent',title:'Итоговый отчёт для родителя',     sub:'Что освоил, навыки, рекомендации' },
]

export default function Timeline() {
  return (
    <section className="kim-section kim-section--soft">
      <div className="kim-container">
        <span className="kim-eyebrow">Как всё устроено</span>
        <h2 className="kim-h2" style={{ marginBottom: 0 }}>7 шагов от заявки до результата</h2>
        <div className="tl">
          {steps.map(s => (
            <div className="tl-item" key={s.n}>
              <div className={`tl-circle${s.cls ? ` ${s.cls}` : ''}`}>{s.n}</div>
              <div style={{ paddingTop: 6 }}>
                <div className="kim-h3" style={{ fontSize: 15, marginBottom: 3 }}>{s.title}</div>
                <p className="kim-small">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
