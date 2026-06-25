'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm]   = useState({ fullName:'', email:'', password:'', confirm:'' })
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState('')
  const [done, setDone]    = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Пароли не совпадают'); return }
    if (form.password.length < 8)       { setError('Пароль минимум 8 символов'); return }
    setLoad(true); setError('')
    const { data, error: err } = await createClient().auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.fullName } },
    })
    if (err) { setError(err.message === 'User already registered' ? 'Email уже зарегистрирован' : 'Ошибка регистрации'); setLoad(false); return }
    if (data.user && !data.session) { setDone(true) }
    else { router.push('/dashboard'); router.refresh() }
    setLoad(false)
  }

  const inputStyle: React.CSSProperties = { width:'100%', padding:'16px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', color:'#fff', font:"400 16px/1 'Manrope'", outline:'none', boxSizing:'border-box' }
  const labelStyle: React.CSSProperties = { font:"500 14px/1 'Manrope'", color:'rgba(255,255,255,0.55)', display:'block', marginBottom:8 }

  if (done) return (
    <div style={{ minHeight:'100vh', background:'#16181B', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'#1f2125', border:'1px solid rgba(255,255,255,0.08)', borderRadius:24, padding:'44px 40px', width:'100%', maxWidth:440, textAlign:'center' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:26, color:'#fff', margin:'0 0 10px' }}>Проверьте почту</h2>
        <p style={{ font:"400 16px/1.6 'Manrope'", color:'rgba(255,255,255,0.55)', margin:'0 0 28px' }}>
          Мы отправили письмо на <strong style={{ color:'#fff' }}>{form.email}</strong>. Перейдите по ссылке для активации.
        </p>
        <Link href="/login" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'100%', padding:18, borderRadius:10, background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"600 17px/1 'Inter Tight'", textDecoration:'none' }}>
          Войти →
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#16181B', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'#1f2125', border:'1px solid rgba(255,255,255,0.08)', borderRadius:24, padding:'44px 40px', width:'100%', maxWidth:440 }}>

        <Link href="/" style={{ display:'inline-flex', marginBottom:36, textDecoration:'none' }}>
          <Logo variant="light" height={28} />
        </Link>

        <h1 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:32, letterSpacing:'-1px', color:'#fff', margin:'0 0 8px' }}>Создать аккаунт</h1>
        <p style={{ font:"400 16px/1.5 'Manrope'", color:'rgba(255,255,255,0.5)', margin:'0 0 32px' }}>Доступ к личному кабинету и курсам.</p>

        {error && (
          <div style={{ padding:'12px 16px', background:'rgba(203,23,44,.1)', border:'1px solid rgba(203,23,44,.25)', borderRadius:8, font:"400 14px/1 'Manrope'", color:'#E52D43', marginBottom:20 }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[
            { label:'Имя',              type:'text',     key:'fullName', placeholder:'Константин Ким' },
            { label:'Email',            type:'email',    key:'email',    placeholder:'you@example.com' },
            { label:'Пароль',           type:'password', key:'password', placeholder:'Минимум 8 символов' },
            { label:'Повторите пароль', type:'password', key:'confirm',  placeholder:'••••••••' },
          ].map(f => (
            <div key={f.key}>
              <label style={labelStyle}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} required style={inputStyle}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
            </div>
          ))}
          <button type="submit" disabled={loading}
            style={{ marginTop:8, width:'100%', padding:18, borderRadius:10, border:'none', cursor:'pointer', background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"600 17px/1 'Inter Tight'", opacity: loading ? .7 : 1 }}>
            {loading ? 'Регистрируем...' : 'Создать аккаунт'}
          </button>
        </form>

        <p style={{ font:"400 14px/1 'Manrope'", color:'rgba(255,255,255,0.4)', textAlign:'center', marginTop:24 }}>
          Уже есть аккаунт?{' '}
          <Link href="/login" style={{ color:'#E52D43', fontWeight:600, textDecoration:'none' }}>Войти</Link>
        </p>
        <p style={{ textAlign:'center', marginTop:12 }}>
          <Link href="/" style={{ font:"400 13px/1 'Manrope'", color:'rgba(255,255,255,0.25)', textDecoration:'none' }}>← На главную</Link>
        </p>
      </div>
    </div>
  )
}
