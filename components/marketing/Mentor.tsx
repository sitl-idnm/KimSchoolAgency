const stats = [
  { n:'200+', l:'Проектов агентства' },
  { n:'2015', l:'Год основания KIM.agency' },
  { n:'2023', l:'AI-практика с года' },
  { n:'2022', l:'Наставничество с года' },
]
const chips  = ['200+ проектов','AI с 2023','ТПП Москвы','Наставник с 2022']
const media  = ['Москва 24','РБК','Сбер Про Медиа','Sostav','Т-Бизнес','Шмаркетинг']

export default function Mentor() {
  return (
    <section className="kim-section kim-section--dark" id="наставник">
      <div className="kim-container">
        <div className="kim-section-inner">
          <div className="mentor-grid">
            <div>
              <div className="mentor-photo">
                <div className="mentor-ava">КК</div>
                <div className="mentor-ava-name">Константин Ким</div>
                <div className="mentor-ava-role">Основатель KIM.agency</div>
                <div className="mentor-chips">
                  {chips.map(c => <span className="mchip" key={c}>{c}</span>)}
                </div>
              </div>
            </div>
            <div>
              <span className="kim-eyebrow">Наставник</span>
              <h2 className="kim-h2" style={{ marginBottom: 8 }}>Константин Ким</h2>
              <p className="kim-body" style={{ color: 'rgba(255,255,255,.4)', marginBottom: 20 }}>
                Предприниматель, стратег, основатель KIM.agency<br />
                Член ТПП Москвы · KIM.agency с 2015 года
              </p>
              <p className="kim-body" style={{ color: 'rgba(255,255,255,.55)', marginBottom: 28 }}>
                Практик AI-внедрений в бизнесе с 2023 года. Работает с нейросетями в
                маркетинге, продажах, аналитике и стратегии. Не объясняет теорию ради
                теории — показывает, как ИИ работает в реальных задачах.
                <br /><br />
                Запустил KIM AI School, потому что увидел: дети используют ИИ неправильно,
                а родители не знают, как помочь. Это решаемо — нужна правильная методология
                и живой наставник.
              </p>
              <div className="mentor-stats">
                {stats.map(s => (
                  <div className="mentor-stat" key={s.n}>
                    <div className="mentor-stat-n">{s.n}</div>
                    <div className="mentor-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
              <span className="kim-eyebrow" style={{ marginBottom: 8 }}>Медиа и выступления</span>
              <div className="media-badges">
                {media.map(m => <span className="mbadge" key={m}>{m}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
