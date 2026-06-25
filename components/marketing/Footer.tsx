'use client'
import Link from 'next/link'
import Logo from '@/components/Logo'

/* Footer — точно по standoff §FOOTER: 3-col dark */
export default function Footer() {
  return (
    <footer style={{ background:'#16181B', color:'#fff' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'64px var(--sp)' }}>
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:48, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.1)' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:22 }}>
              <Logo variant="light" height={28} />
            </div>
            <p style={{ font:"400 16px/1.6 'Manrope'", color:'rgba(255,255,255,0.55)', margin:0, maxWidth:320 }}>
              Онлайн-школа AI-мышления для подростков 12–17 лет. Учим думать, проверять и создавать проекты.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div style={{ font:"600 12px/1 'Inter Tight'", letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:20 }}>Навигация</div>
            <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
              {[['методология','Методология'],['программа','Программа'],['цены','Цены'],['faq','FAQ']].map(([id,label]) => (
                <a key={id} href={`#${id}`}
                  onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ font:"400 16px/1 'Manrope'", color:'rgba(255,255,255,0.75)', textDecoration:'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color='#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.75)')}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div style={{ font:"600 12px/1 'Inter Tight'", letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:20 }}>Контакты</div>
            <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
              <Link href="/login" style={{ font:"500 16px/1 'Manrope'", color:'rgba(255,255,255,0.75)', textDecoration:'none' }}>Личный кабинет</Link>
              <a href="https://t.me/kimaibot" target="_blank" rel="noopener noreferrer"
                style={{ font:"500 16px/1 'Manrope'", color:'rgba(255,255,255,0.75)', textDecoration:'none' }}>
                Telegram
              </a>
              <div style={{ display:'flex', gap:10, marginTop:4 }}>
                {[
                  { label:'VK',       path:'M13.06 17.34c-5.48 0-8.97-3.86-9.11-10.27h2.78c.09 4.7 2.23 6.7 3.86 7.11V7.07h2.64v3.93c1.58-.18 3.24-2.02 3.8-3.93h2.6c-.43 2.35-2.2 4.19-3.45 4.95 1.25.62 3.27 2.22 4.05 5.32h-2.86c-.6-1.94-2.11-3.44-4.14-3.66v3.66h-.17z' },
                  { label:'Telegram', path:'M21.94 4.3 18.6 19.1c-.25 1.1-.91 1.37-1.84.85l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.02.5l.36-5.18L17.4 5.4c.41-.36-.09-.56-.63-.2L5.1 12.5l-5.02-1.57c-1.09-.34-1.11-1.09.23-1.61L20.53 2.7c.91-.34 1.7.2 1.41 1.6z' },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} style={{ width:38, height:38, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(-42deg,#CB172C,#E52D43)', textDecoration:'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d={s.path}/></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop:28, font:"400 14px/1.5 'Manrope'", color:'rgba(255,255,255,0.4)' }}>
          © 2024–2025 KIM AI School · KIM.agency с 2015
        </div>
      </div>
    </footer>
  )
}
