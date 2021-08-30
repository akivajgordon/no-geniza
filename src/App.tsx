import React from 'react'
import './App.css'
import noGeniza from './no-geniza'

const SplitLayout: React.FC<{}> = ({ children }) => {
  return <div className="SplitLayout">{children}</div>
}

enum ButtonType {
  action = 'action',
}

const Button: React.FC<{ onClick(): void; type: ButtonType }> = ({
  children,
  onClick,
  type,
}) => {
  return (
    <button className={`Button ${type}`} onClick={onClick}>
      {children}
    </button>
  )
}

enum StackSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

const Stack: React.FC<{ size?: StackSize }> = ({
  children,
  size = StackSize.md,
}) => {
  return <div className={`stack ${size}`}>{children}</div>
}

interface TextAreaProps {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  placeholder?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, onChange, disabled, placeholder }, ref) => {
    return (
      <textarea
        ref={ref}
        dir={/[א-ת]/.test(value[0]) ? 'rtl' : 'ltr'}
        placeholder={placeholder}
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
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    )
  }
)

const Centered: React.FC<{}> = ({ children }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
)

function App() {
  const [input, setInput] = React.useState('')
  const [
    recentlyCopiedToClipboard,
    setRecentlyCopiedToClipboard,
  ] = React.useState(false)
  const copiedToClipboardTimer = React.useRef<
    ReturnType<typeof window.setTimeout>
  >()
  const inputArea = React.useRef<HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    inputArea.current?.focus()
  }, [])

  const processed = noGeniza(input)

  return (
    <div style={{ padding: '2em' }}>
      <Stack size={StackSize.xl}>
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
        <Stack>
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
          <em>
            <a href="https://en.wikipedia.org/wiki/Genizah">
              <strong>{`"Geniza" on Wikipedia`}</strong>
            </a>
          </em>
        </Stack>

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
              <TextArea value={processed} disabled />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type={ButtonType.action}
                  onClick={() => {
                    copiedToClipboardTimer.current &&
                      clearTimeout(copiedToClipboardTimer.current)

                    navigator.clipboard.writeText(processed).then(() => {
                      setRecentlyCopiedToClipboard(true)
                      copiedToClipboardTimer.current = setTimeout(() => {
                        setRecentlyCopiedToClipboard(false)
                      }, 1500)
                    })
                  }}
                >
                  {recentlyCopiedToClipboard && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        background: 'black',
                        color: 'white',
                        left: '50%',
                        transform: 'translate(-50%, calc(-100% - 0.5em))',
                        padding: '0.5em 0.75em',
                        borderRadius: '4px',
                      }}
                    >
                      ✓&nbsp;Copied
                    </div>
                  )}
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
              <TextArea
                ref={inputArea}
                placeholder="Paste (or type) source text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </SplitLayout>
        </div>
        <footer>
          <Stack>
            <Centered>
              <span style={{ color: 'hsla(0, 0%, 0%, 0.5)', fontSize: '0.8rem' }}>
                <em>
                  Like this? You might also like{' '}
                  <strong>
                    <a href="https://tikkun.io">tikkun.io</a>
                  </strong>
                  .
                </em>
              </span>
            </Centered>
            <Centered>
              <a href="https://github.com/akivajgordon/no-geniza">
                <img
                  src={`${process.env.PUBLIC_URL}/github.svg`}
                  height="30"
                  style={{ filter: 'invert(0.7)' }}
                />
              </a>
            </Centered>
          </Stack>
        </footer>
      </Stack>
    </div>
  )
}

export default App
