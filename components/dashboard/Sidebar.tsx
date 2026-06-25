'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

const nav = [
  { group:'Обучение', items:[
    { href:'/dashboard',         label:'Главная',    icon:<HomeIcon /> },
    { href:'/dashboard/courses', label:'Мои курсы',  icon:<CoursesIcon /> },
  ]},
  { group:'Аккаунт', items:[
    { href:'/dashboard/profile',  label:'Профиль',  icon:<ProfileIcon /> },
    { href:'/dashboard/payments', label:'Платежи',  icon:<PaymentsIcon /> },
  ]},
]

export default function Sidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname()
  const router   = useRouter()

  const logout = async () => {
    await createClient().auth.signOut()
    router.push('/'); router.refresh()
  }

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-logo">
        <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center' }}>
          <Logo variant="dark" height={24} />
        </Link>
      </div>

      <nav className="dash-sidebar-nav">
        {nav.map(g => (
          <div key={g.group}>
            <div className="dash-nav-group-label">{g.group}</div>
            {g.items.map(item => {
              const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href} className={`dash-nav-item${active ? ' active' : ''}`}>
                  <span className="dash-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding:'16px 20px', borderTop:'1px solid var(--kim-border)' }}>
        {userName && <div className="kim-small" style={{ fontWeight:600, marginBottom:8, color:'var(--kim-ink)' }}>{userName}</div>}
        <button onClick={logout} className="kim-small" style={{ background:'none', border:'none', cursor:'pointer', color:'var(--kim-muted)', padding:0 }}>
          Выйти →
        </button>
      </div>
    </aside>
  )
}

function HomeIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function CoursesIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> }
function ProfileIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function PaymentsIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> }
