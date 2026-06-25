import { createClient } from '@/lib/supabase/server'
import type { CourseRow, EnrollmentRow } from '@/lib/types'
import Link from 'next/link'

type EnrollmentWithCourse = EnrollmentRow & { courses: Pick<CourseRow, 'title' | 'type' | 'modules'> | null }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileRes, enrollmentsRes, progressRes] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
    supabase.from('enrollments').select('*, courses(title, type, modules)').eq('user_id', user!.id),
    supabase.from('lesson_progress').select('completed_at').eq('user_id', user!.id).not('completed_at', 'is', null),
  ])

  const profile = profileRes.data as { full_name: string | null } | null
  const enrollments = enrollmentsRes.data as EnrollmentWithCourse[] | null
  const progressData = progressRes.data

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Ученик'
  const totalEnrolled = enrollments?.length ?? 0
  const completedLessons = progressData?.length ?? 0

  return (
    <>
      <div className="dash-topbar">
        <div className="dash-topbar-title">Личный кабинет</div>
        <div className="dash-user">
          <div className="dash-ava">{firstName[0]}</div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--kim-ink)' }}>{firstName}</span>
        </div>
      </div>

      <div className="dash-content">
        <h1 className="dash-page-title">Привет, {firstName} 👋</h1>
        <p className="dash-page-sub">Добро пожаловать в KIM AI School — здесь ваши курсы и прогресс.</p>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-card-n">{totalEnrolled}</div>
            <div className="stat-card-l">Курсов куплено</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-n">{completedLessons}</div>
            <div className="stat-card-l">Уроков завершено</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-n">0</div>
            <div className="stat-card-l">Артефактов создано</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-n">—</div>
            <div className="stat-card-l">Следующее занятие</div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 20, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 16 }}>
            Мои курсы
          </h2>

          {!enrollments || enrollments.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 'var(--kim-r-card)', border: '1px solid var(--kim-border)', padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
              <h3 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 20, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 8 }}>
                Курсов пока нет
              </h3>
              <p style={{ fontSize: 15, color: 'var(--kim-body)', marginBottom: 24 }}>
                Запишитесь на диагностику и мы подберём подходящую программу
              </p>
              <Link href="/#записаться" className="kim-btn kim-btn--primary kim-btn--sm">
                Записаться на диагностику
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {enrollments.map(e => {
                const course = e.courses
                return (
                  <Link href={`/dashboard/courses/${e.course_id}`} key={e.id} className="course-card">
                    <div className="course-card-cover">
                      <div style={{ fontSize: 40 }}>🤖</div>
                      <div className="course-card-badge">
                        {e.status === 'active' ? 'В процессе' : e.status === 'completed' ? 'Завершён' : 'Пауза'}
                      </div>
                    </div>
                    <div className="course-card-body">
                      <div className="course-card-title">{course?.title ?? 'Курс'}</div>
                      <div className="course-card-desc">
                        {course?.modules ?? 4} модуля ·{' '}
                        {course?.type === 'starter' ? 'Стартовый' : course?.type === 'full' ? 'Полный' : 'Личный'}
                      </div>
                      <div className="course-progress">
                        <div className="course-progress-bar" style={{ width: '25%' }} />
                      </div>
                      <div className="course-progress-label">1 из {course?.modules ?? 4} модулей</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div style={{ background: 'var(--kim-ink)', borderRadius: 'var(--kim-r-card)', padding: '32px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--kim-font-head)', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Нужна помощь?</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)' }}>Напишите нам — ответим в течение нескольких часов</div>
          </div>
          <a href="https://t.me/kimaibot" target="_blank" rel="noopener noreferrer" className="kim-btn kim-btn--ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}>
            Написать в Telegram
          </a>
        </div>
      </div>
    </>
  )
}
