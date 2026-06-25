'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

const nav = [
  {
    group: 'Обучение',
    items: [
      { href:'/dashboard',         label:'Обзор',       Icon:HomeIcon },
      { href:'/dashboard/courses', label:'Мои курсы',   Icon:CoursesIcon },
    ],
  },
  {
    group: 'Аккаунт',
    items: [
      { href:'/dashboard/profile',  label:'Профиль',    Icon:ProfileIcon },
      { href:'/dashboard/payments', label:'Платежи',    Icon:PayIcon },
    ],
  },
]

export default function Sidebar({ userName, userEmail }: { userName?: string | null; userEmail?: string | null }) {
  const pathname = usePathname()
  const router   = useRouter()

  const logout = async () => {
    await createClient().auth.signOut()
    router.push('/'); router.refresh()
  }

  const initial = (userName || userEmail || 'U')[0].toUpperCase()

  return (
    <aside style={{ width:240, flexShrink:0, background:'#fff', borderRight:'1px solid #ededed', display:'flex', flexDirection:'column', position:'fixed', top:0, bottom:0, overflowY:'auto' }}>
      {/* Logo */}
      <div style={{ padding:'22px 24px', borderBottom:'1px solid #ededed' }}>
        <Link href="/" style={{ textDecoration:'none', display:'inline-flex' }}>
          <Logo variant="dark" height={24} />
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding:'12px 0', flex:1 }}>
        {nav.map(g => (
          <div key={g.group} style={{ marginBottom:4 }}>
            <div style={{ font:"700 10px/1 'Inter Tight'", letterSpacing:'1.2px', textTransform:'uppercase', color:'#8A8D93', padding:'10px 24px 4px' }}>
              {g.group}
            </div>
            {g.items.map(item => {
              const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href} style={{
                  display:'flex', alignItems:'center', gap:10, padding:'10px 24px',
                  font:"500 14px/1 'Inter Tight'", textDecoration:'none',
                  color: active ? '#CB172C' : '#52555B',
                  borderLeft: `2px solid ${active ? '#CB172C' : 'transparent'}`,
                  background: active ? 'rgba(203,23,44,.04)' : 'transparent',
                  transition:'all .15s',
                }}>
                  <item.Icon active={active} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div style={{ padding:'16px 24px', borderTop:'1px solid #ededed' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
          <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:13, color:'#fff', flexShrink:0 }}>
            {initial}
          </div>
          <div style={{ overflow:'hidden' }}>
            {userName && <div style={{ font:"600 13px/1 'Inter Tight'", color:'#16181B', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{userName}</div>}
            {userEmail && <div style={{ font:"400 11px/1 'Manrope'", color:'#8A8D93', marginTop:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{userEmail}</div>}
          </div>
        </div>
        <button onClick={logout} style={{ background:'none', border:'none', cursor:'pointer', font:"400 13px/1 'Manrope'", color:'#8A8D93', padding:0, transition:'color .15s' }}
          onMouseEnter={e => (e.currentTarget.style.color='#CB172C')}
          onMouseLeave={e => (e.currentTarget.style.color='#8A8D93')}>
          Выйти из аккаунта →
        </button>
      </div>
    </aside>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#CB172C' : '#8A8D93'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function CoursesIcon({ active }: { active: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#CB172C' : '#8A8D93'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
}
function ProfileIcon({ active }: { active: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#CB172C' : '#8A8D93'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function PayIcon({ active }: { active: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#CB172C' : '#8A8D93'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
}
