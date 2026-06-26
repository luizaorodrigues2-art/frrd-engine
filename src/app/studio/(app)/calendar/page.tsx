'use client'
import { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react'

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const MOCK_EVENTS: Record<number, { title: string; platform: string; color: string; time: string }[]> = {
  5: [{ title: 'Post produto novo', platform: 'Instagram', color: '#E1306C', time: '10:00' }],
  8: [{ title: 'Dicas de terça', platform: 'LinkedIn', color: '#0A66C2', time: '08:00' }, { title: 'Story promo', platform: 'Instagram', color: '#E1306C', time: '18:00' }],
  12: [{ title: 'Reels viral', platform: 'Instagram', color: '#E1306C', time: '19:00' }],
  15: [{ title: 'Vídeo tutorial', platform: 'YouTube', color: '#FF0000', time: '16:00' }],
  18: [{ title: 'Post motivacional', platform: 'Instagram', color: '#E1306C', time: '07:00' }],
  22: [{ title: 'Semana do cliente', platform: 'Facebook', color: '#1877F2', time: '12:00' }],
  25: [{ title: 'Promoção final', platform: 'Instagram', color: '#E1306C', time: '20:00' }, { title: 'Post LinkedIn', platform: 'LinkedIn', color: '#0A66C2', time: '09:00' }],
}

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const prevMonth = () => setDate(new Date(year, month - 1, 1))
  const nextMonth = () => setDate(new Date(year, month + 1, 1))

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1)

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Calendar size={24} color="var(--auryx-purple-light)" /> Calendário Editorial
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '4px 0 0' }}>Planeje e agende seus conteúdos</p>
        </div>
        <button className="btn-primary" style={{ gap: 8 }}>
          <Plus size={15} /> Novo Post
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Calendar */}
        <div className="glass-card" style={{ padding: 24 }}>
          {/* Month navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <button onClick={prevMonth} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
              <ChevronLeft size={16} />
            </button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{MONTHS[month]} {year}</h2>
            <button onClick={nextMonth} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Days header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
            {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '6px 0' }}>{d}</div>)}
          </div>

          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              const events = MOCK_EVENTS[day] || []
              return (
                <div key={i} style={{
                  minHeight: 80, padding: 8, borderRadius: 10,
                  background: isToday ? 'rgba(124,58,237,0.15)' : 'var(--bg-surface)',
                  border: isToday ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent',
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
                  onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = 'var(--bg-surface-hover)' }}
                  onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = 'var(--bg-surface)' }}
                >
                  <div style={{ fontSize: 13, fontWeight: isToday ? 700 : 500, color: isToday ? '#A855F7' : 'var(--text-primary)', marginBottom: 4 }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {events.slice(0, 2).map((ev, j) => (
                      <div key={j} style={{ background: `${ev.color}22`, border: `1px solid ${ev.color}44`, borderRadius: 4, padding: '2px 5px', fontSize: 10, fontWeight: 500, color: ev.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ev.time} {ev.title}
                      </div>
                    ))}
                    {events.length > 2 && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{events.length - 2}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Today's schedule */}
          <div className="glass-card" style={{ padding: 20 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={15} color="var(--auryx-purple-light)" /> Hoje
            </h3>
            {Object.entries(MOCK_EVENTS).slice(0, 3).flatMap(([, evs]) => evs).slice(0, 4).map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ev.time} · {ev.platform}</div>
                </div>
              </div>
            ))}
            {Object.keys(MOCK_EVENTS).length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Nenhum post agendado hoje</p>
            )}
          </div>

          {/* Quick stats */}
          <div className="glass-card" style={{ padding: 20 }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600 }}>Este mês</h3>
            {[
              { label: 'Posts agendados', value: Object.values(MOCK_EVENTS).flat().length, color: '#7C3AED' },
              { label: 'Publicados', value: 3, color: '#10B981' },
              { label: 'Em rascunho', value: 5, color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
