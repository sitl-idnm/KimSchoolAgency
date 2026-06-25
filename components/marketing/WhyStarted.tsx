export default function WhyStarted() {
  return (
    <section className="kim-section kim-section--dark">
      <div className="kim-container">
        <div className="kim-section-inner">
          <div className="why-inner">
            <span className="kim-eyebrow">Почему я запустил эту школу</span>
            <blockquote className="kim-quote" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'var(--kim-red)', fontSize: 'clamp(17px,2vw,22px)', fontStyle: 'italic', marginBottom: 28, textAlign: 'left', maxWidth: 680, margin: '0 auto 28px' }}>
              Я вижу, как ИИ меняет бизнес, маркетинг, продажи, аналитику. Но дети
              знакомятся с нейросетями хаотично: как сделать домашку, как обойти проверку.
              Ребёнка нужно научить не списывать, а думать в новой среде: ставить задачу,
              проверять результат, видеть ошибки, защищать данные и создавать проекты.
            </blockquote>
            <div className="why-sig">— Константин Ким <span>· Основатель KIM.agency</span></div>
            <div className="why-video">
              <div className="why-play" />
              <div className="why-video-label">2 минуты: почему я делаю эту школу</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
