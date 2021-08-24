import React from 'react'
import './App.css'
import noGeniza from './no-geniza'

const SplitLayout: React.FC<{}> = ({ children }) => {
  return <div className="SplitLayout">{children}</div>
}

const Button: React.FC<{ onClick(): void }> = ({ children, onClick }) => {
  return (
    <button className="Button" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  const [input, setInput] = React.useState('')

  const processed = noGeniza(input)

  return (
    <div style={{ padding: '1em' }}>
      <SplitLayout>
        <div style={{ alignSelf: 'flex-end' }}>
          <label style={{ display: 'block' }}>Source</label>
          <textarea
            dir="rtl"
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ alignSelf: 'flex-end' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <label style={{ display: 'block' }}>Processed</label>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(processed)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/content_copy_black_24dp.svg" height="16" />
                <p style={{ marginLeft: '0.25rem' }}>Copy to clipboard</p>
              </div>
            </Button>
          </div>
          <textarea
            dir="rtl"
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
            value={processed}
            disabled
          />
        </div>
      </SplitLayout>
    </div>
  )
}

export default App
