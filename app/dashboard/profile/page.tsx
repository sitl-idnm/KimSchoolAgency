'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProfilePage() {
  const [profile, setProfile] = useState({ full_name:'', email:'' })
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      const p = data as { full_name: string | null } | null
      setProfile({ full_name: p?.full_name ?? '', email: user.email ?? '' })
      setLoading(false)
    }
    load()
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError(''); setSaved(false)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error: err } = await supabase.from('profiles').update({ full_name: profile.full_name }).eq('id', user.id)
    if (err) { setError('Ошибка сохранения'); setSaving(false); return }
    setSaved(true); setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle: React.CSSProperties = { width:'100%', padding:'16px 20px', borderRadius:10, border:'1.5px solid #ededed', background:'#fff', color:'#16181B', font:"400 16px/1 'Manrope'", outline:'none', boxSizing:'border-box', transition:'border-color .15s' }

  return (
    <>
      <div style={{ borderBottom:'1px solid #ededed', padding:'24px 40px', background:'#fff' }}>
        <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:28, letterSpacing:'-0.5px', color:'#16181B' }}>Профиль</div>
        <div style={{ font:"400 15px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>Личные данные аккаунта</div>
      </div>

      <div style={{ padding:'40px', maxWidth:640 }}>
        {loading ? (
          <div style={{ font:"400 16px/1 'Manrope'", color:'#8A8D93' }}>Загрузка...</div>
        ) : (
          <>
            {/* Avatar */}
            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:40 }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter Tight',sans-serif", fontWeight:700, fontSize:28, color:'#fff', flexShrink:0 }}>
                {(profile.full_name || profile.email || 'U')[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:20, color:'#16181B' }}>{profile.full_name || 'Имя не указано'}</div>
                <div style={{ font:"400 14px/1 'Manrope'", color:'#8A8D93', marginTop:4 }}>{profile.email}</div>
              </div>
            </div>

            <form onSubmit={save} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <div style={{ background:'#fff', borderRadius:20, border:'1px solid #ededed', padding:'32px' }}>
                <div style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:18, color:'#16181B', marginBottom:24, letterSpacing:'-0.3px' }}>Личные данные</div>
                <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  <div>
                    <label style={{ font:"500 13px/1 'Manrope'", color:'#52555B', display:'block', marginBottom:8 }}>Имя</label>
                    <input type="text" placeholder="Ваше имя" value={profile.full_name}
                      onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor='#CB172C')}
                      onBlur={e => (e.currentTarget.style.borderColor='#ededed')} />
                  </div>
                  <div>
                    <label style={{ font:"500 13px/1 'Manrope'", color:'#52555B', display:'block', marginBottom:8 }}>Email</label>
                    <input type="email" value={profile.email} disabled
                      style={{ ...inputStyle, background:'#FAFAFA', color:'#8A8D93', cursor:'not-allowed' }} />
                    <div style={{ font:"400 12px/1 'Manrope'", color:'#8A8D93', marginTop:6 }}>Email нельзя изменить</div>
                  </div>
                </div>
              </div>

              {error && <div style={{ padding:'12px 16px', background:'rgba(203,23,44,.06)', border:'1px solid rgba(203,23,44,.2)', borderRadius:8, font:"400 14px/1 'Manrope'", color:'#CB172C' }}>{error}</div>}

              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <button type="submit" disabled={saving}
                  style={{ display:'inline-flex', alignItems:'center', padding:'14px 28px', borderRadius:8, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"500 16px/1 'Inter Tight'", border:'none', cursor:'pointer', opacity: saving ? .7 : 1 }}>
                  {saving ? 'Сохраняем...' : 'Сохранить изменения'}
                </button>
                {saved && <div style={{ font:"500 14px/1 'Manrope'", color:'#22c55e' }}>✓ Сохранено</div>}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}
