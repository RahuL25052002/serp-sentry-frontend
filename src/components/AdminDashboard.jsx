import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';
import { getCurrentCustomersCount, getRecentActivity, getUserRegistrationsPerMonth } from '../services/AdminUserService';
import { FaUsers, FaChartLine, FaDollarSign } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


// Helper to format "YYYY-MM" to "Mon YYYY"
const formatMonth = (ym) => {
  const [year, month] = ym.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    currentCustomers: 0,
    activeCustomers: 87.45,
    currentMRR: 678000,
    totalSales: 82,
    avgSales: 12,
    distribute: 15,
    returns: 3,
    recentUserCount: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState(null);

  // New state for registrations data
  const [registrationData, setRegistrationData] = useState([]);
  const [regLoading, setRegLoading] = useState(true);
  const [regError, setRegError] = useState(null);

  useEffect(() => {
    getCurrentCustomersCount()
      .then(data => {
        if (data && typeof data.totalUsers === "number") {
          setStats(prev => ({ ...prev, currentCustomers: data.totalUsers }));
        }
      })
      .catch(() => {
        setStats(prev => ({ ...prev, currentCustomers: 0 }));
      });

    getRecentActivity()
      .then(data => {
        setRecentActivity(Array.isArray(data.users) ? data.users : []);
        setStats(prev => ({
          ...prev,
          activeCustomers: data.count || 0
        }));
        setActivityLoading(false);
      })
      .catch(() => {
        setActivityError('Failed to load recent activity');
        setActivityLoading(false);
      });

    // Fetch user registrations per month
    getUserRegistrationsPerMonth()
      .then(data => {
        const formattedData = data.map(({ month, count }) => ({
          month: formatMonth(month),
          count,
        }));
        setRegistrationData(formattedData);
        setRegLoading(false);
      })
      .catch(() => {
        setRegError('Failed to load registration data');
        setRegLoading(false);
      });
  }, []);

  return (
    <div className="admin-dashboard-bg">
      <style>{`
        .admin-dashboard-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .dashboard-main {
          max-width: 1300px;
          margin: 0 auto;
          padding: 2rem 1rem 3rem 1rem;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .dashboard-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #6366f1;
        }
        .dashboard-users-btn {
          padding: 0.7rem 2rem;
          font-size: 1.1rem;
          background: #6366f1;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dashboard-users-btn:hover {
          background: #4f46e5;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        .dashboard-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 2rem 2.5rem;
          margin-bottom: 2rem;
        }
        .dashboard-kpi {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .kpi-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1rem 1.5rem;
        }
        .kpi-icon {
          font-size: 2rem;
          color: #6366f1;
        }
        .kpi-label {
          font-size: 1.1rem;
          color: #6366f1;
        }
        .kpi-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #222;
        }
        .analytics-pie {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: conic-gradient(#6366f1 0% 82%, #e9ecef 82% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #6366f1;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-title">Admin Dashboard</div>
          <button
            className="dashboard-users-btn"
            onClick={() => navigate('/viewallusers')}
          >
            View All Users
          </button>
        </div>
        <div className="dashboard-grid">
          <div>
            {/* Growth Chart */}
            <div className="dashboard-card">
              <div style={{ fontSize: '1.1rem', color: '#6366f1', marginBottom: '1rem' }}>
                User Registered Per Month
              </div>

              {BarChart ? (
                regLoading ? (
                  <div
                    style={{
                      height: 250,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6366f1'
                    }}
                  >
                    Loading chart...
                  </div>
                ) : regError ? (
                  <div style={{ color: 'red' }}>{regError}</div>
                ) : (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={registrationData}
                      margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
                      />
                      <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )
              ) : (
                <div
                  style={{
                    height: 250,
                    background: '#e9ecef',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6366f1'
                  }}
                >
                  [Growth Chart]
                </div>
              )}
            </div>

            {/* Analytics */}
            <div className="dashboard-card">
              <div style={{ fontSize: '1.1rem', color: '#6366f1', marginBottom: '0.5rem' }}>Analytics</div>
              <div className="analytics-pie">{stats.totalSales}%</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span style={{ color: '#6366f1' }}>Avg Sales</span>
                <span style={{ color: '#6366f1' }}>Distribute</span>
                <span style={{ color: '#6366f1' }}>Returns</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                <span>{stats.avgSales}%</span>
                <span>{stats.distribute}%</span>
                <span>{stats.returns}%</span>
              </div>
            </div>
          </div>

          {/* KPI Section */}
          <div>
            <div className="dashboard-card dashboard-kpi">
              <div className="kpi-item">
                <span className="kpi-icon"><FaUsers /></span>
                <span className="kpi-label">Current Customers</span>
                <span className="kpi-value">{stats.currentCustomers.toLocaleString()}</span>
              </div>
              <div className="kpi-item">
                <span className="kpi-icon"><FaChartLine /></span>
                <span className="kpi-label">Active Customers</span>
                <span className="kpi-value">{stats.activeCustomers}</span>
              </div>
              <div className="kpi-item">
                <span className="kpi-icon"><FaDollarSign /></span>
                <span className="kpi-label">Current MRR</span>
                <span className="kpi-value">${stats.currentMRR.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="dashboard-card" style={{ margin: '2rem auto', maxWidth: '1200px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#6366f1', marginBottom: '1rem' }}>Recent Activity</div>
        {activityLoading ? (
          <div>Loading...</div>
        ) : activityError ? (
          <div style={{ color: 'red' }}>{activityError}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#6366f1' }}>User Name</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#6366f1' }}>Project Name</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#6366f1' }}>Domain URL</th>
                  <th style={{ padding: '10px', textAlign: 'left', color: '#6366f1' }}>Updated On</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>No recent activity found.</td></tr>
                ) : recentActivity.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '10px' }}>{item.userName}</td>
                    <td style={{ padding: '10px' }}>{item.projectName}</td>
                    <td style={{ padding: '10px' }}>
                      <a href={item.domainUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'underline' }}>
                        {item.domainUrl}
                      </a>
                    </td>
                    <td style={{ padding: '10px' }}>{item.updatedOn ? new Date(item.updatedOn).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;