import { createClient } from '@/lib/supabase/server'
import type { CourseRow, EnrollmentRow } from '@/lib/types'
import Link from 'next/link'

type EnrollmentWithCourse = EnrollmentRow & { courses: Pick<CourseRow,'title'|'type'|'modules'> | null }

const Topbar = ({ title, sub }: { title: string; sub?: string }) => (
  <div style={{ borderBottom:'1px solid #ededed', padding:'24px 40px', background:'#fff' }}>
    <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-0.5px', color:'#16181B' }}>{title}</div>
    {sub && <div style={{ font:"400 15px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>{sub}</div>}
  </div>
)

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileRes, enrollmentsRes, progressRes] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
    supabase.from('enrollments').select('*, courses(title, type, modules)').eq('user_id', user!.id),
    supabase.from('lesson_progress').select('completed_at').eq('user_id', user!.id).not('completed_at','is',null),
  ])

  const profile   = profileRes.data as { full_name: string | null } | null
  const enrollments = enrollmentsRes.data as EnrollmentWithCourse[] | null
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Ученик'
  const completedLessons = progressRes.data?.length ?? 0

  return (
    <>
      <Topbar title={`Привет, ${firstName} 👋`} sub="Добро пожаловать в KIM AI School" />

      <div style={{ padding:'40px', flex:1 }}>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:40 }}>
          {[
            { n: enrollments?.length ?? 0, l:'Курсов куплено', sub:'программ обучения' },
            { n: completedLessons,          l:'Уроков завершено', sub:'из программы' },
            { n: '0',                       l:'Артефактов создано', sub:'проектов и работ' },
          ].map(s => (
            <div key={s.l} style={{ background:'#fff', borderRadius:20, padding:'28px 32px', border:'1px solid #ededed' }}>
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:48, letterSpacing:'-2px', color:'#16181B', lineHeight:1, marginBottom:8 }}>{s.n}</div>
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:17, color:'#16181B', marginBottom:3 }}>{s.l}</div>
              <div style={{ font:"400 13px/1 'Manrope'", color:'#8A8D93' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div style={{ marginBottom:32 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:22, letterSpacing:'-0.4px', color:'#16181B' }}>Мои курсы</div>
            <Link href="/dashboard/courses" style={{ font:"500 14px/1 'Inter Tight'", color:'#CB172C', textDecoration:'none' }}>Все курсы →</Link>
          </div>

          {!enrollments?.length ? (
            <div style={{ background:'#F7F7F7', borderRadius:20, padding:'52px 32px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:22, color:'#16181B', marginBottom:8 }}>Курсов пока нет</div>
              <div style={{ font:"400 16px/1.5 'Manrope'", color:'#8A8D93', marginBottom:28 }}>Запишитесь на диагностику — подберём программу</div>
              <a href="/#записаться" style={{ display:'inline-flex', alignItems:'center', padding:'14px 28px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"500 16px/1 'Inter Tight'", textDecoration:'none' }}>
                Записаться на диагностику
              </a>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
              {enrollments.map(e => {
                const c = e.courses
                const typeLabel = c?.type === 'starter' ? 'Стартовый · 4 занятия' : c?.type === 'full' ? 'Полный · 8 занятий' : 'Личный'
                return (
                  <Link href={`/dashboard/courses/${e.course_id}`} key={e.id} style={{ background:'#fff', borderRadius:20, border:'1px solid #ededed', overflow:'hidden', textDecoration:'none', display:'block', transition:'box-shadow .2s, transform .2s' }}
                    onMouseEnter={(el: React.MouseEvent<HTMLAnchorElement>) => { el.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,.07)'; el.currentTarget.style.transform='translateY(-2px)' }}
                    onMouseLeave={(el: React.MouseEvent<HTMLAnchorElement>) => { el.currentTarget.style.boxShadow='none'; el.currentTarget.style.transform='none' }}>
                    <div style={{ height:140, background:'linear-gradient(135deg,#16181B,#1c2238)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                      <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:32, letterSpacing:'-1px', color:'rgba(255,255,255,.15)' }}>AI</div>
                      <div style={{ position:'absolute', top:12, right:12, background: e.status === 'completed' ? '#22c55e' : 'rgba(34,211,238,.9)', color: e.status === 'completed' ? '#fff' : '#000', font:"700 10px/1 'Inter Tight'", padding:'3px 10px', borderRadius:20 }}>
                        {e.status === 'active' ? 'В процессе' : e.status === 'completed' ? 'Завершён' : 'Пауза'}
                      </div>
                    </div>
                    <div style={{ padding:'20px 24px' }}>
                      <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:17, color:'#16181B', marginBottom:4 }}>{c?.title ?? 'Курс KIM AI School'}</div>
                      <div style={{ font:"400 13px/1 'Manrope'", color:'#8A8D93', marginBottom:14 }}>{typeLabel}</div>
                      <div style={{ height:4, background:'#F7F7F7', borderRadius:2, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:'10%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', borderRadius:2 }} />
                      </div>
                      <div style={{ font:"400 11px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>Начало обучения</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Banner */}
        <div style={{ background:'linear-gradient(110deg,#16181B,#241a1c)', borderRadius:20, padding:'32px 36px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:22, letterSpacing:'-0.4px', color:'#fff', marginBottom:6 }}>Нужна помощь?</div>
            <div style={{ font:"400 15px/1 'Manrope'", color:'rgba(255,255,255,.55)' }}>Напишите наставнику — ответим в течение нескольких часов</div>
          </div>
          <a href="https://t.me/kimaibot" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', padding:'14px 28px', borderRadius:8, border:'1.5px solid rgba(255,255,255,.2)', color:'rgba(255,255,255,.8)', font:"500 15px/1 'Inter Tight'", textDecoration:'none', whiteSpace:'nowrap', transition:'border-color .2s' }}>
            Написать в Telegram
          </a>
        </div>
      </div>
    </>
  )
}
