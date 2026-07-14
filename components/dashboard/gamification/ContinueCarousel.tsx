'use client'
import { useRef } from 'react'
import Link from 'next/link'

export type ContinueItem = {
  id: string
  title: string
  subtitle?: string
  tag?: string
  href: string
  gradient: string
}

/* Horizontal "continue learning" carousel with arrow controls. */
export default function ContinueCarousel({ items }: { items: ContinueItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:20, letterSpacing:'-0.4px', color:'#16181B' }}>
          Продолжить обучение
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {([-1, 1] as const).map(d => (
            <button key={d} onClick={() => scroll(d)} aria-label={d === -1 ? 'Назад' : 'Вперёд'}
              style={{ width:34, height:34, borderRadius:'50%', border:'1px solid #ededed', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#52555B', transition:'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#CB172C'; e.currentTarget.style.color='#CB172C' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#ededed'; e.currentTarget.style.color='#52555B' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: d === -1 ? 'rotate(180deg)' : 'none' }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div ref={trackRef} className="hide-scroll" style={{ display:'flex', gap:16, overflowX:'auto', scrollSnapType:'x mandatory', paddingBottom:4, scrollbarWidth:'none' }}>
        {items.map(item => (
          <Link key={item.id} href={item.href} style={{
            scrollSnapAlign:'start', flexShrink:0, width:300, minHeight:150,
            borderRadius:18, padding:'22px 24px', textDecoration:'none',
            background:item.gradient, color:'#fff',
            display:'flex', flexDirection:'column', justifyContent:'space-between',
            position:'relative', overflow:'hidden',
            transition:'transform .2s, box-shadow .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(0,0,0,.18)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
            <div>
              {item.tag && (
                <span style={{ display:'inline-block', font:"700 10px/1 'Inter Tight'", letterSpacing:'.5px', textTransform:'uppercase', background:'rgba(255,255,255,.18)', padding:'5px 10px', borderRadius:20, marginBottom:14 }}>
                  {item.tag}
                </span>
              )}
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:18, lineHeight:1.25 }}>{item.title}</div>
              {item.subtitle && <div style={{ font:"400 13px/1.4 'Manrope'", color:'rgba(255,255,255,.75)', marginTop:6 }}>{item.subtitle}</div>}
            </div>
            <div style={{ alignSelf:'flex-end', width:34, height:34, borderRadius:'50%', background:'rgba(255,255,255,.16)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
