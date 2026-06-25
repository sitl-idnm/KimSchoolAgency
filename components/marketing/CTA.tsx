'use client'

import { useState } from 'react'

export default function CTA() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.phone.trim()) { setError('Укажите номер телефона'); return }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email }),
      })
      if (!res.ok) throw new Error('server error')
      setSent(true)
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз или напишите нам напрямую.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="sec dark gbg" id="записаться">
      <div className="wrap">
        <div className="cta-in">
          <span className="lbl cy">Начать</span>
          <h2 className="h2 lt">Запишитесь на бесплатную диагностику</h2>
          <p className="sub lt" style={{ margin: '0 auto 32px' }}>
            15 минут — разберёмся с уровнем ребёнка, ответим на вопросы и подберём программу.
          </p>

          {sent ? (
            <div className="cta-ok" style={{ display: 'block' }}>
              <h3>Заявка принята!</h3>
              <p>Мы свяжемся с вами в течение нескольких часов для записи на диагностику.</p>
            </div>
          ) : (
            <form className="cta-form" onSubmit={submit}>
              <input
                className="cta-inp"
                type="text"
                placeholder="Ваше имя (необязательно)"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                className="cta-inp"
                type="tel"
                placeholder="Телефон *"
                required
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
              <input
                className="cta-inp"
                type="email"
                placeholder="Email (необязательно)"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              {error && <p style={{ fontSize: 13, color: 'var(--kim-red-2)', marginTop: 4 }}>{error}</p>}
              <button className="cta-btn" type="submit" disabled={loading}>
                {loading ? 'Отправляем...' : 'Записаться на диагностику'}
              </button>
              <p className="cta-note">Бесплатно · Без обязательств · Ответим сегодня</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
