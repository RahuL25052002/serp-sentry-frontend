import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { results, url } = location.state || {};

  if (!results || !url) {
    return (
      <div className="search-results-page">
        <div className="no-results">
          <h2>No Results Found</h2>
          <p>Please go back and try searching again.</p>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <style>{`
        .search-results-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 0;
        }
        .results-header {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 12px rgba(99, 102, 241, 0.04);
          border-bottom: 1px solid #e5e7eb;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-weight: bold;
          font-size: 1.3rem;
          color: #6366f1;
        }
        .logo-ideas {
          color: #8b5cf6;
          font-weight: 500;
        }
        .back-btn {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-btn:hover {
          color: #178a4c;
        }
        .results-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .results-summary {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.07);
          margin-bottom: 2rem;
        }
        .results-title {
          color: #6366f1;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .url-display {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          word-break: break-all;
        }
        .results-data {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.07);
        }
        .data-title {
          color: #6366f1;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .data-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .data-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1.5rem;
          border-left: 4px solid #6366f1;
        }
        .data-label {
          color: #374151;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .data-value {
          color: #6366f1;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
        }
        .no-results h2 {
          color: #6366f1;
          margin-bottom: 1rem;
        }
        .no-results p {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .results-container {
            padding: 1rem;
          }
          .data-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="results-header">
        <div className="header-content">
          <Link to="/" className="logo">
            SERP<span className="logo-ideas">SENTRY</span>
          </Link>
          <Link to="/" className="back-btn">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="results-container">
        <div className="results-summary">
          <h1 className="results-title">Search Ranking Results</h1>
          <div className="url-display">
            <strong>URL:</strong> {url}
          </div>
        </div>

        <div className="results-data">
          <h2 className="data-title">Ranking Data</h2>
          <div className="data-grid">
            {Object.entries(results).map(([key, value]) => (
              <div key={key} className="data-card">
                <div className="data-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                <div className="data-value">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 