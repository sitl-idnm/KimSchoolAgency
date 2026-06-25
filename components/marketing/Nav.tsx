'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scroll = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' on' : ''}`}>
      <div className="wrap">
        <div className="nav-in">
          <a href="#" className="nav-logo">KIM <span>AI</span> School</a>
          <ul className="nav-links">
            <li><a href="#методология" onClick={e => { e.preventDefault(); scroll('методология') }}>Методология</a></li>
            <li><a href="#программа" onClick={e => { e.preventDefault(); scroll('программа') }}>Программа</a></li>
            <li><a href="#цены" onClick={e => { e.preventDefault(); scroll('цены') }}>Цены</a></li>
            <li><a href="#наставник" onClick={e => { e.preventDefault(); scroll('наставник') }}>Наставник</a></li>
            <li><a href="#faq" onClick={e => { e.preventDefault(); scroll('faq') }}>FAQ</a></li>
          </ul>
          <Link href="/login" className="nav-links" style={{ marginLeft: 0 }}>
            <a style={{ fontSize: 14, fontWeight: 500, color: '#9ca3af' }}>Войти</a>
          </Link>
          <a
            href="#записаться"
            className="nav-cta"
            onClick={e => { e.preventDefault(); scroll('записаться') }}
          >
            Записаться
          </a>
          <button
            className="burger"
            aria-label="Меню"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mnav${menuOpen ? ' open' : ''}`}>
        <a href="#методология" onClick={e => { e.preventDefault(); scroll('методология') }}>Методология</a>
        <a href="#программа" onClick={e => { e.preventDefault(); scroll('программа') }}>Программа</a>
        <a href="#наставник" onClick={e => { e.preventDefault(); scroll('наставник') }}>Наставник</a>
        <a href="#faq" onClick={e => { e.preventDefault(); scroll('faq') }}>FAQ</a>
        <Link href="/login" style={{ padding: '12px 28px', fontSize: 15, fontWeight: 500, color: '#8d9198', borderBottom: '1px solid #252830', display: 'block' }}>Войти</Link>
        <a href="#записаться" className="hot" onClick={e => { e.preventDefault(); scroll('записаться') }}>Записаться →</a>
      </div>
    </nav>
  )
}
