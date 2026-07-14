/* Single metric tile for the dashboard stats row. Light KIM card. */
export default function MetricTile({
  icon, value, label, accent = '#16181B', sub,
}: {
  icon: React.ReactNode
  value: React.ReactNode
  label: string
  accent?: string
  sub?: string
}) {
  return (
    <div style={{
      background:'#fff', borderRadius:18, border:'1px solid #ededed',
      padding:'20px 22px', display:'flex', flexDirection:'column', gap:12,
      minWidth:0,
    }}>
      <div style={{
        width:38, height:38, borderRadius:11, flexShrink:0,
        background:`${accent}0f`, color:accent,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {icon}
      </div>
      <div style={{ minWidth:0 }}>
        <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-1px', color:'#16181B', lineHeight:1.1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{value}</div>
        <div style={{ font:"500 13px/1.3 'Manrope'", color:'#52555B', marginTop:4 }}>{label}</div>
        {sub && <div style={{ font:"400 11px/1 'Manrope'", color:'#8A8D93', marginTop:3 }}>{sub}</div>}
      </div>
    </div>
  )
}
