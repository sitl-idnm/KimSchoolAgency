'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }
    if (form.password.length < 8) {
      setError('Пароль должен быть не менее 8 символов')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName },
      },
    })

    if (authError) {
      setError(authError.message === 'User already registered'
        ? 'Этот email уже зарегистрирован'
        : 'Ошибка регистрации. Попробуйте ещё раз.')
      setLoading(false)
      return
    }

    if (data.user && !data.session) {
      router.push('/register?check-email=1')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const checkEmail = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('check-email')

  if (checkEmail) {
    return (
      <div className="auth-layout">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="auth-logo">KIM <span>AI</span> School</div>
          <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
          <h1 className="auth-title">Проверьте почту</h1>
          <p className="auth-sub">
            Мы отправили письмо с подтверждением на{' '}
            <strong>{form.email || 'ваш email'}</strong>.
            Перейдите по ссылке в письме, чтобы активировать аккаунт.
          </p>
          <p className="auth-alt" style={{ marginTop: 24 }}>
            <Link href="/login">Войти в кабинет →</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">KIM <span>AI</span> School</div>
        <h1 className="auth-title">Создать аккаунт</h1>
        <p className="auth-sub">Доступ к личному кабинету и курсам.</p>

        {error && <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label className="auth-label">Имя</label>
            <input
              className="auth-input"
              type="text"
              placeholder="Константин Ким"
              required
              value={form.fullName}
              onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Пароль</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Минимум 8 символов"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Повторите пароль</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              required
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Регистрируем...' : 'Создать аккаунт'}
          </button>
        </form>

        <p className="auth-alt">
          Уже есть аккаунт?{' '}
          <Link href="/login">Войти</Link>
        </p>
        <p className="auth-alt" style={{ marginTop: 8 }}>
          <Link href="/" style={{ color: 'var(--kim-muted)', fontSize: 13 }}>← На главную</Link>
        </p>
      </div>
    </div>
  )
}
