import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserRegistration } from './components/UserRegistration';
import { UserLogin } from './components/UserLogin';
import AdminDashboard from './components/AdminDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import AboutUs from './components/AboutUs';
import { Users } from './components/Users';
import Landing from './components/Landing';
import SearchResults from './components/SearchResults';
import { getToken, getUserData } from './services/UserService';
import Layout from './components/Layout';
import ContactUs from './components/ContactUs';
import FreePageCard from './components/FreePageCard';
import ViewAllUsers from './components/ViewAllUsers';
import Add from './components/Add';
import KeywordExtractor from './components/KeywordExtractor';
import GetRankPage from './components/GetRankPage';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function PrivateRoute({ children, adminOnly = false }) {
    const token = getToken();
    const userData = getUserData();
    const isAdmin = userData?.role === 'ROLE_ADMIN';

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/individual-dashboard" />;
    }

    return children;
}

function App() {
    const token = getToken();
    const userData = getUserData();

    return (
        <Router>
            <ToastContainer />
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<UserRegistration />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/free-page-card" element={<FreePageCard />} />

                {/* Smart Root Redirect */}
                <Route
                    path="/"
                    element={
                        token ? (
                            userData?.role === 'ROLE_ADMIN'
                                ? <Navigate to="/admin-dashboard" />
                                : <Navigate to="/individual-dashboard" />
                        ) : (
                            <Landing />
                        )
                    }
                />

                {/* Routes with Navbar/Layout */}
                <Route element={<Layout />}>
                    {/* Admin Routes */}
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/viewallusers"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <ViewAllUsers />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Individual Protected Routes */}
                    <Route
                        path="/individual-dashboard"
                        element={
                            <PrivateRoute>
                                <IndividualDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/add"
                        element={
                            <PrivateRoute>
                                <Add />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/add/:projectId"
                        element={
                            <PrivateRoute>
                                <Add />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/get-rank/:projectId"
                        element={
                            <PrivateRoute>
                                <GetRankPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Public Pages (inside layout) */}
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/extract-keywords" element={<KeywordExtractor />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
