import React from 'react'
import './App.css'
import noGeniza from './no-geniza'

const SplitLayout: React.FC<{}> = ({ children }) => {
  return <div className="SplitLayout">{children}</div>
}

enum ButtonType {
  action,
}

const Button: React.FC<{ onClick(): void; type: ButtonType }> = ({
  children,
  onClick,
  type,
}) => {
  const buttonStylesByType = {
    [ButtonType.action]: 'action',
  }

  return (
    <button className={`Button ${buttonStylesByType[type]}`} onClick={onClick}>
      {children}
    </button>
  )
}

const Stack: React.FC<{}> = ({ children }) => {
  return <div className="stack">{children}</div>
}

function App() {
  const [input, setInput] = React.useState('')
  const inputArea = React.useRef<HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    inputArea.current?.focus()
  }, [])

  const processed = noGeniza(input)

  return (
    <div style={{ padding: '2em' }}>
      <Stack>
        <div
          style={{
            width: '100%',
            height: '25rem',
            background: 'hsla(0, 0%, 0%, 0.05)',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        <h1>No Geniza</h1>
        <ol>
          {[
            `Paste source text that might contain holy names that would require geniza.`,
            `Copy the result to your clipboard.`,
            `Paste into your document. Now feel free to print it without worrying. Great for printing source sheets for a d'var Torah.`,
          ].map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <a href="https://en.wikipedia.org/wiki/Genizah">
          <strong>
            <em>{`"Geniza" on Wikipedia`}</em>
          </strong>
        </a>

        <div
          style={{
            borderRadius: '6px',
            overflow: 'hidden',
            width: '100%',
            boxShadow: '0 1px 4px hsla(0, 0%, 0%, 0.3)',
            border: '1px solid hsla(0, 0%, 0%, 0.1)',
            background: 'white',
          }}
        >
          <SplitLayout>
            <div
              style={{
                borderRight: '1px solid hsla(0, 0%, 0%, 0.15)',
                padding: '1.5em',
                background: 'hsla(0, 0%, 0%, 0.05)',
              }}
            >
              <textarea
                dir={/[א-ת]/.test(input[0]) ? 'rtl' : 'ltr'}
                style={{
                  width: '100%',
                  height: '10em',
                  fontSize: '1.5rem',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  background: 'none',
                  border: 'none',
                  resize: 'none',
                  outline: 'none',
                }}
                value={processed}
                disabled
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type={ButtonType.action}
                  onClick={() => {
                    navigator.clipboard.writeText(processed)
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/content_copy_black_24dp.svg`}
                      height="16"
                      style={{ filter: 'invert()' }}
                    />
                    <p style={{ marginLeft: '0.25rem', fontWeight: 500 }}>
                      Copy to clipboard
                    </p>
                  </div>
                </Button>
              </div>
            </div>
            <div style={{ padding: '1.5em' }}>
              <textarea
                ref={inputArea}
                dir={/[א-ת]/.test(input[0]) ? 'rtl' : 'ltr'}
                placeholder="Paste (or type) source text here..."
                style={{
                  width: '100%',
                  height: '10em',
                  fontSize: '1.5rem',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  background: 'none',
                  border: 'none',
                  resize: 'none',
                  outline: 'none',
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </SplitLayout>
        </div>
        <footer style={{ marginTop: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://github.com/akivajgordon/no-geniza">
              <img
                src={`${process.env.PUBLIC_URL}/github.svg`}
                height="30"
                style={{ filter: 'invert(0.7)' }}
              />
            </a>
          </div>
        </footer>
      </Stack>
    </div>
  )
}

export default App
