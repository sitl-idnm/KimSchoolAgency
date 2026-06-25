'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <nav className={`school-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="kim-container">
        <div className="school-nav-inner">
          <Link href="/" className="school-nav-logo">KIM<span>.</span>SCHOOL</Link>

          <ul className="school-nav-links">
            {[['методология','Методология'],['программа','Программа'],['цены','Цены'],['наставник','Наставник'],['faq','FAQ']].map(([id,label]) => (
              <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>{label}</a></li>
            ))}
          </ul>

          <Link href="/login" className="school-nav-login">Войти</Link>
          <a href="#записаться" className="kim-btn kim-btn--primary kim-btn--sm school-nav-cta" onClick={e => { e.preventDefault(); go('записаться') }}>
            Записаться
          </a>

          <button className="burger" aria-label="Меню" onClick={() => setOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-nav${open ? ' open' : ''}`}>
        {[['методология','Методология'],['программа','Программа'],['наставник','Наставник'],['faq','FAQ']].map(([id,label]) => (
          <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>{label}</a>
        ))}
        <Link href="/login" onClick={() => setOpen(false)}>Войти</Link>
        <a href="#записаться" className="cta" onClick={e => { e.preventDefault(); go('записаться') }}>Записаться →</a>
      </div>
    </nav>
  )
}
