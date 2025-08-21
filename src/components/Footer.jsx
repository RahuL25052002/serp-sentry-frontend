import React from "react";

const Footer = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        .landing-footer {
          background: #1f2937;
          color: #f9fafb;
          padding: 3rem 0 2rem 0;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          padding: 0 2rem;
          gap: 3rem;
        }

        .footer-column {
          flex: 1;
        }

        .footer-column h3 {
          color: #f9fafb;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border-bottom: 2px solid #6366f1;
          padding-bottom: 0.5rem;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column ul li {
          margin-bottom: 0.5rem;
        }

        .footer-column ul li a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-column ul li a:hover {
          color: #6366f1;
        }

        .footer-icons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          color: #9ca3af;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 2rem;
          }

          .footer-column {
            text-align: center;
          }

          .footer-icons {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Company</h3>
            <hr />
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <div className="footer-icons">
              <span>📘</span>
              <span>🔍</span>
              <span>🦜</span>
              <span>💼</span>
            </div>
            <h3>Demo</h3>
            <hr />
            <ul>
              <li><a href="#">Keyword Research Tool</a></li>
              <li><a href="#">Trending Tool</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} SERPSENTRY. All rights reserved. | {currentDate}
        </div>
      </footer>
    </>
  );
};

export default Footer;
