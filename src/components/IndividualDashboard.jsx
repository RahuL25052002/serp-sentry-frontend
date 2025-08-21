import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndividualById } from '../services/IndividualService';
import { getProjectsByUserId, deleteProject } from '../services/ProjectService';
import { getToken } from '../services/UserService';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import Footer from '../components/Footer';

const IndividualDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});

  const getUserData = () => {
    try {
      const localUser = JSON.parse(localStorage.getItem('user_data') || '{}');
      const userId = localUser?.id || localUser?.userId || localUser?.user_id;
      const email = localUser?.email || localUser?.username || localUser?.sub;
      return { localUser, userId, email };
    } catch (err) {
      console.error('Error parsing user data from localStorage:', err);
      return { localUser: {}, userId: null, email: null };
    }
  };

  const { localUser, userId: storedUserId, email } = getUserData();
  const [actualUserId, setActualUserId] = useState(storedUserId);

  const getUserByEmail = async (email) => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:9090/individuals/email', {
        params: { email },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user by email:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let userId = storedUserId;
        let userDetails = null;

        if (userId) {
          userDetails = await getIndividualById(userId);
        } else if (email) {
          userDetails = await getUserByEmail(email);
          userId = userDetails?.id || userDetails?.userId || userDetails?.user_id;
          if (userId) setActualUserId(userId);
        }

        if (!userId) throw new Error('Could not determine user ID');
        if (!userDetails) throw new Error('Could not fetch user details');

        setUser(userDetails);

        const projectList = await getProjectsByUserId(userId);
        setProjects(Array.isArray(projectList) ? projectList : []);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(err.message || 'Failed to load data. Please check API or login again.');
      } finally {
        setLoading(false);
      }
    }

    if (storedUserId || email) fetchData();
    else {
      setError('No user information found in localStorage. Please login again.');
      setLoading(false);
    }
  }, [storedUserId, email]);

  // Fetch rankings count for each project
  useEffect(() => {
    async function fetchProjectStats() {
      if (!projects.length) return;

      try {
        const token = getToken();
        const stats = await Promise.all(
          projects.map(async (proj) => {
            const res = await axios.get(`http://localhost:9090/rankings/project/${proj.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return {
              name: proj.name || `Project #${proj.id}`,
              projects: 1,
              rankings: res.data?.length || 0
            };
          })
        );
        setChartData(stats);
      } catch (err) {
        console.error("Error fetching rankings per project:", err);
      }
    }

    fetchProjectStats();
  }, [projects]);

  const handleAddProject = () => navigate('/add');

  const handleEditProject = (projectId) => {
    navigate(`/add/${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(prev => ({ ...prev, [projectId]: true }));

    try {
      await deleteProject(projectId);
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [projectId]: false }));
    }
  };

  return (
    <>
      <div className="individual-dashboard-bg">
         <style>{`
        .individual-dashboard-bg {
          min-height: 100vh;
          /* Gradient overlay + background image */
          background: 
            linear-gradient(135deg, rgba(248,249,250,0.6) 0%, rgba(233,236,239,0.6) 100%),
            url('/images/bg5.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          padding: 0;
        }
        .dashboard-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 1.5rem;
        }
        .dashboard-message {
          font-size: 1.2rem;
          color: #444;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 2rem 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }
        .project-list {
          width: 100%;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
        }
        .project-list h3 {
          color: #6366f1;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        .project-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          background: #f9fafb;
          transition: all 0.2s ease;
        }
        .project-item:hover {
          background: #f3f4f6;
          border-color: #6366f1;
          transform: translateY(-1px);
        }
        .project-info {
          flex: 1;
        }
        .project-name {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .project-description {
          font-size: 0.9rem;
          color: #6b7280;
        }
        .project-meta {
          font-size: 0.85rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }
        .project-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-edit {
          background: #10b981;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .btn-edit:hover {
          background: #059669;
        }
        .btn-delete {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .btn-delete:hover {
          background: #dc2626;
        }
        .btn-delete:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        .chart-container {
          width: 100%;
          max-width: 400px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(44, 62, 80, 0.07);
          padding: 1.5rem 2rem;
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
        }
        .insights-btn:hover {
          background: linear-gradient(90deg, #8b5cf6 60%, #6366f1 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .no-projects {
          text-align: center;
          color: #6b7280;
          font-style: italic;
          padding: 2rem;
        }
        .error-message {
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 1rem;
        }
          .btn-rank {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.btn-rank:hover {
  background: #4f46e5;
}
  .btn-edit i,
.btn-delete i,
.btn-rank i {
  vertical-align: middle;
}
      `}</style>

        <div className="dashboard-container">
          <div className="dashboard-title">Welcome to your Dashboard!!</div>

          <div style={{ width: '100%', textAlign: 'right', marginBottom: '1rem' }}>
            <button className="insights-btn" onClick={handleAddProject}>
              + Add Project
            </button>
          </div>

          {loading && <div className="dashboard-message">Loading...</div>}

          {error && (
            <div className="dashboard-message error-message">
              {error}
              <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                <strong>Debug Info:</strong> User ID: {actualUserId || 'Not found'}, Email: {email || 'Not found'}
              </div>
            </div>
          )}

          <div className="project-list">
            <h3>Your Projects ({projects.length})</h3>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="project-item">
                  <div className="project-info">
                    <div className="project-name">
                      {project.name || `Project #${project.id}`}
                    </div>
                    <div className="project-meta">
                      {project.creationDate && (
                        <> • Added: {new Date(project.creationDate).toLocaleDateString()}</>
                      )}
                      <br />
                      {project.domainUrl && (
                        <span>
                          Domain:{' '}
                          <a
                            href={project.domainUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#4f46e5' }}
                          >
                            {project.domainUrl}
                          </a>
                        </span>
                      )}
                      {project.userName && (
                        <><br />User: {project.userName}</>
                      )}
                    </div>
                  </div>
                  <div className="project-actions">
                    <button className="btn-edit" onClick={() => handleEditProject(project.id)}>
                      <i className="bi bi-pencil-square me-1"></i>
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={deleteLoading[project.id]}
                    >
                      {deleteLoading[project.id] ? (
                        <>
                          <i className="bi bi-hourglass-split me-1"></i> Deleting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-trash-fill me-1"></i>
                        </>
                      )}
                    </button>

                    <button
                      className="btn-rank"
                      onClick={() => navigate(`/get-rank/${project.id}`)}
                    >
                      <i className="bi bi-graph-up-arrow me-1"></i> Get Rank
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects">
                No projects found. Click "Add Project" to create your first project!
              </div>
            )}
          </div>

          {!loading && !error && chartData.length > 0 && (
            <div className="chart-container">
              <h3 style={{ color: '#6366f1', marginBottom: '1rem' }}>
                Projects & Rankings
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="projects" fill="#6366f1" name="Projects" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="rankings" fill="#10b981" name="Rankings" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndividualDashboard;
