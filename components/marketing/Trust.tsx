const items = [
  { n: '200+', l: 'Проектов KIM.agency' },
  { n: '2015', l: 'Год основания' },
  { n: '4–8',  l: 'Занятий в программе' },
  { n: '12–17',l: 'Возраст учеников' },
]

export default function Trust() {
  return (
    <div className="trust-bar">
      <div className="kim-container">
        <div className="trust-grid">
          {items.map(i => (
            <div className="trust-item" key={i.l}>
              <div className="kim-stat-num" style={{ color: 'var(--kim-ink)' }}>{i.n}</div>
              <div className="kim-small" style={{ textTransform: 'uppercase', letterSpacing: '.9px', marginTop: 4 }}>{i.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
