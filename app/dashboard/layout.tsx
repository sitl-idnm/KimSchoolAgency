import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const result = await supabase.from('profiles').select('full_name, role').eq('id', user.id).single()
  const profile = result.data as { full_name: string | null; role: string } | null

  return (
    <div className="dash-layout">
      <Sidebar userName={profile?.full_name ?? user.email} />
      <div className="dash-main">
        {children}
      </div>
    </div>
  )
}
