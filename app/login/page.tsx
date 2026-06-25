'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm]   = useState({ email:'', password:'' })
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoad(true); setError('')
    const { error: err } = await createClient().auth.signInWithPassword(form)
    if (err) { setError('Неверный email или пароль'); setLoad(false); return }
    router.push('/dashboard'); router.refresh()
  }

  return (
    <div style={{ minHeight:'100vh', background:'#16181B', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'#1f2125', border:'1px solid rgba(255,255,255,0.08)', borderRadius:24, padding:'44px 40px', width:'100%', maxWidth:440 }}>

        <Link href="/" style={{ display:'inline-flex', marginBottom:36, textDecoration:'none' }}>
          <Logo variant="light" height={28} />
        </Link>

        <h1 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:32, letterSpacing:'-1px', color:'#fff', margin:'0 0 8px' }}>Войти в кабинет</h1>
        <p style={{ font:"400 16px/1.5 'Manrope'", color:'rgba(255,255,255,0.5)', margin:'0 0 32px' }}>Введите данные, указанные при регистрации.</p>

        {error && (
          <div style={{ padding:'12px 16px', background:'rgba(203,23,44,.1)', border:'1px solid rgba(203,23,44,.25)', borderRadius:8, font:"400 14px/1 'Manrope'", color:'#E52D43', marginBottom:20 }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ font:"500 14px/1 'Manrope'", color:'rgba(255,255,255,0.55)', display:'block', marginBottom:8 }}>Email</label>
            <input type="email" placeholder="you@example.com" required
              value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))}
              style={{ width:'100%', padding:'16px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', color:'#fff', font:"400 16px/1 'Manrope'", outline:'none', boxSizing:'border-box' }} />
          </div>
          <div>
            <label style={{ font:"500 14px/1 'Manrope'", color:'rgba(255,255,255,0.55)', display:'block', marginBottom:8 }}>Пароль</label>
            <input type="password" placeholder="••••••••" required
              value={form.password} onChange={e => setForm(f => ({ ...f, password:e.target.value }))}
              style={{ width:'100%', padding:'16px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', color:'#fff', font:"400 16px/1 'Manrope'", outline:'none', boxSizing:'border-box' }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ marginTop:8, width:'100%', padding:18, borderRadius:10, border:'none', cursor:'pointer', background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"600 17px/1 'Inter Tight'", opacity: loading ? .7 : 1 }}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p style={{ font:"400 14px/1 'Manrope'", color:'rgba(255,255,255,0.4)', textAlign:'center', marginTop:24 }}>
          Нет аккаунта?{' '}
          <Link href="/register" style={{ color:'#E52D43', fontWeight:600, textDecoration:'none' }}>Зарегистрироваться</Link>
        </p>
        <p style={{ textAlign:'center', marginTop:12 }}>
          <Link href="/" style={{ font:"400 13px/1 'Manrope'", color:'rgba(255,255,255,0.25)', textDecoration:'none' }}>← На главную</Link>
        </p>
      </div>
    </div>
  )
}
