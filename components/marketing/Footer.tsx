import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="school-footer">
      <div className="kim-container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">KIM<span>.</span>SCHOOL</div>
            <div className="footer-sub">kim-ai-school.ru · KIM.agency с 2015</div>
          </div>
          <div style={{ display:'flex', gap:24, alignItems:'center' }}>
            <Link href="/login" className="kim-small" style={{ color:'rgba(255,255,255,.25)', textDecoration:'none', transition:'color .15s' }}>
              Личный кабинет
            </Link>
            <span className="kim-small" style={{ color:'rgba(255,255,255,.15)' }}>
              © 2024–2025 KIM AI School
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
