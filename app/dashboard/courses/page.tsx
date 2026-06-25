import { createClient } from '@/lib/supabase/server'
import type { CourseRow, EnrollmentRow } from '@/lib/types'
import Link from 'next/link'

type E = EnrollmentRow & { courses: Pick<CourseRow,'id'|'title'|'description'|'type'|'modules'> | null }

export default async function CoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: raw } = await supabase
    .from('enrollments').select('*, courses(id, title, description, type, modules)')
    .eq('user_id', user!.id).order('enrolled_at', { ascending: false })
  const enrollments = raw as E[] | null

  return (
    <>
      <div style={{ borderBottom:'1px solid #ededed', padding:'24px 40px', background:'#fff' }}>
        <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-0.5px', color:'#16181B' }}>Мои курсы</div>
        <div style={{ font:"400 15px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>Все программы, на которые вы записаны</div>
      </div>

      <div style={{ padding:'40px' }}>
        {!enrollments?.length ? (
          <div style={{ background:'#F7F7F7', borderRadius:20, padding:'80px 32px', textAlign:'center', maxWidth:480, margin:'0 auto' }}>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:24, color:'#16181B', marginBottom:10 }}>Курсов пока нет</div>
            <div style={{ font:"400 16px/1.55 'Manrope'", color:'#8A8D93', marginBottom:32 }}>Запишитесь на бесплатную диагностику — подберём подходящую программу</div>
            <a href="/#записаться" style={{ display:'inline-flex', alignItems:'center', padding:'16px 32px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"500 16px/1 'Inter Tight'", textDecoration:'none' }}>
              Записаться на диагностику
            </a>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
            {enrollments.map(e => {
              const c = e.courses
              const typeLabel = c?.type === 'starter' ? 'Стартовый · 4 занятия' : c?.type === 'full' ? 'Полный · 8 занятий' : 'Личный'
              const statusColor = e.status === 'completed' ? '#22c55e' : 'rgba(34,211,238,.9)'
              const statusText  = e.status === 'active' ? 'В процессе' : e.status === 'completed' ? 'Завершён' : 'Пауза'
              return (
                <Link href={`/dashboard/courses/${e.course_id}`} key={e.id}
                  style={{ background:'#fff', borderRadius:20, border:'1px solid #ededed', overflow:'hidden', textDecoration:'none', display:'block' }}>
                  <div style={{ height:160, background:'linear-gradient(135deg,#16181B,#1c2238)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                    <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:40, letterSpacing:'-2px', color:'rgba(255,255,255,.1)' }}>AI</div>
                    <div style={{ position:'absolute', top:12, right:12, background:statusColor, color: e.status === 'completed' ? '#fff' : '#000', font:"700 10px/1 'Inter Tight'", padding:'3px 10px', borderRadius:20 }}>
                      {statusText}
                    </div>
                  </div>
                  <div style={{ padding:'22px 24px' }}>
                    <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:18, color:'#16181B', marginBottom:4 }}>{c?.title ?? 'Курс KIM AI School'}</div>
                    <div style={{ font:"400 13px/1 'Manrope'", color:'#8A8D93', marginBottom:6 }}>{typeLabel}</div>
                    {c?.description && <div style={{ font:"400 14px/1.5 'Manrope'", color:'#52555B', marginBottom:14 }}>{c.description}</div>}
                    <div style={{ height:4, background:'#F7F7F7', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width: e.status === 'completed' ? '100%' : '10%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', borderRadius:2 }} />
                    </div>
                    <div style={{ font:"400 11px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>
                      {e.status === 'completed' ? 'Завершён' : 'Начало обучения'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
