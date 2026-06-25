'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  {
    group: 'Обучение',
    items: [
      { href: '/dashboard', label: 'Главная', icon: HomeIcon },
      { href: '/dashboard/courses', label: 'Мои курсы', icon: CoursesIcon },
      { href: '/dashboard/artifacts', label: 'Артефакты', icon: ArtifactsIcon },
    ],
  },
  {
    group: 'Аккаунт',
    items: [
      { href: '/dashboard/profile', label: 'Профиль', icon: ProfileIcon },
      { href: '/dashboard/payments', label: 'Платежи', icon: PaymentsIcon },
    ],
  },
]

export default function Sidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="dash-sidebar">
      <div className="dash-logo">
        <Link href="/">
          <div className="dash-logo-name">KIM <span>AI</span> School</div>
        </Link>
      </div>

      <nav className="dash-nav">
        {navItems.map(group => (
          <div className="dash-nav-group" key={group.group}>
            <div className="dash-nav-label">{group.group}</div>
            {group.items.map(item => {
              const active = pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`dash-nav-item${active ? ' active' : ''}`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--kim-border)' }}>
        {userName && (
          <div style={{ fontSize: 13, color: 'var(--kim-body)', marginBottom: 10, fontWeight: 500 }}>
            {userName}
          </div>
        )}
        <button
          onClick={logout}
          style={{ fontSize: 13, color: 'var(--kim-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          Выйти →
        </button>
      </div>
    </aside>
  )
}

function HomeIcon() {
  return (
    <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function CoursesIcon() {
  return (
    <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function ArtifactsIcon() {
  return (
    <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
function ProfileIcon() {
  return (
    <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function PaymentsIcon() {
  return (
    <svg className="dash-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}
