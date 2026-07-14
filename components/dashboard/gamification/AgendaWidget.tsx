export type AgendaEvent = {
  id: string
  title: string
  starts_at: string
  kind: string
}

const KIND_COLOR: Record<string, string> = {
  event: '#7c3aed',
  lesson: '#CB172C',
  deadline: '#f59e0b',
  webinar: '#0ea5e9',
}

function fmt(dateStr: string) {
  const d = new Date(dateStr)
  const day = d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
  const time = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  return { day, time }
}

/* Upcoming events / agenda list. Light KIM card. */
export default function AgendaWidget({ events }: { events: AgendaEvent[] }) {
  return (
    <div style={{ background:'#fff', borderRadius:20, border:'1px solid #ededed', padding:'24px 26px', height:'100%', boxSizing:'border-box' }}>
      <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:18, letterSpacing:'-0.3px', color:'#16181B', marginBottom:18 }}>
        Расписание и события
      </div>

      {events.length === 0 ? (
        <div style={{ padding:'28px 0', textAlign:'center' }}>
          <div style={{ font:"500 15px/1.4 'Inter Tight'", color:'#16181B', marginBottom:6 }}>Пока ничего не запланировано</div>
          <div style={{ font:"400 13px/1.5 'Manrope'", color:'#8A8D93' }}>Ближайшие занятия и события появятся здесь</div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
          {events.map(ev => {
            const { day, time } = fmt(ev.starts_at)
            const color = KIND_COLOR[ev.kind] ?? '#7c3aed'
            return (
              <div key={ev.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:'1px solid #f4f4f4' }}>
                <div style={{ flexShrink:0, width:46, textAlign:'center' }}>
                  <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:15, color }}>{day.split(' ')[0]}</div>
                  <div style={{ font:"500 10px/1 'Manrope'", color:'#8A8D93', textTransform:'uppercase', marginTop:2 }}>{day.split(' ')[1]}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ font:"500 14px/1.3 'Inter Tight'", color:'#16181B', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ev.title}</div>
                  <div style={{ font:"400 12px/1 'Manrope'", color:'#8A8D93', marginTop:3 }}>{time}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
