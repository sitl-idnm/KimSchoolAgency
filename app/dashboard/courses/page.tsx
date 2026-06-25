import { createClient } from '@/lib/supabase/server'
import type { CourseRow, EnrollmentRow } from '@/lib/types'
import Link from 'next/link'

type EnrollmentWithCourse = EnrollmentRow & { courses: Pick<CourseRow, 'id' | 'title' | 'description' | 'type' | 'modules'> | null }

export default async function CoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: enrollmentsRaw } = await supabase
    .from('enrollments')
    .select('*, courses(id, title, description, type, modules)')
    .eq('user_id', user!.id)
    .order('enrolled_at', { ascending: false })
  const enrollments = enrollmentsRaw as EnrollmentWithCourse[] | null

  return (
    <>
      <div className="dash-topbar">
        <div className="dash-topbar-title">Мои курсы</div>
      </div>

      <div className="dash-content">
        <h1 className="dash-page-title">Мои курсы</h1>
        <p className="dash-page-sub">Все курсы, на которые вы записаны.</p>

        {!enrollments || enrollments.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 'var(--kim-r-card)', border: '1px solid var(--kim-border)', padding: '64px 32px', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>📚</div>
            <h2 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 22, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 10 }}>
              Курсов пока нет
            </h2>
            <p style={{ fontSize: 15, color: 'var(--kim-body)', marginBottom: 28 }}>
              Запишитесь на диагностику, и мы подберём программу.
            </p>
            <Link href="/#записаться" className="kim-btn kim-btn--primary">
              Записаться
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {enrollments.map(e => {
              const course = e.courses
              const typeLabel = course?.type === 'starter' ? 'Стартовый · 4 занятия'
                : course?.type === 'full' ? 'Полный · 8 занятий'
                : 'Личный'

              return (
                <Link href={`/dashboard/courses/${e.course_id}`} key={e.id} className="course-card">
                  <div className="course-card-cover">
                    <div style={{ fontSize: 48 }}>🤖</div>
                    <div className="course-card-badge" style={{
                      background: e.status === 'completed' ? '#22c55e' : e.status === 'paused' ? '#eab308' : 'var(--cy)',
                      color: e.status === 'active' ? '#000' : '#fff',
                    }}>
                      {e.status === 'active' ? 'В процессе' : e.status === 'completed' ? 'Завершён' : 'Пауза'}
                    </div>
                  </div>
                  <div className="course-card-body">
                    <div className="course-card-title">{course?.title ?? 'Курс KIM AI School'}</div>
                    <div className="course-card-desc">{typeLabel}</div>
                    {course?.description && (
                      <div className="course-card-desc" style={{ marginTop: 4, marginBottom: 12 }}>{course.description}</div>
                    )}
                    <div className="course-progress">
                      <div className="course-progress-bar" style={{ width: e.status === 'completed' ? '100%' : '10%' }} />
                    </div>
                    <div className="course-progress-label">
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
