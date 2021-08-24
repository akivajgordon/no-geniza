import React from 'react';
import './App.css';
import noGeniza from './no-geniza'

const SplitLayout: React.FC<{}> = ({ children }) => <div className="SplitLayout">{children}</div>

function App() {
  const [input, setInput] = React.useState('')

  return (
    <div style={{ padding: '1em' }}>
    <SplitLayout>
      <div>
      <label style={{display: 'block'}}>Source</label>
      <textarea dir="rtl" style={{width: '100%', maxWidth: '100%', boxSizing: 'border-box'}} value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <div>
      <label style={{display: 'block'}}>Processed</label>
      <textarea dir="rtl" style={{width: '100%', maxWidth: '100%', boxSizing: 'border-box'}} value={noGeniza(input)} disabled />

      </div>
    </SplitLayout>
    </div>
  );
}

export default App;
