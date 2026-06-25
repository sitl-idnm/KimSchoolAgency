import { createClient } from '@/lib/supabase/server'
import type { LeadRow, EnrollmentRow, CourseRow, ProfileRow } from '@/lib/types'
import Link from 'next/link'

type EnrollmentWithRelations = EnrollmentRow & {
  profiles: Pick<ProfileRow, 'full_name' | 'email'> | null
  courses: Pick<CourseRow, 'title'> | null
}

export default async function AdminPage() {
  const supabase = await createClient()

  const [usersRes, enrollmentsCountRes, leadsCountRes, leadsRes, enrollmentsRes] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('enrollments').select('*, profiles(full_name, email), courses(title)').order('enrolled_at', { ascending: false }).limit(10),
  ])

  const usersCount = usersRes.count
  const enrollmentsCount = enrollmentsCountRes.count
  const leadsCount = leadsCountRes.count
  const recentLeads = leadsRes.data as LeadRow[] | null
  const recentEnrollments = enrollmentsRes.data as EnrollmentWithRelations[] | null

  return (
    <>
      <div className="dash-topbar">
        <div className="dash-topbar-title">Панель администратора</div>
        <Link href="/admin/courses" className="kim-btn kim-btn--primary kim-btn--sm">
          + Добавить курс
        </Link>
      </div>

      <div className="dash-content">
        <h1 className="dash-page-title">Обзор</h1>
        <p className="dash-page-sub">Статистика KIM AI School</p>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-card-n">{usersCount ?? 0}</div>
            <div className="stat-card-l">Пользователей</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-n">{enrollmentsCount ?? 0}</div>
            <div className="stat-card-l">Записей на курсы</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-n">{leadsCount ?? 0}</div>
            <div className="stat-card-l">Заявок</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-n">0</div>
            <div className="stat-card-l">Оплат (₽)</div>
          </div>
        </div>

        {/* Leads */}
        <div style={{ background: '#fff', borderRadius: 'var(--kim-r-card)', border: '1px solid var(--kim-border)', overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--kim-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 16, fontWeight: 700, color: 'var(--kim-ink)' }}>
              Последние заявки
            </h2>
            <Link href="/admin/leads" style={{ fontSize: 13, color: 'var(--kim-red)', fontWeight: 600 }}>
              Все заявки →
            </Link>
          </div>
          {!recentLeads || recentLeads.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--kim-muted)', fontSize: 14 }}>
              Заявок пока нет
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  <th>Источник</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(lead => (
                  <tr key={lead.id}>
                    <td>{lead.name ?? '—'}</td>
                    <td>{lead.phone ?? '—'}</td>
                    <td>{lead.email ?? '—'}</td>
                    <td>
                      <span className="badge-status active">{lead.source}</span>
                    </td>
                    <td>{new Date(lead.created_at).toLocaleDateString('ru-RU')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Enrollments */}
        <div style={{ background: '#fff', borderRadius: 'var(--kim-r-card)', border: '1px solid var(--kim-border)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--kim-border)' }}>
            <h2 style={{ fontFamily: 'var(--kim-font-head)', fontSize: 16, fontWeight: 700, color: 'var(--kim-ink)' }}>
              Записи на курсы
            </h2>
          </div>
          {!recentEnrollments || recentEnrollments.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--kim-muted)', fontSize: 14 }}>
              Записей пока нет
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ученик</th>
                  <th>Email</th>
                  <th>Курс</th>
                  <th>Статус</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map(e => {
                  const profile = e.profiles
                  const course = e.courses
                  return (
                    <tr key={e.id}>
                      <td>{profile?.full_name ?? '—'}</td>
                      <td>{profile?.email ?? '—'}</td>
                      <td>{course?.title ?? '—'}</td>
                      <td>
                        <span className={`badge-status ${e.status}`}>
                          {e.status === 'active' ? 'Активный' : e.status === 'completed' ? 'Завершён' : 'Пауза'}
                        </span>
                      </td>
                      <td>{new Date(e.enrolled_at).toLocaleDateString('ru-RU')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
