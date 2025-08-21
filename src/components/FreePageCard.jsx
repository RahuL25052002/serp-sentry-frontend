import React from 'react';
import { Navbar } from './Navbar';

const FreePageCard = ({ location }) => {
  // Example: get data from navigation state if passed
  const state = location?.state || {};
  const score = state.score || 70;
  const issues = state.issues || 16;
  const tailoring = state.tailoring || '??%';
  const content = state.content || '66%';
  const section = state.section || '81%';
  const ats = state.ats || '83%';

  return (
    <div className="freepage-bg">
      <Navbar />
      <style>{`
        .freepage-bg {
          min-height: 100vh;
          background: #f8fafc;
          padding: 0;
        }
        .freepage-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }
        .score-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 2rem 2.5rem;
          min-width: 260px;
          max-width: 320px;
          flex: 1 1 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .score-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #f59e42;
        }
        .score-label {
          font-size: 1.1rem;
          color: #6366f1;
          margin-bottom: 1.5rem;
        }
        .score-issues {
          color: #ef4444;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        .score-details {
          width: 100%;
        }
        .score-detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .resume-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 2rem 2.5rem;
          flex: 2 1 500px;
          min-width: 320px;
        }
        .resume-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 1rem;
        }
        .resume-desc {
          color: #444;
          margin-bottom: 1.5rem;
        }
        .job-desc-box {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .insights-btn {
          background: linear-gradient(90deg, #6366f1 60%, #8b5cf6 100%);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.2s, transform 0.2s;
        }
        .insights-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .insights-btn:hover {
          background: linear-gradient(90deg, #8b5cf6 60%, #6366f1 100%);
          transform: translateY(-2px) scale(1.03);
        }
        @media (max-width: 900px) {
          .freepage-container { flex-direction: column; align-items: center; }
        }
      `}</style>
      <div className="freepage-container">
        <div className="score-card">
          <div className="score-label">Your Score</div>
          <div className="score-value">{score}/100</div>
          <div className="score-issues">{issues} Issues</div>
          <div className="score-details">
            <div className="score-detail-row">
              <span>Tailoring</span>
              <span>{tailoring}</span>
            </div>
            <div className="score-detail-row">
              <span>Content</span>
              <span>{content}</span>
            </div>
            <div className="score-detail-row">
              <span>Section</span>
              <span>{section}</span>
            </div>
            <div className="score-detail-row">
              <span>ATS Essentials</span>
              <span>{ats}</span>
            </div>
          </div>
        </div>
        <div className="resume-card">
          <div className="resume-title">RESUME TAILORING</div>
          <div className="resume-desc">
            Paste <b>the job you're applying for</b> and our checker will give you job-specific resume tailoring suggestions.
          </div>
          <div className="job-desc-box">
            <textarea
              placeholder="Paste job description here..."
              style={{ width: '100%', minHeight: '80px', border: 'none', background: 'transparent', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>
          <button className="insights-btn" disabled>Get Tailored Insights</button>
        </div>
      </div>
    </div>
  );
};

export default FreePageCard; 