import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="ft-in">
          <div>
            <div className="ft-brand">KIM AI School</div>
            <div className="ft-domain">kim-ai-school.ru · KIM.agency с 2015</div>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/login" style={{ fontSize: 13, color: '#4a4d54', transition: 'color .15s' }}>
              Личный кабинет
            </Link>
            <span className="ft-copy">© 2024–2025 KIM AI School</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
