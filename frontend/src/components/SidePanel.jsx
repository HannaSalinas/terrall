import { useState, useEffect } from 'react'

const TABS = [
  { key: 'transporte', label: 'Transporte' },
  { key: 'turismo', label: 'Turismo' },
  { key: 'educacion', label: 'Educación' },
  { key: 'economia', label: 'Economía' },
]

// Placeholder hasta que llegue el dataset real por departamento
const PLACEHOLDER_INFO = {
  transporte: 'Sistema de transporte con rutas intermunicipales y terminal principal.',
  turismo: 'Destinos turísticos destacados y atractivos naturales de la región.',
  educacion: 'Instituciones educativas y oferta académica disponible.',
  economia: 'Actividades económicas y emprendimientos locales predominantes.',
}

export default function SidePanel({ department, onClose }) {
  const [activeTab, setActiveTab] = useState('transporte')

  useEffect(() => {
    if (department) setActiveTab('transporte')
  }, [department])

  const isOpen = Boolean(department)

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: '380px',
      maxWidth: '90vw',
      background: '#111',
      color: '#ffffff',
      borderLeft: '1px solid rgba(255,215,0,0.3)',
      boxShadow: '-8px 0 24px rgba(0,0,0,0.5)',
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
      zIndex: 20,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,215,0,0.2)',
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', letterSpacing: '0.05em', color: '#ffd700' }}>
          {department || ''}
        </h2>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#ffffff',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '12px 4px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid #ffd700' : '2px solid transparent',
              color: activeTab === tab.key ? '#ffd700' : 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px', overflowY: 'auto', fontSize: '14px', lineHeight: 1.6 }}>
        {PLACEHOLDER_INFO[activeTab]}
      </div>
    </div>
  )
}
