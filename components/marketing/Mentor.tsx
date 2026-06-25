const stats = [
  { n: '200+', l: 'Проектов агентства' },
  { n: '2015', l: 'Год основания KIM.agency' },
  { n: '2023', l: 'AI-практика с года' },
  { n: '2022', l: 'Наставничество с года' },
]

const media = ['Москва 24', 'РБК', 'Сбер Про Медиа', 'Sostav', 'Т-Бизнес', 'Шмаркетинг']

const chips = ['200+ проектов', 'AI с 2023', 'ТПП Москвы', 'Наставник с 2022']

export default function Mentor() {
  return (
    <section className="sec dark gbg" id="наставник">
      <div className="wrap">
        <div className="mentor-in">
          <div>
            <div className="mentor-photo">
              <div className="mentor-ava">КК</div>
              <div className="mentor-ph-name">Константин Ким</div>
              <div className="mentor-ph-role">Основатель KIM.agency</div>
              <div className="mentor-chips">
                {chips.map(c => <span className="mchip" key={c}>{c}</span>)}
              </div>
            </div>
          </div>
          <div className="mentor-content">
            <span className="lbl dim">Наставник</span>
            <h2 className="mentor-name">Константин Ким</h2>
            <div className="mentor-title">
              Предприниматель, стратег, основатель KIM.agency<br />
              Член ТПП Москвы · KIM.agency с 2015 года
            </div>
            <p className="mentor-bio">
              Практик AI-внедрений в бизнесе с 2023 года. Работает с нейросетями в маркетинге,
              продажах, аналитике и стратегии. Не объясняет теорию ради теории — показывает,
              как ИИ работает в реальных задачах.
              <br /><br />
              Запустил KIM AI School, потому что увидел: дети используют ИИ неправильно, а
              родители не знают, как помочь. Это решаемо — нужна правильная методология и
              живой наставник.
            </p>
            <div className="mentor-stats">
              {stats.map(s => (
                <div className="mstat" key={s.n}>
                  <div className="mstat-n">{s.n}</div>
                  <div className="mstat-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div>
              <span className="lbl dim">Медиа и выступления</span>
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
