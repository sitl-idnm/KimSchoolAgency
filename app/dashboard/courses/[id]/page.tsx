import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CourseRow, EnrollmentRow, LessonRow } from '@/lib/types'
import Link from 'next/link'

type EnrollmentWithCourse = EnrollmentRow & { courses: CourseRow | null }
type ProgressItem = { lesson_id: string; completed_at: string | null }

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [enrollmentRes, lessonsRes, progressRes] = await Promise.all([
    supabase.from('enrollments').select('*, courses(*)').eq('user_id', user!.id).eq('course_id', id).single(),
    supabase.from('lessons').select('*').eq('course_id', id).order('module_num').order('lesson_num'),
    supabase.from('lesson_progress').select('lesson_id, completed_at').eq('user_id', user!.id),
  ])

  const enrollment = enrollmentRes.data as EnrollmentWithCourse | null
  const lessons = lessonsRes.data as LessonRow[] | null
  const progress = progressRes.data as ProgressItem[] | null

  if (!enrollment) redirect('/dashboard/courses')

  const course = enrollment.courses
  if (!course) notFound()

  const completedIds = new Set((progress ?? []).filter(p => p.completed_at).map(p => p.lesson_id))
  const totalLessons = lessons?.length ?? 0
  const completedCount = lessons?.filter(l => completedIds.has(l.id)).length ?? 0
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const moduleGroups = (lessons ?? []).reduce<Record<number, LessonRow[]>>((acc, lesson) => {
    if (!lesson) return acc
    const mod = lesson.module_num
    if (!acc[mod]) acc[mod] = []
    acc[mod]!.push(lesson)
    return acc
  }, {})

  return (
    <>
      <div className="dash-topbar">
        <div className="dash-topbar-title">
          <Link href="/dashboard/courses" style={{ color: 'var(--kim-muted)', fontWeight: 500, fontSize: 14, marginRight: 8 }}>
            ← Курсы
          </Link>
          {course.title}
        </div>
      </div>

      <div className="dash-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>

          {/* Main content */}
          <div>
            <div style={{ background: 'var(--kim-ink)', borderRadius: 'var(--kim-r-card)', padding: '40px', marginBottom: 32, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div style={{ position: 'relative' }}>
                <span style={{ display: 'inline-block', background: 'var(--cy)', color: '#000', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 16, letterSpacing: .5 }}>
                  {course.type === 'starter' ? 'Стартовый' : course.type === 'full' ? 'Полный' : 'Личный'}
                </span>
                <h1 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 32, fontWeight: 700, color: '#f1f2f4', marginBottom: 12, letterSpacing: -1 }}>
                  {course.title}
                </h1>
                {course.description && (
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>{course.description}</p>
                )}
              </div>
            </div>

            {totalLessons === 0 ? (
              <div className="kim-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔄</div>
                <h3 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 18, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 8 }}>
                  Материалы готовятся
                </h3>
                <p style={{ fontSize: 14, color: 'var(--kim-body)' }}>
                  Уроки появятся здесь после вводной диагностики. Мы уведомим вас на email.
                </p>
              </div>
            ) : (
              Object.entries(moduleGroups).map(([modNum, modLessons]) => (
                <div key={modNum} style={{ marginBottom: 24 }}>
                  <h2 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 16, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 12, padding: '8px 0', borderBottom: '1px solid var(--kim-border)' }}>
                    Модуль {modNum}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(modLessons ?? []).map((lesson, idx) => {
                      const done = completedIds.has(lesson.id)
                      const available = lesson.is_free || enrollment.status === 'active'
                      return (
                        <div
                          key={lesson.id}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                            background: '#fff', borderRadius: 12, border: `1px solid ${done ? 'rgba(34,197,94,.3)' : 'var(--kim-border)'}`,
                            opacity: available ? 1 : 0.5, cursor: available ? 'pointer' : 'default',
                          }}
                        >
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                            background: done ? '#22c55e' : 'var(--kim-card)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'var(--kim-font-head)', fontSize: 13, fontWeight: 700,
                            color: done ? '#fff' : 'var(--kim-muted)',
                          }}>
                            {done ? '✓' : idx + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'var(--kim-font-head)', fontSize: 15, fontWeight: 600, color: 'var(--kim-ink)', marginBottom: 2 }}>
                              {lesson.title}
                            </div>
                            {lesson.duration_minutes && (
                              <div style={{ fontSize: 12, color: 'var(--kim-muted)' }}>
                                {lesson.duration_minutes} мин
                              </div>
                            )}
                          </div>
                          {!available && (
                            <div style={{ fontSize: 11, color: 'var(--kim-muted)', padding: '2px 8px', background: 'var(--kim-card)', borderRadius: 4 }}>
                              🔒
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 92 }}>
            <div className="kim-card" style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--kim-font-head)', fontSize: 14, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 12 }}>
                Прогресс
              </div>
              <div style={{ fontFamily: 'var(--kim-font-head)', fontSize: 36, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 4 }}>
                {progressPct}%
              </div>
              <div style={{ fontSize: 13, color: 'var(--kim-body)', marginBottom: 14 }}>
                {completedCount} из {totalLessons} уроков
              </div>
              <div className="course-progress" style={{ marginBottom: 0 }}>
                <div className="course-progress-bar" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="kim-card--outline" style={{ padding: '20px 24px' }}>
              <div style={{ fontFamily: 'var(--kim-font-head)', fontSize: 14, fontWeight: 700, color: 'var(--kim-ink)', marginBottom: 10 }}>
                Нужна помощь?
              </div>
              <p style={{ fontSize: 13, color: 'var(--kim-body)', marginBottom: 14, lineHeight: 1.5 }}>
                Если есть вопросы по материалу — пишите наставнику.
              </p>
              <a
                href="https://t.me/kimaibot"
                target="_blank"
                rel="noopener noreferrer"
                className="kim-btn kim-btn--primary kim-btn--sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Написать в Telegram
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
