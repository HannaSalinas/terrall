import { useState, useEffect } from 'react'
import { DEPARTMENTS } from '../data/departments'
import { TOURISM_STATS } from '../data/tourismStats'

const TABS = [
  { key: 'transporte', label: 'Transporte' },
  { key: 'turismo', label: 'Turismo' },
  { key: 'educacion', label: 'Educación' },
  { key: 'economia', label: 'Economía' },
]

// Campo con la lista a mostrar debajo de la descripción, por tab
const LIST_FIELD = {
  transporte: 'routes',
  turismo: 'topDestinations',
  educacion: 'universities',
  economia: 'mainActivities',
}

export default function SidePanel({ department, onClose }) {
  const [activeTab, setActiveTab] = useState('transporte')

  useEffect(() => {
    if (department) setActiveTab('transporte')
  }, [department])

  const isOpen = Boolean(department)
  const info = department ? DEPARTMENTS[department]?.[activeTab] : null
  const listField = LIST_FIELD[activeTab]
  const tourismStats = department ? TOURISM_STATS[department] : null

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
        {info ? (
          <>
            <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.9)' }}>{info.description}</p>
            {info.mainTerminal && (
              <p style={{ margin: '0 0 16px', color: '#ffd700', fontSize: '13px' }}>
                Terminal principal: {info.mainTerminal}
              </p>
            )}

            {activeTab === 'turismo' && tourismStats ? (
              <>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                  <strong style={{ color: '#ffd700' }}>{tourismStats.total.toLocaleString('es-CO')}</strong>{' '}
                  establecimientos turísticos activos registrados
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255,255,255,0.75)' }}>
                  {tourismStats.topCategories.map(cat => (
                    <li key={cat.categoria} style={{ marginBottom: '8px' }}>
                      {cat.categoria} — {cat.count.toLocaleString('es-CO')}
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: '20px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                  Fuente: Registro Nacional de Turismo (RNT), datos.gov.co
                </p>
              </>
            ) : (
              info[listField] && (
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255,255,255,0.75)' }}>
                  {info[listField].map(item => (
                    <li key={item} style={{ marginBottom: '8px' }}>{item}</li>
                  ))}
                </ul>
              )
            )}
          </>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Sin información disponible.</p>
        )}
      </div>
    </div>
  )
}
