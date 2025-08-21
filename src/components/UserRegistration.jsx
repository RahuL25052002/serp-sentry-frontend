import React from 'react';
import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { signUp } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import '../assets/styles/signupstyle.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Navbar } from './Navbar';

const UserRegistration = (props) => {
  const navigate = useNavigate();

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    role: 'ROLE_INDIVIDUAL'
  };

  const FieldValidation = ({ field, value, touched, validations }) => {
    if (!touched) return null;

    return (
      <div className="field-validations">
        {validations.map((validation, index) => {
          const isValid = validation.check(value);
          return (
            <div key={index} className={`validation-item ${isValid ? 'valid' : 'invalid'}`}>
              {isValid ? <FaCheck className="icon" /> : <FaTimes className="icon" />}
              <span>{validation.message}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const signUpSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Username is too short')
      .max(50, 'Username is too long')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$*]).{5,20})/,
        'Password must meet all requirements below'
      )
      .required('Password is required'),
    role: Yup.string()
      .oneOf(['ROLE_INDIVIDUAL', 'ROLE_ORGANIZATION', 'ROLE_ADMIN'], 'Invalid role')
      .required('Role is required')
  });

  const handleSubmit = async (formData) => {
    // Send the role value as selected
    const dataToSend = { ...formData };
    try {
      console.log('Submitting registration data:', dataToSend);
      const response = await signUp(dataToSend);
      console.log('Registration response:', response);

      // Display success message from backend if available
      const successMessage = response.message || "Registration Successful! Please login.";
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message success'
      });

      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);

      // Handle validation errors
      if (error.errors) {
        Object.values(error.errors).forEach(err => {
          toast.error(err, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'toast-message error'
          });
        });
        return;
      }

      // Handle general error message
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-message error'
      });
    }
  }

  const redirectToLogin = () => {
    navigate("/login");
  }

  return (
    <>
      <Navbar />
      {/* Background Image */}
      <div className="background-image"></div>

      {/* Overlay for better readability */}
      <div className="background-overlay"></div>
      <div className="registration-page">
        <style>
          {`
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1696643830146-44a8755f1905?q=80&w=1332&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index: -2;
  opacity: 1;
  }

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;/* 👈 Darker overlay = lower image visibility */
  z-index: -1;
}


/* === PAGE STRUCTURE === */
.registration-page {
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
  z-index: 0;
}

/* === CARD === */
.registration-card {
   background: transparent;
  border: none;
  
  
  overflow: hidden;
  position: relative;
  padding: 2rem;
}

.registration-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

/* === VALIDATION === */
.field-validations {
  margin-top: 0.25rem;
  font-size: 0.85rem;
}

.validation-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.validation-item.valid {
  color: #198754;
  background-color: #f8fff9;
}

.validation-item.invalid {
  color: #dc3545;
  background-color: #fff8f8;
}

/* === FORM FIELDS === */
.icon {
  font-size: 0.75rem;
}

.form-control {
background: transparent;   
color: #fff; 
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}
.form-control::placeholder {
  color: #ffffff;                         /* placeholder also pure white */
  opacity: 1;                             /* ensure full visibility */
}
.form-control:focus {
 background: transparent;   
  color: #ffffff;    

}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* === BUTTONS === */
.btn-primary {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
}

.btn-primary:disabled {
  background: #c7d2fe;
  box-shadow: none;
  transform: none;
}

.btn-success {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border: none;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
}

/* === TOASTS === */
.toast-message {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
}

.toast-message.error {
  border-left: 4px solid #dc3545;
}

.toast-message.success {
  border-left: 4px solid #198754;
}

/* === HEADINGS & TEXT === */
.registration-header {
  text-align: center;
  margin-bottom: 2rem;
  background: none;
  //background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white; /* 👈 changed from gradient to white */
  font-weight: 'bold';
  fontSize: '2.7rem'
  
}

.registration-header h2 {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white; 
}
.text1 {

  color: white !important; /* 👈 ensure white text for the quote */
}

.text-center.mb-4 p {
  color: white; /* 👈 changed from black to white */
}

.text-center.mb-4 p button {
  color: black; /* if you want the login button text black; otherwise change to white */
}
.registration-header p {

  color: black; /* Fixed to be visible on dark background */
}

.login-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-link:hover {
  color: #8b5cf6;
}

.text1 {
  color: black;
}
  option{
  color:black;
  }
`}
        </style>


        <Container>
          <div className="registration-header">
            <h2>Create Your Account</h2>
            <p className="text1">"Let your website speak — know its rank today."</p>
          </div>
          <div className="text-center mb-4">
            <p>Already have an account? <Button variant="success" onClick={redirectToLogin}>Login Now</Button></p>
          </div>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="registration-card">
                <Formik
                  initialValues={initialValues}
                  validationSchema={signUpSchema}
                  onSubmit={handleSubmit}
                >
                  {(formik) => {
                    const { errors, touched, isValid, dirty, values } = formik;
                    return (
                      <Form>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-4">
                              <label className="form-label">Username</label>
                              <Field
                                type="text"
                                className={`form-control ${errors.userName && touched.userName ? 'is-invalid' : ''}`}
                                placeholder="Enter username"
                                name="userName"
                              />
                              {errors.userName && touched.userName ? (
                                <div className="invalid-feedback">{errors.userName}</div>
                              ) : null}

                              <FieldValidation
                                field="userName"
                                value={values.userName}
                                touched={touched.userName}
                                validations={[
                                  { check: (v) => v.length >= 2, message: "At least 2 characters" },
                                  { check: (v) => v.length <= 50, message: "Maximum 50 characters" },
                                  { check: (v) => /^[A-Za-z]+$/.test(v), message: "Only letters allowed" }
                                ]}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-4">
                              <label className="form-label">Email</label>
                              <Field
                                type="email"
                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                placeholder="Enter email"
                                name="email"
                                autoComplete="new-email"
                              />
                              <FieldValidation
                                field="email"
                                value={values.email}
                                touched={touched.email}
                                validations={[
                                  { check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: "Valid email format required" }
                                ]}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-4">
                              <label className="form-label">Password</label>
                              <Field
                                type="password"
                                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                placeholder="Enter password"
                                name="password"
                                autoComplete="new-password"
                              />
                              <FieldValidation
                                field="password"
                                value={values.password}
                                touched={touched.password}
                                validations={[
                                  { check: (v) => v.length >= 5, message: "At least 5 characters" },
                                  { check: (v) => v.length <= 20, message: "Maximum 20 characters" },
                                  { check: (v) => /[A-Z]/.test(v), message: "At least one uppercase letter" },
                                  { check: (v) => /[a-z]/.test(v), message: "At least one lowercase letter" },
                                  { check: (v) => /[0-9]/.test(v), message: "At least one number" },
                                  { check: (v) => /[#@$*]/.test(v), message: "At least one special character (#, @, $, *)" }
                                ]}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            {/* Debug: Show current value of role */}

                            <div className="mb-4">
                              <label className="form-label">Role</label>
                              <Field
                                as="select"
                                name="role"
                                className={`form-control ${errors.role && touched.role ? 'is-invalid' : ''}`}
                              >
                                <option value="ROLE_INDIVIDUAL">Individual</option>
                                <option value="ROLE_ORGANIZATION">Organization</option>
                                <option value="ROLE_ADMIN">Admin</option>
                              </Field>
                            </div>
                          </Col>
                        </Row>

                        <div className="text-center mt-4">
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="px-5"
                            disabled={!(dirty && isValid)}
                          >
                            Create Account
                          </Button>
                        </div>
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Footer from Landing.jsx */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <div className="social-icons">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🔍</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">💼</a>
            </div>
            <h3>Demo</h3>
            <ul>
              <li><a href="#">Keyword Research Tool</a></li>
              <li><a href="#">Trending Tool</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} SERPSENTRY. All rights reserved. |{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </footer>
      <style>{`
              .landing-footer {
                background: #1f2937;
                color: #f9fafb;
                padding: 3rem 0 2rem 0;
                margin-top: 2rem;
              }
              .footer-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                padding: 0 2rem;
                gap: 3rem;
              }
                 .footer-bottom {
                text-align: center;
                margin-top: 2rem;
                color: #9ca3af;
                font-size: 0.85rem;
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
                display: inline-block;
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
              }
            `}</style>
    </>
  );
};

export { UserRegistration };