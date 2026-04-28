import React, { useState, useCallback } from 'react';
import './CryptoTool.css';

// ─── Classical Ciphers ───
const caesarEncrypt = (text: string, shift: number): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
  });
};

const vigenereEncrypt = (text: string, key: string): string => {
  if (!key) return text;
  let ki = 0;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const shift = key[ki % key.length].toLowerCase().charCodeAt(0) - 97;
    ki++;
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
  });
};

const vigenereDecrypt = (text: string, key: string): string => {
  if (!key) return text;
  let ki = 0;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const shift = key[ki % key.length].toLowerCase().charCodeAt(0) - 97;
    ki++;
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base - shift) % 26 + 26) % 26 + base);
  });
};

// ─── Cipher Detection ───
const detectCipher = (text: string): string[] => {
  const results: string[] = [];
  if (!text.trim()) return ['Enter some text to analyze'];
  try { atob(text); if (/^[A-Za-z0-9+/=]+$/.test(text) && text.length > 3) results.push('🔍 Possibly Base64 encoded'); } catch {}
  if (/^[0-9a-fA-F]+$/.test(text) && text.length % 2 === 0 && text.length > 3) results.push('🔍 Possibly Hex encoded');
  if (/^[a-zA-Z\s]+$/.test(text)) results.push('🔍 Possibly Caesar/ROT13 (letter-only input)');
  if (text.startsWith('gAAAAA')) results.push('🔍 Possibly Fernet (AES) encrypted');
  if (/^[A-Za-z0-9+/]{20,}={0,2}$/.test(text)) results.push('🔍 Could be symmetric cipher output (Base64-wrapped)');
  if (text.length > 50 && /[^\x20-\x7E]/.test(text)) results.push('🔍 Contains non-printable characters — likely binary/encrypted');
  return results.length ? results : ['❓ Unknown or custom cipher'];
};

// ─── Helpers ───
const arrayBufToHex = (buf: ArrayBuffer): string =>
  Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

const hexToArrayBuf = (hex: string): ArrayBuffer => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  return bytes.buffer;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

// ─── Tabs ───
type TabId = 'classical' | 'modern' | 'detect' | 'file';

const CryptoTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('classical');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };
  const copyText = (text: string) => { navigator.clipboard.writeText(text); showToast('Copied to clipboard!'); };

  return (
    <div className="crypto-tool">
      <div className="crypto-tabs">
        {([['classical','🔤 Classical'],['modern','🔐 AES-256'],['detect','🕵️ Detect'],['file','📁 File']] as [TabId,string][]).map(([id,label]) => (
          <button key={id} className={`crypto-tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </div>
      <div className="crypto-tab-content">
        {activeTab === 'classical' && <ClassicalTab onCopy={copyText} />}
        {activeTab === 'modern' && <ModernTab onCopy={copyText} />}
        {activeTab === 'detect' && <DetectTab />}
        {activeTab === 'file' && <FileTab onCopy={copyText} />}
      </div>
      {toast && <div className="crypto-copy-toast">{toast}</div>}
    </div>
  );
};

// ═══════════════════════════════════════
// Classical Ciphers Tab
// ═══════════════════════════════════════
const ClassicalTab: React.FC<{onCopy:(t:string)=>void}> = ({ onCopy }) => {
  const [mode, setMode] = useState<'encrypt'|'decrypt'>('encrypt');
  const [cipher, setCipher] = useState('caesar');
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [key, setKey] = useState('secret');
  const [result, setResult] = useState('');

  const process = () => {
    if (!text.trim()) return;
    let out = '';
    if (cipher === 'caesar') {
      out = mode === 'encrypt' ? caesarEncrypt(text, shift) : caesarEncrypt(text, -shift);
    } else if (cipher === 'rot13') {
      out = caesarEncrypt(text, 13);
    } else if (cipher === 'vigenere') {
      out = mode === 'encrypt' ? vigenereEncrypt(text, key) : vigenereDecrypt(text, key);
    }
    setResult(out);
  };

  return (
    <>
      <div className="crypto-section-header">
        <span className="crypto-section-icon">🔤</span>
        <div><h4>Classical Ciphers</h4><p>Caesar, Vigenère, ROT13</p></div>
      </div>
      <div className="crypto-mode-toggle">
        <button className={`crypto-mode-btn ${mode==='encrypt'?'active':''}`} onClick={()=>setMode('encrypt')}>🔒 Encrypt</button>
        <button className={`crypto-mode-btn ${mode==='decrypt'?'active':''}`} onClick={()=>setMode('decrypt')}>🔓 Decrypt</button>
      </div>
      <div className="crypto-row">
        <div className="crypto-field">
          <label className="crypto-label">Cipher</label>
          <select className="crypto-select" value={cipher} onChange={e=>setCipher(e.target.value)}>
            <option value="caesar">Caesar Cipher</option>
            <option value="rot13">ROT13</option>
            <option value="vigenere">Vigenère Cipher</option>
          </select>
        </div>
        {cipher === 'caesar' && (
          <div className="crypto-field" style={{maxWidth:120}}>
            <label className="crypto-label">Shift</label>
            <input className="crypto-input" type="number" min={1} max={25} value={shift} onChange={e=>setShift(Number(e.target.value))} />
          </div>
        )}
        {cipher === 'vigenere' && (
          <div className="crypto-field">
            <label className="crypto-label">Key</label>
            <input className="crypto-input" type="text" value={key} onChange={e=>setKey(e.target.value)} placeholder="Enter key..." />
          </div>
        )}
      </div>
      <div className="crypto-field">
        <label className="crypto-label">{mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</label>
        <textarea className="crypto-textarea" value={text} onChange={e=>setText(e.target.value)} placeholder={mode==='encrypt'?'Enter text to encrypt...':'Enter text to decrypt...'} rows={3} />
      </div>
      <button className="crypto-btn crypto-btn-primary" onClick={process}>{mode==='encrypt'?'🔒 Encrypt':'🔓 Decrypt'}</button>
      {result && (
        <div className="crypto-result">
          <div className="crypto-result-label">
            <span>{mode==='encrypt'?'Ciphertext':'Plaintext'}</span>
            <button className="crypto-btn crypto-btn-secondary" style={{padding:'4px 12px',fontSize:'0.72rem'}} onClick={()=>onCopy(result)}>📋 Copy</button>
          </div>
          <div className="crypto-result-value">{result}</div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════
// Modern AES-256 Tab
// ═══════════════════════════════════════
const ModernTab: React.FC<{onCopy:(t:string)=>void}> = ({ onCopy }) => {
  const [mode, setMode] = useState<'encrypt'|'decrypt'>('encrypt');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [keyHex, setKeyHex] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const aesEncrypt = async () => {
    if (!text.trim()) return;
    setProcessing(true); setError('');
    try {
      const key = await crypto.subtle.generateKey({name:'AES-GCM',length:256}, true, ['encrypt','decrypt']);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encoded = new TextEncoder().encode(text);
      const encrypted = await crypto.subtle.encrypt({name:'AES-GCM',iv}, key, encoded);
      const rawKey = await crypto.subtle.exportKey('raw', key);
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv); combined.set(new Uint8Array(encrypted), iv.length);
      setResult(arrayBufToHex(combined.buffer));
      setKeyHex(arrayBufToHex(rawKey));
    } catch { setError('Encryption failed'); }
    setProcessing(false);
  };

  const aesDecrypt = async () => {
    if (!text.trim() || !decryptKey.trim()) { setError('Enter ciphertext and key'); return; }
    setProcessing(true); setError('');
    try {
      const combined = new Uint8Array(hexToArrayBuf(text.trim()));
      const iv = combined.slice(0, 12);
      const data = combined.slice(12);
      const keyBuf = hexToArrayBuf(decryptKey.trim());
      const key = await crypto.subtle.importKey('raw', keyBuf, 'AES-GCM', false, ['decrypt']);
      const decrypted = await crypto.subtle.decrypt({name:'AES-GCM',iv}, key, data);
      setResult(new TextDecoder().decode(decrypted));
      setKeyHex('');
    } catch { setError('Decryption failed. Wrong key or corrupted data.'); }
    setProcessing(false);
  };

  return (
    <>
      <div className="crypto-section-header">
        <span className="crypto-section-icon">🔐</span>
        <div><h4>AES-256-GCM Encryption</h4><p>Industry-standard authenticated encryption</p></div>
      </div>
      <div className="crypto-mode-toggle">
        <button className={`crypto-mode-btn ${mode==='encrypt'?'active':''}`} onClick={()=>{setMode('encrypt');setResult('');setError('');}}>🔒 Encrypt</button>
        <button className={`crypto-mode-btn ${mode==='decrypt'?'active':''}`} onClick={()=>{setMode('decrypt');setResult('');setError('');}}>🔓 Decrypt</button>
      </div>
      <div className="crypto-field">
        <label className="crypto-label">{mode==='encrypt'?'Plaintext':'Ciphertext (Hex)'}</label>
        <textarea className="crypto-textarea" value={text} onChange={e=>setText(e.target.value)} placeholder={mode==='encrypt'?'Enter text to encrypt...':'Paste hex ciphertext...'} rows={3}/>
      </div>
      {mode==='decrypt' && (
        <div className="crypto-field">
          <label className="crypto-label">Decryption Key (Hex)</label>
          <input className="crypto-input" value={decryptKey} onChange={e=>setDecryptKey(e.target.value)} placeholder="Paste the 64-char hex key..." />
        </div>
      )}
      {processing ? (
        <div className="crypto-processing"><div className="crypto-spinner" />Processing...</div>
      ) : (
        <button className="crypto-btn crypto-btn-primary" onClick={mode==='encrypt'?aesEncrypt:aesDecrypt}>{mode==='encrypt'?'🔒 Encrypt with AES-256':'🔓 Decrypt'}</button>
      )}
      {error && <p style={{color:'#ef4444',fontSize:'0.85rem',marginTop:'0.75rem'}}>{error}</p>}
      {result && (
        <div className="crypto-result">
          <div className="crypto-result-label">
            <span>{mode==='encrypt'?'Ciphertext (Hex)':'Decrypted Plaintext'}</span>
            <button className="crypto-btn crypto-btn-secondary" style={{padding:'4px 12px',fontSize:'0.72rem'}} onClick={()=>onCopy(result)}>📋 Copy</button>
          </div>
          <div className="crypto-result-value">{result}</div>
        </div>
      )}
      {keyHex && (
        <div className="crypto-key-display">
          <div className="key-warning">⚠️ Save this key — it's the ONLY way to decrypt!</div>
          <div className="crypto-key-value" onClick={()=>onCopy(keyHex)} title="Click to copy">{keyHex}</div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════
// Cipher Detection Tab
// ═══════════════════════════════════════
const DetectTab: React.FC = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const analyze = () => { setResults(detectCipher(text)); };

  return (
    <>
      <div className="crypto-section-header">
        <span className="crypto-section-icon">🕵️</span>
        <div><h4>Cipher Detection</h4><p>Analyze unknown ciphertext to identify encoding</p></div>
      </div>
      <div className="crypto-field">
        <label className="crypto-label">Unknown Ciphertext</label>
        <textarea className="crypto-textarea" value={text} onChange={e=>setText(e.target.value)} placeholder="Paste unknown encrypted or encoded text..." rows={4} />
      </div>
      <button className="crypto-btn crypto-btn-primary" onClick={analyze}>🔎 Analyze</button>
      {results.length > 0 && (
        <div className="crypto-result">
          <div className="crypto-result-label"><span>Detection Results</span></div>
          <ul className="crypto-detection-list">
            {results.map((r,i) => <li key={i} className="crypto-detection-item"><span className="det-icon">•</span>{r}</li>)}
          </ul>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════
// File Encryption Tab
// ═══════════════════════════════════════
const FileTab: React.FC<{onCopy:(t:string)=>void}> = ({ onCopy }) => {
  const [mode, setMode] = useState<'encrypt'|'decrypt'>('encrypt');
  const [file, setFile] = useState<File|null>(null);
  const [keyHex, setKeyHex] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => { setFile(f); setError(''); setDone(''); setKeyHex(''); };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  }, []);

  const encryptFile = async () => {
    if (!file) return;
    setProcessing(true); setError(''); setDone('');
    try {
      const data = await file.arrayBuffer();
      const key = await crypto.subtle.generateKey({name:'AES-GCM',length:256},true,['encrypt']);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt({name:'AES-GCM',iv}, key, data);
      const rawKey = await crypto.subtle.exportKey('raw', key);
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv); combined.set(new Uint8Array(encrypted), iv.length);
      const blob = new Blob([combined]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = file.name + '.enc'; a.click();
      URL.revokeObjectURL(url);
      setKeyHex(arrayBufToHex(rawKey));
      setDone('File encrypted & downloaded successfully!');
    } catch { setError('Encryption failed'); }
    setProcessing(false);
  };

  const decryptFile = async () => {
    if (!file || !decryptKey.trim()) { setError('Select a .enc file and provide the key'); return; }
    setProcessing(true); setError(''); setDone('');
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const iv = data.slice(0, 12);
      const encData = data.slice(12);
      const keyBuf = hexToArrayBuf(decryptKey.trim());
      const key = await crypto.subtle.importKey('raw', keyBuf, 'AES-GCM', false, ['decrypt']);
      const decrypted = await crypto.subtle.decrypt({name:'AES-GCM',iv}, key, encData);
      const origName = file.name.endsWith('.enc') ? file.name.slice(0,-4) : 'decrypted_'+file.name;
      const blob = new Blob([decrypted]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = origName; a.click();
      URL.revokeObjectURL(url);
      setDone('File decrypted & downloaded!');
    } catch { setError('Decryption failed. Wrong key or corrupted file.'); }
    setProcessing(false);
  };

  return (
    <>
      <div className="crypto-section-header">
        <span className="crypto-section-icon">📁</span>
        <div><h4>File Encryption</h4><p>AES-256-GCM — works on any file type</p></div>
      </div>
      <div className="crypto-mode-toggle">
        <button className={`crypto-mode-btn ${mode==='encrypt'?'active':''}`} onClick={()=>{setMode('encrypt');setFile(null);setError('');setDone('');setKeyHex('');}}>🔒 Encrypt</button>
        <button className={`crypto-mode-btn ${mode==='decrypt'?'active':''}`} onClick={()=>{setMode('decrypt');setFile(null);setError('');setDone('');setKeyHex('');}}>🔓 Decrypt</button>
      </div>
      {!file ? (
        <div className={`crypto-dropzone ${dragging?'dragging':''}`}
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={handleDrop}
          onClick={()=>{const i=document.createElement('input');i.type='file';i.onchange=()=>{if(i.files?.[0])handleFile(i.files[0]);};i.click();}}>
          <div className="crypto-dropzone-icon">📂</div>
          <p className="crypto-dropzone-text">Drop a file here or click to browse</p>
          <p className="crypto-dropzone-sub">{mode==='encrypt'?'Any file type supported':'Select a .enc file'}</p>
        </div>
      ) : (
        <div className="crypto-file-info">
          <span>📄</span>
          <span className="file-name">{file.name}</span>
          <span className="file-size">{formatFileSize(file.size)}</span>
          <button className="crypto-file-remove" onClick={()=>{setFile(null);setDone('');setKeyHex('');setError('');}}>✕</button>
        </div>
      )}
      {mode==='decrypt' && (
        <div className="crypto-field">
          <label className="crypto-label">Decryption Key (Hex)</label>
          <input className="crypto-input" value={decryptKey} onChange={e=>setDecryptKey(e.target.value)} placeholder="Paste the 64-char hex key..." />
        </div>
      )}
      {processing ? (
        <div className="crypto-processing"><div className="crypto-spinner" />Processing file...</div>
      ) : (
        <button className="crypto-btn crypto-btn-primary" onClick={mode==='encrypt'?encryptFile:decryptFile} disabled={!file}>
          {mode==='encrypt'?'🔒 Encrypt File':'🔓 Decrypt File'}
        </button>
      )}
      {error && <p style={{color:'#ef4444',fontSize:'0.85rem',marginTop:'0.75rem'}}>{error}</p>}
      {done && <p style={{color:'#22c55e',fontSize:'0.85rem',marginTop:'0.75rem'}}>{done}</p>}
      {keyHex && (
        <div className="crypto-key-display">
          <div className="key-warning">⚠️ Save this key! Without it your file CANNOT be recovered.</div>
          <div className="crypto-key-value" onClick={()=>onCopy(keyHex)} title="Click to copy">{keyHex}</div>
        </div>
      )}
    </>
  );
};

export default CryptoTool;
