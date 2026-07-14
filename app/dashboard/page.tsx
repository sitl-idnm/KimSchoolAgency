import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { CourseRow, EnrollmentRow } from '@/lib/types'
import { levelInfo } from '@/lib/gamification/levels'
import HeroCard from '@/components/dashboard/gamification/HeroCard'
import MetricTile from '@/components/dashboard/gamification/MetricTile'
import ContinueCarousel, { type ContinueItem } from '@/components/dashboard/gamification/ContinueCarousel'
import AgendaWidget, { type AgendaEvent } from '@/components/dashboard/gamification/AgendaWidget'
import ProgressWidget from '@/components/dashboard/gamification/ProgressWidget'

type EnrollmentWithCourse = EnrollmentRow & { courses: Pick<CourseRow, 'id' | 'title' | 'type' | 'modules'> | null }
type Stats = { xp: number; coins: number; streak_days: number }

const CARD_GRADIENTS = [
  'linear-gradient(135deg,#CB172C,#E52D43)',
  'linear-gradient(135deg,#16181B,#2a1418)',
  'linear-gradient(135deg,#7c3aed,#4f46e5)',
  'linear-gradient(135deg,#0ea5e9,#0369a1)',
]

const Topbar = ({ title, sub }: { title: string; sub?: string }) => (
  <div style={{ borderBottom:'1px solid #ededed', padding:'24px 40px', background:'#fff' }}>
    <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-0.5px', color:'#16181B' }}>{title}</div>
    {sub && <div style={{ font:"400 15px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>{sub}</div>}
  </div>
)

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const uid = user!.id

  // Base data (existing tables)
  const [profileRes, enrollmentsRes, progressRes] = await Promise.all([
    supabase.from('profiles').select('full_name, avatar_url').eq('id', uid).single(),
    supabase.from('enrollments').select('*, courses(id, title, type, modules)').eq('user_id', uid),
    supabase.from('lesson_progress').select('completed_at').eq('user_id', uid).not('completed_at', 'is', null),
  ])

  const profile = profileRes.data as { full_name: string | null; avatar_url: string | null } | null
  const enrollments = (enrollmentsRes.data as EnrollmentWithCourse[] | null) ?? []
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Ученик'
  const completedLessons = progressRes.data?.length ?? 0
  const courseIds = enrollments.map(e => e.course_id)

  // Gamification data (new tables) — guarded: fall back to defaults if not migrated yet
  const [statsRes, eventsRes, badgesRes, lessonsCountRes] = await Promise.all([
    supabase.from('user_stats').select('xp, coins, streak_days').eq('user_id', uid).maybeSingle(),
    supabase.from('events').select('id, title, starts_at, kind').gte('starts_at', new Date().toISOString()).order('starts_at', { ascending: true }).limit(5),
    supabase.from('user_badges').select('id', { count: 'exact', head: true }).eq('user_id', uid),
    courseIds.length
      ? supabase.from('lessons').select('id', { count: 'exact', head: true }).in('course_id', courseIds)
      : Promise.resolve({ count: 0 } as { count: number | null }),
  ])

  const stats = (statsRes.data as Stats | null) ?? { xp: 0, coins: 0, streak_days: 0 }
  const events = (eventsRes.data as AgendaEvent[] | null) ?? []
  const badgesCount = badgesRes.count ?? 0
  const totalLessons = lessonsCountRes.count ?? 0

  const { level } = levelInfo(stats.xp)
  const program = enrollments[0]?.courses?.title ?? 'AI-мышление для подростков'

  // Next deadline from events
  const deadline = events.find(e => e.kind === 'deadline')
  const nextDeadline = deadline
    ? new Date(deadline.starts_at).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
    : '—'

  // Continue-learning cards from active enrollments
  const continueItems: ContinueItem[] = enrollments
    .filter(e => e.status === 'active')
    .map((e, i) => ({
      id: e.id,
      title: e.courses?.title ?? 'Курс KIM AI School',
      subtitle: e.courses?.type === 'starter' ? 'Стартовый курс' : e.courses?.type === 'full' ? 'Полный курс' : 'Личная программа',
      tag: 'Продолжить',
      href: `/dashboard/courses/${e.course_id}`,
      gradient: CARD_GRADIENTS[i % CARD_GRADIENTS.length],
    }))

  return (
    <>
      <Topbar title={`Привет, ${firstName} 👋`} sub="Твой личный кабинет KIM AI School" />

      <div style={{ padding:'32px 40px', flex:1, display:'flex', flexDirection:'column', gap:28 }}>

        {/* Hero */}
        <HeroCard
          name={profile?.full_name || firstName}
          program={`${program} · уровень ${level}`}
          xp={stats.xp}
          streak={stats.streak_days}
          avatarUrl={profile?.avatar_url}
        />

        {/* Metrics */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:16 }}>
          <MetricTile accent="#CB172C" label="Опыт (XP)" value={stats.xp.toLocaleString('ru-RU')}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>} />
          <MetricTile accent="#f59e0b" label="KIM-коины" value={stats.coins.toLocaleString('ru-RU')}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9.5 9.5h3.5a1.5 1.5 0 0 1 0 3H9.5m0 0V15m0-5.5V8"/></svg>} />
          <MetricTile accent="#ef4444" label="Серия" value={`${stats.streak_days} дн.`}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>} />
          <MetricTile accent="#7c3aed" label="Ближайший дедлайн" value={nextDeadline}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>} />
          <MetricTile accent="#0ea5e9" label="Достижения" value={badgesCount}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/></svg>} />
        </div>

        {/* Continue learning */}
        {continueItems.length > 0 ? (
          <ContinueCarousel items={continueItems} />
        ) : (
          <div style={{ background:'#F7F7F7', borderRadius:20, padding:'44px 32px', textAlign:'center' }}>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:20, color:'#16181B', marginBottom:8 }}>Курсов пока нет</div>
            <div style={{ font:"400 15px/1.5 'Manrope'", color:'#8A8D93', marginBottom:24 }}>Запишись на диагностику — подберём программу</div>
            <Link href="/#записаться" style={{ display:'inline-flex', alignItems:'center', padding:'13px 26px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"500 15px/1 'Inter Tight'", textDecoration:'none' }}>
              Записаться на диагностику
            </Link>
          </div>
        )}

        {/* Agenda + progress */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:20, alignItems:'stretch' }} className="dash-two-col">
          <AgendaWidget events={events} />
          <ProgressWidget done={completedLessons} total={totalLessons} badges={badgesCount} />
        </div>
      </div>
    </>
  )
}
