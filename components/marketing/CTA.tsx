'use client'

import { useState } from 'react'
import { applyPhoneMask } from '@/lib/phoneMask'

export default function CTA() {
  const [form, setForm]     = useState({ name:'', phone:'', email:'' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoad]  = useState(false)
  const [error, setError]   = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.phone.trim()) { setError('Укажите номер телефона'); return }
    setLoad(true); setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.')
    } finally {
      setLoad(false)
    }
  }

  return (
    <section className="kim-section kim-section--dark" id="записаться">
      <div className="kim-container">
        <div className="kim-section-inner">
          <div className="cta-inner">
            <span className="kim-eyebrow">Начать</span>
            <h2 className="kim-h2" style={{ marginBottom: 12 }}>Запишитесь на бесплатную диагностику</h2>
            <p className="kim-body" style={{ color:'rgba(255,255,255,.45)', marginBottom: 36 }}>
              15 минут — разберёмся с уровнем ребёнка, ответим на вопросы и подберём программу.
            </p>

            {sent ? (
              <div className="cta-ok">
                <h3 className="kim-h3" style={{ color:'var(--cy)', marginBottom:8 }}>Заявка принята!</h3>
                <p className="kim-body" style={{ color:'rgba(255,255,255,.5)' }}>
                  Свяжемся с вами в течение нескольких часов для записи на диагностику.
                </p>
              </div>
            ) : (
              <div className="kim-form-card" style={{ maxWidth: 480, margin: '0 auto' }}>
                <form style={{ display:'flex', flexDirection:'column', gap:14 }} onSubmit={submit}>
                  <div>
                    <label className="kim-small" style={{ display:'block', marginBottom:6, color:'rgba(255,255,255,.5)' }}>Ваше имя</label>
                    <input className="kim-field" type="text" placeholder="Необязательно" value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))} />
                  </div>
                  <div>
                    <label className="kim-small" style={{ display:'block', marginBottom:6, color:'rgba(255,255,255,.5)' }}>Телефон *</label>
                    <input className="kim-field" type="tel" placeholder="+7 (___) ___-__-__" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: applyPhoneMask(e.target.value) }))} />
                  </div>
                  <div>
                    <label className="kim-small" style={{ display:'block', marginBottom:6, color:'rgba(255,255,255,.5)' }}>Email</label>
                    <input className="kim-field" type="email" placeholder="Необязательно" value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))} />
                  </div>
                  {error && <p className="kim-small" style={{ color:'var(--kim-red-2)' }}>{error}</p>}
                  <button className="kim-btn kim-btn--primary kim-btn--lg" type="submit" disabled={loading} style={{ marginTop:4, width:'100%', justifyContent:'center' }}>
                    {loading ? 'Отправляем...' : 'Записаться на диагностику'}
                  </button>
                  <p className="kim-small" style={{ textAlign:'center', color:'rgba(255,255,255,.25)' }}>
                    Бесплатно · Без обязательств · Ответим сегодня
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
