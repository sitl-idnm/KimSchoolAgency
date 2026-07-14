import Link from 'next/link'

/* Course-progress ring + quick counters. Light KIM card. */
export default function ProgressWidget({
  done, total, badges,
}: {
  done: number
  total: number
  badges: number
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const R = 52
  const C = 2 * Math.PI * R
  const dash = (pct / 100) * C

  return (
    <div style={{ background:'#fff', borderRadius:20, border:'1px solid #ededed', padding:'24px 26px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column' }}>
      <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:18, letterSpacing:'-0.3px', color:'#16181B', marginBottom:18 }}>
        Твой прогресс
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', margin:'6px 0 18px' }}>
        <div style={{ position:'relative', width:128, height:128 }}>
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={R} fill="none" stroke="#f0f0f0" strokeWidth="12" />
            <circle cx="64" cy="64" r={R} fill="none" stroke="url(#kimgrad)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${dash} ${C}`} transform="rotate(-90 64 64)" />
            <defs>
              <linearGradient id="kimgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#CB172C" />
                <stop offset="100%" stopColor="#E52D43" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-1px', color:'#16181B', lineHeight:1 }}>{pct}%</span>
            <span style={{ font:"400 11px/1 'Manrope'", color:'#8A8D93', marginTop:4 }}>пройдено</span>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', gap:10, marginTop:'auto' }}>
        <div style={{ flex:1, background:'#FAFAFA', borderRadius:12, padding:'12px 14px' }}>
          <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:20, color:'#16181B' }}>{done}/{total}</div>
          <div style={{ font:"400 11px/1.2 'Manrope'", color:'#8A8D93', marginTop:3 }}>уроков</div>
        </div>
        <div style={{ flex:1, background:'#FAFAFA', borderRadius:12, padding:'12px 14px' }}>
          <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:20, color:'#16181B' }}>{badges}</div>
          <div style={{ font:"400 11px/1.2 'Manrope'", color:'#8A8D93', marginTop:3 }}>достижений</div>
        </div>
      </div>

      <Link href="/dashboard/courses" style={{ marginTop:14, textAlign:'center', font:"500 14px/1 'Inter Tight'", color:'#CB172C', textDecoration:'none' }}>
        К моим курсам →
      </Link>
    </div>
  )
}
