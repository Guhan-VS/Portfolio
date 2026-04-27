import React, { useState, useCallback, useRef, useEffect } from 'react';
import './PhishGuard.css';

// ── Feature extraction (client-side simulation) ─────────────
interface URLFeatures {
  url_length: number;
  num_dots: number;
  num_hyphens: number;
  num_at: number;
  num_subdomains: number;
  has_ip: number;
  has_https: number;
  path_length: number;
  entropy: number;
  num_digits: number;
  num_special_chars: number;
  suspicious_words: number;
}

function extractFeatures(url: string): URLFeatures {
  const lower = url.toLowerCase();
  const dots = (lower.match(/\./g) || []).length;
  const hyphens = (lower.match(/-/g) || []).length;
  const atSigns = (lower.match(/@/g) || []).length;
  const digits = (lower.match(/\d/g) || []).length;
  const specialChars = (lower.match(/[!@#$%^&*()_+={}\[\]:;"'<>,?\/\\|`~]/g) || []).length;
  const hasIP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lower) ? 1 : 0;
  const hasHTTPS = lower.startsWith('https://') ? 1 : 0;

  // Count subdomains
  let hostname = lower;
  try {
    hostname = new URL(lower.startsWith('http') ? lower : 'http://' + lower).hostname;
  } catch { /* use raw */ }
  const parts = hostname.split('.');
  const numSubdomains = Math.max(0, parts.length - 2);

  // Path length
  let pathLength = 0;
  try {
    const parsed = new URL(lower.startsWith('http') ? lower : 'http://' + lower);
    pathLength = parsed.pathname.length;
  } catch { /* ignore */ }

  // Shannon entropy
  const freq: Record<string, number> = {};
  for (const c of lower) freq[c] = (freq[c] || 0) + 1;
  const len = lower.length || 1;
  let entropy = 0;
  for (const count of Object.values(freq)) {
    const p = count / len;
    if (p > 0) entropy -= p * Math.log2(p);
  }

  // Suspicious keywords
  const suspiciousWords = ['login', 'verify', 'secure', 'account', 'update', 'confirm',
    'banking', 'paypal', 'signin', 'password', 'credential', 'suspend', 'unusual',
    'authenticate', 'wallet', 'ebay', 'apple-id', 'microsoft'];
  const suspiciousCount = suspiciousWords.filter(w => lower.includes(w)).length;

  return {
    url_length: url.length,
    num_dots: dots,
    num_hyphens: hyphens,
    num_at: atSigns,
    num_subdomains: numSubdomains,
    has_ip: hasIP,
    has_https: hasHTTPS,
    path_length: pathLength,
    entropy: parseFloat(entropy.toFixed(4)),
    num_digits: digits,
    num_special_chars: specialChars,
    suspicious_words: suspiciousCount,
  };
}

// ── Scoring engine (simulates ML prediction) ─────────────
function predictPhishing(features: URLFeatures): { isPhishing: boolean; confidence: number } {
  let score = 0;

  // Length risk — long URLs are suspicious
  if (features.url_length > 75) score += 0.15;
  else if (features.url_length > 50) score += 0.08;

  // Too many dots (subdomains)
  if (features.num_dots > 4) score += 0.12;
  else if (features.num_dots > 3) score += 0.06;

  // Subdomain count
  if (features.num_subdomains > 3) score += 0.12;
  else if (features.num_subdomains > 1) score += 0.05;

  // Hyphens — phishing domains use many hyphens
  if (features.num_hyphens > 3) score += 0.1;
  else if (features.num_hyphens > 1) score += 0.04;

  // @ sign in URL — highly suspicious
  if (features.num_at > 0) score += 0.2;

  // IP address instead of domain
  if (features.has_ip) score += 0.25;

  // No HTTPS — slight risk
  if (!features.has_https) score += 0.06;

  // High entropy — randomized domain
  if (features.entropy > 4.5) score += 0.1;
  else if (features.entropy > 3.8) score += 0.04;

  // Many digits in URL
  if (features.num_digits > 10) score += 0.1;
  else if (features.num_digits > 5) score += 0.04;

  // Many special characters
  if (features.num_special_chars > 8) score += 0.08;

  // Suspicious words
  if (features.suspicious_words > 2) score += 0.2;
  else if (features.suspicious_words > 0) score += 0.1;

  // Long path
  if (features.path_length > 50) score += 0.08;

  // Normalize to 0–1 range
  const rawConfidence = Math.min(score, 1);

  // Determine prediction — threshold at 0.4
  const isPhishing = rawConfidence > 0.4;

  // Confidence: if phishing, use phishing score; if safe, use (1 - score)
  const confidence = isPhishing ? Math.max(0.55, Math.min(0.98, 0.5 + rawConfidence)) : Math.max(0.6, Math.min(0.98, 1 - rawConfidence));

  return { isPhishing, confidence };
}

// ── Types ─────────────────────────────
interface ScanResult {
  url: string;
  isPhishing: boolean;
  confidence: number;
  model: string;
  features: URLFeatures;
  timestamp: number;
}

// ── Component ──────────────────────────
const PhishGuard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [model, setModel] = useState('sklearn');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const gaugeRef = useRef<SVGCircleElement>(null);

  // Animate gauge on result change
  useEffect(() => {
    if (result && gaugeRef.current) {
      const r = 34;
      const circ = 2 * Math.PI * r;
      const pct = Math.round(result.confidence * 100);
      const offset = circ - (pct / 100) * circ;
      // Start from full offset
      gaugeRef.current.style.strokeDashoffset = String(circ);
      // Animate after a tick
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (gaugeRef.current) {
            gaugeRef.current.style.strokeDashoffset = String(offset);
          }
        }, 80);
      });
    }
  }, [result]);

  const analyze = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed || scanning) return;

    setScanning(true);
    setResult(null);
    setResultVisible(false);
    setFeaturesOpen(false);

    // Simulate network delay (300–700ms)
    const delay = 300 + Math.random() * 400;
    setTimeout(() => {
      const features = extractFeatures(trimmed);
      const { isPhishing, confidence } = predictPhishing(features);
      const modelNames: Record<string, string> = {
        sklearn: 'RandomForest',
        torch: 'CharCNN',
        ensemble: 'Ensemble (RF + CharCNN)',
      };

      const scanResult: ScanResult = {
        url: trimmed,
        isPhishing,
        confidence,
        model: modelNames[model] || model,
        features,
        timestamp: Date.now(),
      };

      setResult(scanResult);
      setHistory(prev => [scanResult, ...prev].slice(0, 10));
      setScanning(false);

      // Trigger visibility animation
      requestAnimationFrame(() => setResultVisible(true));
    }, delay);
  }, [url, scanning, model]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') analyze();
  };

  const rescan = (targetUrl: string) => {
    setUrl(targetUrl);
    // Small delay so state updates
    setTimeout(() => {
      const features = extractFeatures(targetUrl);
      const { isPhishing, confidence } = predictPhishing(features);
      const modelNames: Record<string, string> = {
        sklearn: 'RandomForest',
        torch: 'CharCNN',
        ensemble: 'Ensemble (RF + CharCNN)',
      };
      const scanResult: ScanResult = {
        url: targetUrl,
        isPhishing,
        confidence,
        model: modelNames[model] || model,
        features,
        timestamp: Date.now(),
      };
      setResult(scanResult);
      setResultVisible(true);
    }, 100);
  };

  const formatKey = (key: string) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Gauge params
  const r = 34;
  const circ = 2 * Math.PI * r;
  const pct = result ? Math.round(result.confidence * 100) : 0;
  const gaugeColor = result
    ? result.isPhishing ? 'var(--pg-danger)' : 'var(--pg-safe)'
    : 'var(--pg-text-muted)';

  return (
    <div className="phishguard">
      {/* Header */}
      <div className="pg-header">
        <div className={`pg-shield ${scanning ? 'scanning' : ''}`}>🛡️</div>
        <h3>PhishGuard</h3>
        <p>AI-powered phishing URL detection</p>
      </div>

      {/* Input Card */}
      <div className="pg-card">
        <div className="pg-input-group">
          <input
            type="text"
            className="pg-url-input"
            placeholder="Paste a URL to analyze — e.g. https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
          <button
            className="pg-scan-btn"
            onClick={analyze}
            disabled={scanning || !url.trim()}
          >
            {scanning ? 'Scanning…' : 'Analyze'}
          </button>
        </div>
        <div className="pg-model-selector">
          {['sklearn', 'torch', 'ensemble'].map(m => (
            <button
              key={m}
              className={`pg-model-pill ${model === m ? 'active' : ''}`}
              onClick={() => setModel(m)}
            >
              {m === 'sklearn' ? '🌲 Random Forest' : m === 'torch' ? '🧠 CharCNN' : '⚡ Ensemble'}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {scanning && (
        <div className="pg-card pg-loading">
          <div className="pg-spinner" />
          <div className="pg-loading-text">Analyzing URL with {model} model…</div>
        </div>
      )}

      {/* Result */}
      {result && !scanning && (
        <div className={`pg-card pg-result-card ${resultVisible ? 'visible' : ''}`}>
          <div className="pg-result-header">
            <div className="pg-gauge-wrap">
              <svg className="pg-gauge-svg" viewBox="0 0 80 80">
                <circle className="pg-gauge-bg" cx="40" cy="40" r={r} />
                <circle
                  className="pg-gauge-fill"
                  cx="40"
                  cy="40"
                  r={r}
                  ref={gaugeRef}
                  stroke={gaugeColor}
                  strokeDasharray={circ}
                  strokeDashoffset={circ}
                />
              </svg>
              <div className="pg-gauge-text">
                <span className="pg-gauge-percent" style={{ color: gaugeColor }}>{pct}%</span>
                <span className="pg-gauge-label">Confidence</span>
              </div>
            </div>
            <div className="pg-result-info">
              <div className={`pg-result-badge ${result.isPhishing ? 'pg-badge-danger' : 'pg-badge-safe'}`}>
                {result.isPhishing ? '🚨 Phishing Detected' : '✅ URL is Safe'}
              </div>
              <div className="pg-result-url">{result.url}</div>
              <div className="pg-result-model">Model: {result.model}</div>
            </div>
          </div>

          {/* Feature Breakdown */}
          <button className="pg-features-toggle" onClick={() => setFeaturesOpen(!featuresOpen)}>
            <span className={`pg-arrow ${featuresOpen ? 'open' : ''}`}>▶</span>
            Feature Breakdown ({Object.keys(result.features).length} features)
          </button>
          <div className={`pg-features-grid ${featuresOpen ? 'open' : ''}`}>
            {Object.entries(result.features).map(([k, v]) => (
              <div key={k} className="pg-feature-item">
                <span className="pg-feature-key">{formatKey(k)}</span>
                <span className="pg-feature-val">
                  {typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(4)) : String(v)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      <div className="pg-card">
        <div className="pg-history-header">
          <h4>📋 Scan History</h4>
          {history.length > 0 && (
            <button className="pg-clear-btn" onClick={() => setHistory([])}>Clear All</button>
          )}
        </div>
        {history.length === 0 ? (
          <div className="pg-empty-history">No scans yet. Analyze a URL to get started.</div>
        ) : (
          <div className="pg-history-list">
            {history.map((item, idx) => (
              <div key={idx} className="pg-history-item" onClick={() => rescan(item.url)}>
                <div className={`pg-history-dot ${item.isPhishing ? 'pg-dot-danger' : 'pg-dot-safe'}`} />
                <div className="pg-history-url">{item.url}</div>
                <div className="pg-history-conf">{Math.round(item.confidence * 100)}%</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pg-footer">
        <p>⚠️ Demo — client-side simulation of the full PhishGuard backend</p>
        <p>Built with FastAPI · scikit-learn · PyTorch</p>
      </div>
    </div>
  );
};

export default PhishGuard;
