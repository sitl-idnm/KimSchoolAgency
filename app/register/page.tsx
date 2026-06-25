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

    if (err) {
      setError(err.message === 'User already registered' ? 'Email уже зарегистрирован' : 'Ошибка регистрации')
      setLoad(false); return
    }
    if (data.user && !data.session) { setDone(true) }
    else { router.push('/dashboard'); router.refresh() }
    setLoad(false)
  }

  if (done) return (
    <div className="auth-layout">
      <div className="kim-card" style={{ width:'100%', maxWidth:420, padding:40, textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>✉️</div>
        <h2 className="kim-h2" style={{ fontSize:22, marginBottom:8 }}>Проверьте почту</h2>
        <p className="kim-body" style={{ marginBottom:24 }}>
          Мы отправили письмо с подтверждением на <strong>{form.email}</strong>.
          Перейдите по ссылке, чтобы активировать аккаунт.
        </p>
        <Link href="/login" className="kim-btn kim-btn--primary" style={{ width:'100%', justifyContent:'center' }}>
          Войти →
        </Link>
      </div>
    </div>
  )

  return (
    <div className="auth-layout">
      <div className="kim-card" style={{ width:'100%', maxWidth:420, padding:40 }}>
        <Link href="/" style={{ textDecoration:'none', display:'inline-flex', marginBottom:32 }}>
          <Logo variant="dark" height={28} />
        </Link>

        <h1 className="kim-h2" style={{ fontSize:26, marginBottom:8 }}>Создать аккаунт</h1>
        <p className="kim-body" style={{ marginBottom:28 }}>Доступ к личному кабинету и курсам.</p>

        {error && <div className="auth-error">{error}</div>}

        <form style={{ display:'flex', flexDirection:'column', gap:16 }} onSubmit={submit}>
          {[
            { label:'Имя', type:'text',     key:'fullName', placeholder:'Константин Ким' },
            { label:'Email', type:'email',  key:'email',    placeholder:'you@example.com' },
            { label:'Пароль', type:'password', key:'password', placeholder:'Минимум 8 символов' },
            { label:'Повторите пароль', type:'password', key:'confirm', placeholder:'••••••••' },
          ].map(f => (
            <div key={f.key}>
              <label className="auth-label">{f.label}</label>
              <input className="auth-input" type={f.type} placeholder={f.placeholder} required
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
            </div>
          ))}
          <button className="kim-btn kim-btn--primary" type="submit" disabled={loading}
            style={{ marginTop:4, width:'100%', justifyContent:'center' }}>
            {loading ? 'Регистрируем...' : 'Создать аккаунт'}
          </button>
        </form>

        <p className="kim-small" style={{ textAlign:'center', marginTop:20 }}>
          Уже есть аккаунт?{' '}
          <Link href="/login" style={{ color:'var(--kim-red)', fontWeight:600, textDecoration:'none' }}>Войти</Link>
        </p>
      </div>
    </div>
  )
}
