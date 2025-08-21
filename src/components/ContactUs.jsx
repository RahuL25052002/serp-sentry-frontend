import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Navbar } from './Navbar';
import Footer from './Footer'; // Use default import if Footer uses `export default`

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message.');
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.wrapper}>
        <style>{`
          input::placeholder, textarea::placeholder {
            color: rgba(255,255,255,0.85);
            opacity: 1;
          }

          input:hover, input:focus, textarea:hover, textarea:focus {
            border-color: #6c63ff !important;
            box-shadow: 0 0 0 2px rgba(108,99,255,0.2);
            transition: box-shadow 0.2s, border-color 0.2s;
          }

          button[type="submit"]:hover, button[type="submit"]:focus {
            background-color: #554ee0 !important;
            box-shadow: 0 2px 12px 0 rgba(108,99,255,0.25);
            transition: background 0.2s, box-shadow 0.2s;
          }

          @media (max-width: 768px) {
            .contact-form-card {
              padding: 1.5rem;
            }
          }
        `}</style>

        <Toaster position="top-right" />
        <div style={styles.overlay}></div>

        <div style={styles.card} className="contact-form-card">
          <h2 style={styles.heading}>Contact Us</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label} htmlFor="name">Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label style={styles.label} htmlFor="email">Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label style={styles.label} htmlFor="message">Message</label>
            <textarea
              style={styles.textarea}
              name="message"
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundImage: "url('https://images.unsplash.com/photo-1696643830146-44a8755f1905?q=80&w=1332&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 1rem',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 0,
  },

  card: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.0)',
    border: 'none',
    padding: '2rem',
    color: '#fff',
  },

  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2.7rem',
    color: '#6c63ff',
    fontWeight: 'bold',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    marginLeft: '0.1rem',
    letterSpacing: '0.5px',
  },

  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #6c63ff',
    outline: 'none',
    fontSize: '1rem',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },

  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #6c63ff',
    outline: 'none',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '100px',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },

  button: {
    backgroundColor: '#6c63ff',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default ContactUs;
