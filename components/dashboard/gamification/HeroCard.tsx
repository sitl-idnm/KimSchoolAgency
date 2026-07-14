import { levelInfo } from '@/lib/gamification/levels'

/* Gamified dashboard hero: level ring avatar + XP progress + streak. Light KIM theme. */
export default function HeroCard({
  name, program, xp, streak, avatarUrl,
}: {
  name: string
  program?: string | null
  xp: number
  streak: number
  avatarUrl?: string | null
}) {
  const { level, intoLevel, levelSpan, progress, toNext } = levelInfo(xp)
  const pct = Math.round(progress * 100)
  const initial = (name || 'U')[0].toUpperCase()

  return (
    <div style={{
      position:'relative', overflow:'hidden',
      background:'linear-gradient(120deg,#16181B 0%,#1c1416 55%,#2a1418 100%)',
      borderRadius:24, padding:'32px 36px',
      display:'flex', alignItems:'center', gap:28, flexWrap:'wrap',
    }}>
      {/* soft brand glow */}
      <div style={{ position:'absolute', top:-80, right:-40, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(203,23,44,.35),transparent 70%)', pointerEvents:'none' }} />

      {/* Avatar with level ring */}
      <div style={{ position:'relative', flexShrink:0 }}>
        <div style={{
          width:96, height:96, borderRadius:'50%',
          background:`conic-gradient(#E52D43 ${pct * 3.6}deg, rgba(255,255,255,.12) 0deg)`,
          padding:4, boxSizing:'border-box',
        }}>
          <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:'#16181B', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
            {avatarUrl
              ? <img src={avatarUrl} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              : <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:34, color:'#fff' }}>{initial}</span>}
          </div>
        </div>
        <div style={{
          position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)',
          background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff',
          font:"700 12px/1 'Inter Tight'", padding:'5px 12px', borderRadius:20, whiteSpace:'nowrap',
          boxShadow:'0 4px 12px rgba(203,23,44,.4)',
        }}>
          lvl {level}
        </div>
      </div>

      {/* Name + XP bar */}
      <div style={{ flex:1, minWidth:240, position:'relative', zIndex:1 }}>
        <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:26, letterSpacing:'-0.6px', color:'#fff' }}>{name}</div>
        {program && <div style={{ font:"400 14px/1 'Manrope'", color:'rgba(255,255,255,.5)', marginTop:5 }}>{program}</div>}

        <div style={{ marginTop:18, maxWidth:420 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:7 }}>
            <span style={{ font:"600 13px/1 'Inter Tight'", color:'rgba(255,255,255,.85)' }}>{intoLevel} / {levelSpan} XP</span>
            <span style={{ font:"400 12px/1 'Manrope'", color:'rgba(255,255,255,.45)' }}>до {level + 1} уровня — {toNext} XP</span>
          </div>
          <div style={{ height:8, background:'rgba(255,255,255,.12)', borderRadius:20, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#CB172C,#E52D43,#ff5a6e)', borderRadius:20, transition:'width .6s cubic-bezier(.22,.61,.36,1)' }} />
          </div>
        </div>
      </div>

      {/* Streak */}
      <div style={{
        position:'relative', zIndex:1, flexShrink:0,
        display:'flex', flexDirection:'column', alignItems:'center', gap:2,
        background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)',
        borderRadius:16, padding:'16px 22px',
      }}>
        <span style={{ fontSize:26, lineHeight:1 }}>🔥</span>
        <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:24, color:'#fff', lineHeight:1.1 }}>{streak}</span>
        <span style={{ font:"400 11px/1 'Manrope'", color:'rgba(255,255,255,.5)' }}>дней подряд</span>
      </div>
    </div>
  )
}
