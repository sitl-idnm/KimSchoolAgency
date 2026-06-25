'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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
    <div className="auth-layout">
      <div className="kim-card" style={{ width:'100%', maxWidth:420, padding:40 }}>
        <Link href="/" style={{ textDecoration:'none' }}>
          <div className="kim-logo-word" style={{ marginBottom:32 }}>
            KIM<span style={{ color:'var(--kim-red)' }}>.</span>SCHOOL
          </div>
        </Link>

        <h1 className="kim-h2" style={{ fontSize:26, marginBottom:8 }}>Войти в кабинет</h1>
        <p className="kim-body" style={{ marginBottom:28 }}>Введите данные, указанные при регистрации.</p>

        {error && <div className="auth-error">{error}</div>}

        <form style={{ display:'flex', flexDirection:'column', gap:16 }} onSubmit={submit}>
          <div>
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" placeholder="you@example.com" required
              value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} />
          </div>
          <div>
            <label className="auth-label">Пароль</label>
            <input className="auth-input" type="password" placeholder="••••••••" required
              value={form.password} onChange={e => setForm(f => ({ ...f, password:e.target.value }))} />
          </div>
          <button className="kim-btn kim-btn--primary" type="submit" disabled={loading}
            style={{ marginTop:4, width:'100%', justifyContent:'center' }}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="kim-small" style={{ textAlign:'center', marginTop:20 }}>
          Нет аккаунта?{' '}
          <Link href="/register" style={{ color:'var(--kim-red)', fontWeight:600, textDecoration:'none' }}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  )
}
