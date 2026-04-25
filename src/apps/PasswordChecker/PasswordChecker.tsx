import React, { useState, useEffect } from 'react';
import './PasswordChecker.css';

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  feedback: string[];
}

const checkPasswordStrength = (password: string): StrengthResult => {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return { score: 0, label: 'Unknown', color: '#dcdde1', feedback: [] };
  }

  // 1. Length Check
  if (password.length >= 12) {
    score += 2;
  } else if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("- Password is too short (min 12 recommended).");
  }

  // 2. Uppercase Check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("- Add an uppercase letter.");
  }

  // 3. Lowercase Check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("- Add a lowercase letter.");
  }

  // 4. Number Check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("- Add a number.");
  }

  // 5. Special Character Check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("- Add a special character.");
  }

  if (score >= 6) return { score, label: 'Very Strong', color: '#2ecc71', feedback: ['Best practices followed!'] };
  if (score === 5) return { score, label: 'Strong', color: '#27ae60', feedback };
  if (score === 4) return { score, label: 'Medium', color: '#f1c40f', feedback };
  if (score === 3) return { score, label: 'Weak', color: '#e67e22', feedback };
  return { score, label: 'Very Weak', color: '#e74c3c', feedback };
};

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<StrengthResult>({ score: 0, label: 'Unknown', color: '#dcdde1', feedback: [] });

  useEffect(() => {
    setResult(checkPasswordStrength(password));
  }, [password]);

  return (
    <div className="password-checker">
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          className="password-input"
        />
        <label className="show-pass">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show
        </label>
      </div>

      <div className="strength-meter">
        <div 
          className="strength-bar" 
          style={{ 
            width: `${(result.score / 6) * 100}%`, 
            backgroundColor: result.color 
          }}
        ></div>
      </div>

      <p className="strength-label" style={{ color: result.color }}>
        Strength: <strong>{result.label}</strong>
      </p>

      <div className="feedback-section">
        <h4>Security Tips:</h4>
        <ul>
          {result.feedback.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordChecker;
