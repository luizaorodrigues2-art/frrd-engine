'use client'
import { useState } from 'react'
import { Image, Layers, Type, Square, Circle, Triangle, Download, Undo, Redo, ZoomIn, ZoomOut, Grid, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Trash2, Copy, Sparkles, Palette } from 'lucide-react'

const CANVAS_PRESETS = [
  { name: 'Post Instagram', w: 1080, h: 1080 },
  { name: 'Story', w: 1080, h: 1920 },
  { name: 'Banner Facebook', w: 1200, h: 628 },
  { name: 'LinkedIn Post', w: 1200, h: 627 },
  { name: 'YouTube Thumb', w: 1280, h: 720 },
  { name: 'Pinterest', w: 1000, h: 1500 },
  { name: 'Flyer A4', w: 2480, h: 3508 },
]

export default function EditorPage() {
  const [selectedPreset, setSelectedPreset] = useState(CANVAS_PRESETS[0])
  const [zoom, setZoom] = useState(100)
  const [selectedTool, setSelectedTool] = useState('select')
  const [selectedLayer, setSelectedLayer] = useState(0)

  const LAYERS = [
    { name: 'Texto Principal', type: 'text', visible: true },
    { name: 'Imagem de Fundo', type: 'image', visible: true },
    { name: 'Overlay', type: 'rect', visible: true },
  ]

  const TOOLS = [
    { id: 'select', icon: '↗', label: 'Selecionar' },
    { id: 'text', icon: 'T', label: 'Texto' },
    { id: 'rect', icon: '□', label: 'Retângulo' },
    { id: 'circle', icon: '○', label: 'Círculo' },
    { id: 'image', icon: '🖼', label: 'Imagem' },
    { id: 'ai', icon: '✨', label: 'IA' },
  ]

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', margin: '-28px', overflow: 'hidden' }}>
      {/* Editor Toolbar */}
      <div style={{ height: 52, background: 'rgba(5,5,15,0.98)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, gap: 8, flexShrink: 0 }}>
        {/* File name */}
        <input defaultValue="Novo design" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, outline: 'none', width: 180 }} />

        <div style={{ width: 1, height: 28, background: 'var(--border)', margin: '0 4px' }} />

        {/* History */}
        {[<Undo size={16} key="u" />, <Redo size={16} key="r" />].map((icon, i) => (
          <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px 8px', borderRadius: 6, display: 'flex', transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >{icon}</button>
        ))}

        <div style={{ width: 1, height: 28, background: 'var(--border)', margin: '0 4px' }} />

        {/* Zoom */}
        <button onClick={() => setZoom(z => Math.max(25, z - 10))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px 8px', borderRadius: 6, display: 'flex' }}><ZoomOut size={16} /></button>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', minWidth: 44, textAlign: 'center' }}>{zoom}%</span>
        <button onClick={() => setZoom(z => Math.min(400, z + 10))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px 8px', borderRadius: 6, display: 'flex' }}><ZoomIn size={16} /></button>

        <div style={{ width: 1, height: 28, background: 'var(--border)', margin: '0 4px' }} />

        {/* Format */}
        {[Bold, Italic, AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
          <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px 8px', borderRadius: 6, display: 'flex', transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          ><Icon size={15} /></button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {/* Preset selector */}
          <select value={selectedPreset.name} onChange={e => setSelectedPreset(CANVAS_PRESETS.find(p => p.name === e.target.value) || CANVAS_PRESETS[0])}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: 'var(--text-primary)', cursor: 'pointer' }}>
            {CANVAS_PRESETS.map(p => <option key={p.name}>{p.name}</option>)}
          </select>

          <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
            <Sparkles size={13} /> IA
          </button>
          <button className="btn-primary" style={{ fontSize: 12, padding: '6px 12px' }}>
            <Download size={13} /> Exportar
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left toolbar */}
        <div style={{ width: 52, background: 'rgba(5,5,15,0.98)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 4 }}>
          {TOOLS.map(tool => (
            <button key={tool.id} onClick={() => setSelectedTool(tool.id)} title={tool.label}
              style={{ width: 40, height: 40, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.15s',
                background: selectedTool === tool.id ? 'rgba(124,58,237,0.2)' : 'transparent',
                color: selectedTool === tool.id ? '#A855F7' : 'var(--text-muted)',
                borderLeft: selectedTool === tool.id ? '2px solid #A855F7' : '2px solid transparent'
              }}>
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Canvas area */}
        <div style={{ flex: 1, background: '#111120', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative' }}>
          {/* Grid bg */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Canvas */}
          <div style={{
            width: Math.min(selectedPreset.w * (zoom / 100) * 0.35, 700),
            height: Math.min(selectedPreset.h * (zoom / 100) * 0.35, 700),
            background: 'linear-gradient(135deg, #1a0533 0%, #0d001a 100%)',
            borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.8)', position: 'relative', overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}>
            {/* Sample content */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32, gap: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 800, background: 'linear-gradient(135deg, #fff 30%, rgba(168,85,247,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
                AURYX STUDIO
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Editor profissional com IA</div>
              <div style={{ width: 60, height: 3, background: 'var(--gradient-brand)', borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Right panel - Layers + Properties */}
        <div style={{ width: 240, background: 'rgba(5,5,15,0.98)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Layers */}
          <div style={{ borderBottom: '1px solid var(--border)', padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Layers size={12} /> Camadas</span>
              <button style={{ background: 'var(--gradient-brand)', border: 'none', borderRadius: 4, width: 18, height: 18, cursor: 'pointer', color: 'white', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            {LAYERS.map((layer, i) => (
              <div key={i} onClick={() => setSelectedLayer(i)} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 2,
                background: selectedLayer === i ? 'rgba(124,58,237,0.15)' : 'transparent',
                border: selectedLayer === i ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
              }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                  {layer.type === 'text' ? 'T' : layer.type === 'image' ? '🖼' : '□'}
                </div>
                <span style={{ fontSize: 12, flex: 1, color: selectedLayer === i ? '#A855F7' : 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{layer.name}</span>
              </div>
            ))}
          </div>

          {/* Properties */}
          <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>Propriedades</div>
            {[
              { label: 'X', value: '0', unit: 'px' },
              { label: 'Y', value: '0', unit: 'px' },
              { label: 'Largura', value: String(selectedPreset.w), unit: 'px' },
              { label: 'Altura', value: String(selectedPreset.h), unit: 'px' },
              { label: 'Opacidade', value: '100', unit: '%' },
              { label: 'Rotação', value: '0', unit: '°' },
            ].map(prop => (
              <div key={prop.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 64 }}>{prop.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input defaultValue={prop.value} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 8px', fontSize: 12, color: 'var(--text-primary)', outline: 'none', width: 80, textAlign: 'right' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 20 }}>{prop.unit}</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Cor de fundo</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444', '#000000', '#FFFFFF'].map(c => (
                  <div key={c} style={{ width: 22, height: 22, borderRadius: 4, background: c, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)', transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
                <div style={{ width: 22, height: 22, borderRadius: 4, background: 'var(--bg-surface)', border: '1px dashed var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={12} color="var(--text-muted)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
