import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { login, storeToken, storeUserData } from "../services/UserService";
import { Navbar } from './Navbar';

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            if (response.data) {
                const { token, ...userData } = response.data;
                storeToken(token);
                storeUserData(userData);
                toast.success('Login successful!');
                if (userData.role === 'ROLE_ADMIN') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/individual-dashboard');
                }
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

   return (
    <>
        <style>{`
            .page-container {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            .login-page {
                height: 100vh;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .background-image {
                position: absolute;
                inset: 0;
                background-image: url('https://images.unsplash.com/photo-1696643830146-44a8755f1905?q=80&w=1332&auto=format&fit=crop');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-attachment: fixed;
                opacity: 1;
                z-index: -2;
            }

            .background-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.2);
                z-index: -1;
            }

            .login-card {
                background: transparent;
                border: none;
                position: relative;
                z-index: 1;
            }

            .form-control {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 0.75rem;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }

            .form-control::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }

            .form-label {
                font-weight: 500;
                color: #fff;
            }

            .btn-primary {
                background: linear-gradient(45deg, #6366f1, #8b5cf6);
                border: none;
                padding: 0.75rem;
            }

            .btn-primary:hover {
                transform: translateY(-1px);
            }

            .register-link {
                color: #6366f1;
                text-decoration: none;
                font-weight: 500;
            }

            .register-link:hover {
                color: #8b5cf6;
            }

            .text-muted {
                color: white!important;
                font-weight: bold;
            }

            .login-header h2 {
                background: linear-gradient(45deg, #6366f1, #8b5cf6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
            }

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

            .social-icons {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .social-icon {
                width: 40px;
                height: 40px;
                background: #374151;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                font-size: 1.2rem;
                transition: background 0.2s;
            }

            .social-icon:hover {
                background: #6366f1;
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

                .social-icons {
                    justify-content: center;
                }

                .login-page {
                    height: auto;
                    padding: 4rem 0;
                }
            }
        `}</style>

        <div className="page-container">
            <Navbar />

            <div className="login-page">
                <div className="background-image"></div>
                <div className="background-overlay"></div>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={5} xl={4}>
                            <Card className="login-card p-4">
                                <Card.Body>
                                    <div className="login-header text-center">
                                        <h2>Welcome Back!</h2>
                                        <p className="text-muted">Sign in to continue to your account</p>
                                    </div>

                                    <Form onSubmit={handleSubmit} autoComplete="off">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                autoComplete="new-email"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                required
                                                autoComplete="new-password"
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="w-100 mb-3">
                                            Sign In
                                        </Button>

                                        <div className="text-center">
                                            <p className="mb-0">
                                                Don't have an account?{' '}
                                                <Link to="/register" className="register-link">
                                                    Register here
                                                </Link>
                                            </p>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Footer */}
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

  {/* 👇 Copyright and Date */}
  <div className="footer-bottom">
    © {new Date().getFullYear()} SERPSENTRY. All rights reserved. | {new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  </div>
</footer>

        </div>
    </>
);

};

export { UserLogin };
