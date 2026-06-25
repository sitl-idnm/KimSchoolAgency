'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

const links = [
  ['методология','Методология'],
  ['программа','Программа'],
  ['цены','Цены'],
  ['наставник','Наставник'],
  ['faq','FAQ'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }

  return (
    <div className="mob-nav-wrap">
      {/* Desktop header — точно по standoff */}
      <header style={{ background:'rgba(255,255,255,0.86)', backdropFilter:'blur(14px)', borderBottom:'1px solid #ededed' }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'18px var(--sp)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24 }}>
          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none', flex:'none' }}>
            <Logo variant="dark" height={32} />
          </Link>

          {/* Nav links */}
          <nav className="desk-nav" style={{ display:'flex', alignItems:'center', gap:34 }}>
            {links.map(([id,label]) => (
              <a key={id} href={`#${id}`}
                onClick={e => { e.preventDefault(); go(id) }}
                style={{ font:"500 16px/1 'Inter Tight'", color:'#16181B', textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='#CB172C')}
                onMouseLeave={e => (e.currentTarget.style.color='#16181B')}
              >{label}</a>
            ))}
          </nav>

          {/* Right: login + CTA + burger */}
          <div style={{ display:'flex', alignItems:'center', gap:12, flex:'none' }}>
            <Link href="/login"
              className="desk-nav"
              style={{ font:"500 16px/1 'Inter Tight'", color:'#8A8D93', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='#16181B')}
              onMouseLeave={e => (e.currentTarget.style.color='#8A8D93')}
            >Войти</Link>
            <a href="#записаться" className="desk-nav"
              onClick={e => { e.preventDefault(); go('записаться') }}
              style={{ marginLeft:6, display:'inline-flex', alignItems:'center', padding:'14px 24px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#FAFAFA', font:"500 16px/1 'Inter Tight'", textDecoration:'none', whiteSpace:'nowrap' }}
            >Записаться</a>
            <button className="burger" aria-label="Меню" onClick={() => setOpen(v => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mob-menu${open ? ' open' : ''}`}>
        {links.map(([id,label]) => (
          <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>{label}</a>
        ))}
        <Link href="/login" onClick={() => setOpen(false)}>Войти</Link>
        <a href="#записаться" className="cta" onClick={e => { e.preventDefault(); go('записаться') }}>Записаться →</a>
      </div>
    </div>
  )
}
