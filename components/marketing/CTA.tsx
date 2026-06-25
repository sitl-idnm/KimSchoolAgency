'use client'
import { useState } from 'react'
import { applyPhoneMask } from '@/lib/phoneMask'

/* Форма — точно по standoff §CONSULT FORM: dark 2-col layout */
export default function CTA() {
  const [form, setForm]  = useState({ name:'', phone:'', email:'' })
  const [done, setDone]  = useState(false)
  const [load, setLoad]  = useState(false)
  const [err, setErr]    = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.phone.trim()) { setErr('Укажите номер телефона'); return }
    setLoad(true); setErr('')
    try {
      const r = await fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!r.ok) throw new Error()
      setDone(true)
    } catch {
      setErr('Ошибка. Попробуйте ещё раз или напишите в Telegram.')
    } finally {
      setLoad(false)
    }
  }

  return (
    <section id="записаться" style={{ marginTop:104, background:'#16181B' }}>
      <div className="cta-grid" style={{ maxWidth:1440, margin:'0 auto', padding:'96px clamp(20px,4vw,64px)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>

        {/* Left — text */}
        <div>
          <span style={{ display:'inline-flex', alignItems:'center', gap:10, color:'#E52D43', font:"600 14px/1 'Inter Tight'", letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:22 }}>
            <span style={{ fontSize:15 }}>✳</span> Бесплатная диагностика
          </span>
          <h2 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:'clamp(30px,3.6vw,48px)', lineHeight:1.08, letterSpacing:'-1.4px', color:'#fff', margin:'0 0 20px' }}>
            Запишитесь на диагностику прямо сейчас
          </h2>
          <p style={{ font:"400 18px/1.6 'Manrope'", color:'rgba(255,255,255,0.6)', margin:0, maxWidth:460 }}>
            15 минут — разберёмся с уровнем ребёнка, ответим на вопросы и подберём программу. Бесплатно и без обязательств.
          </p>
        </div>

        {/* Right — form card */}
        <div style={{ background:'#1f2125', border:'1px solid rgba(255,255,255,0.08)', borderRadius:24, padding:'clamp(28px,3vw,44px)' }}>
          {done ? (
            <div style={{ textAlign:'center', padding:'30px 10px' }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:'linear-gradient(-72deg,#CB172C,#E52D43)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 22px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 style={{ fontFamily:"'Inter Tight',sans-serif", fontWeight:600, fontSize:26, color:'#fff', margin:'0 0 10px' }}>Заявка отправлена!</h3>
              <p style={{ font:"400 16px/1.6 'Manrope'", color:'rgba(255,255,255,0.6)', margin:0 }}>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <label style={{ font:"500 14px/1 'Manrope'", color:'rgba(255,255,255,0.55)' }}>Имя</label>
              <input type="text" placeholder="Как к вам обращаться"
                value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
                style={{ width:'100%', padding:'18px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', color:'#fff', font:"400 16px/1 'Manrope'", outline:'none' }} />
              <label style={{ font:"500 14px/1 'Manrope'", color:'rgba(255,255,255,0.55)', marginTop:6 }}>Телефон *</label>
              <input type="tel" placeholder="+7 (___) ___-__-__" required
                value={form.phone} onChange={e => setForm(f => ({ ...f, phone: applyPhoneMask(e.target.value) }))}
                style={{ width:'100%', padding:'18px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', color:'#fff', font:"400 16px/1 'Manrope'", outline:'none' }} />
              {err && <p style={{ font:"400 13px/1.4 'Manrope'", color:'#E52D43', margin:0 }}>{err}</p>}
              <button type="submit" disabled={load} style={{ marginTop:10, width:'100%', padding:19, borderRadius:10, border:'none', cursor:'pointer', background:'linear-gradient(-72deg,#CB172C,#E52D43)', color:'#fff', font:"600 17px/1 'Inter Tight'", opacity: load ? .7 : 1 }}>
                {load ? 'Отправляем...' : 'Записаться на диагностику'}
              </button>
              <p style={{ font:"400 13px/1.5 'Manrope'", color:'rgba(255,255,255,0.4)', margin:'6px 0 0' }}>
                Нажимая «Записаться», вы соглашаетесь с обработкой персональных данных.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
