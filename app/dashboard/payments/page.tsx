import { createClient } from '@/lib/supabase/server'
import type { PaymentRow, CourseRow } from '@/lib/types'
import Link from 'next/link'

type PaymentWithCourse = PaymentRow & { courses: Pick<CourseRow,'title'> | null }

const statusLabel: Record<string, string> = { pending:'Ожидание', succeeded:'Оплачено', cancelled:'Отменён', refunded:'Возврат' }
const statusColor: Record<string, string> = {
  pending:   'rgba(234,179,8,.1)',
  succeeded: 'rgba(34,197,94,.1)',
  cancelled: 'rgba(239,68,68,.1)',
  refunded:  'rgba(99,102,241,.1)',
}
const statusText: Record<string, string> = {
  pending:   '#ca8a04',
  succeeded: '#16a34a',
  cancelled: '#dc2626',
  refunded:  '#4f46e5',
}

export default async function PaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: raw } = await supabase
    .from('payments').select('*, courses(title)')
    .eq('user_id', user!.id).order('created_at', { ascending: false })
  const payments = raw as PaymentWithCourse[] | null

  return (
    <>
      <div style={{ borderBottom:'1px solid #ededed', padding:'24px 40px', background:'#fff' }}>
        <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-0.5px', color:'#16181B' }}>Платежи</div>
        <div style={{ font:"400 15px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>История оплат и покупок</div>
      </div>

      <div style={{ padding:'40px' }}>
        {!payments?.length ? (
          <div style={{ background:'#F7F7F7', borderRadius:20, padding:'80px 32px', textAlign:'center', maxWidth:480, margin:'0 auto' }}>
            <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:22, letterSpacing:'-0.4px', color:'#16181B', marginBottom:10 }}>Платежей пока нет</div>
            <div style={{ font:"400 16px/1.55 'Manrope'", color:'#8A8D93', marginBottom:32 }}>После оплаты курса здесь появится история транзакций</div>
            <Link href="/dashboard/courses" style={{ display:'inline-flex', alignItems:'center', padding:'14px 28px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"500 15px/1 'Inter Tight'", textDecoration:'none' }}>
              Посмотреть курсы →
            </Link>
          </div>
        ) : (
          <div style={{ background:'#fff', borderRadius:20, border:'1px solid #ededed', overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #ededed' }}>
                  {['Дата','Курс','Сумма','Провайдер','Статус'].map(h => (
                    <th key={h} style={{ font:"700 11px/1 'Inter Tight'", color:'#8A8D93', textTransform:'uppercase', letterSpacing:'.8px', padding:'12px 20px', textAlign:'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} style={{ borderBottom:'1px solid #ededed' }}>
                    <td style={{ padding:'16px 20px', font:"400 14px/1 'Manrope'", color:'#52555B' }}>
                      {new Date(p.created_at).toLocaleDateString('ru-RU')}
                    </td>
                    <td style={{ padding:'16px 20px', fontFamily:"'Inter Tight',sans-serif", fontWeight:500, fontSize:15, color:'#16181B' }}>
                      {p.courses?.title ?? '—'}
                    </td>
                    <td style={{ padding:'16px 20px', fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:16, color:'#16181B' }}>
                      {(p.amount / 100).toLocaleString('ru-RU')} ₽
                    </td>
                    <td style={{ padding:'16px 20px', font:"400 13px/1 'Manrope'", color:'#8A8D93', textTransform:'uppercase', letterSpacing:'.5px' }}>
                      {p.provider}
                    </td>
                    <td style={{ padding:'16px 20px' }}>
                      <span style={{ display:'inline-flex', padding:'4px 12px', borderRadius:20, background: statusColor[p.status] || '#F7F7F7', font:"700 11px/1 'Inter Tight'", color: statusText[p.status] || '#8A8D93' }}>
                        {statusLabel[p.status] || p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
