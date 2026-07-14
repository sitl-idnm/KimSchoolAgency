'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'kim_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch { /* localStorage unavailable — stay hidden */ }
  }, [])

  const accept = () => {
    try { localStorage.setItem(KEY, new Date().toISOString()) } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position:'fixed', left:16, right:16, bottom:16, zIndex:9999,
      maxWidth:720, margin:'0 auto',
      background:'#fff', border:'1px solid #ededed', borderRadius:16,
      boxShadow:'0 12px 40px rgba(0,0,0,.12)',
      padding:'18px 22px',
      display:'flex', alignItems:'center', gap:18, flexWrap:'wrap',
    }}>
      <div style={{ flex:1, minWidth:240, font:"400 14px/1.5 'Manrope'", color:'#52555B' }}>
        Мы используем файлы cookie и сервисы аналитики, чтобы сайт работал лучше. Продолжая пользоваться сайтом,
        вы соглашаетесь с{' '}
        <Link href="/privacy" style={{ color:'#CB172C', textDecoration:'none' }}>Политикой конфиденциальности</Link>.
      </div>
      <button onClick={accept} style={{
        flexShrink:0, padding:'12px 26px', borderRadius:8, border:'none', cursor:'pointer',
        background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff',
        font:"500 15px/1 'Inter Tight'",
      }}>
        Принять
      </button>
    </div>
  )
}
