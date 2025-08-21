import React from "react";
import { FaBullseye, FaUsers, FaStar, FaChartLine, FaSearch, FaShieldAlt, FaGlobe, FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import { Navbar } from './Navbar';
import Footer from './Footer'; 

const team = [
  {
    name: "Rahul Nikale",
    role: "Full-Stack Developer",
     img: "/images/RahulCDAC.jpeg",
    //img: member3,
    desc: "Developers with a mission to make technology work beautifully.",
    socials: [
      { icon: <FaGoogle />, url: "https://www.google.com/" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/" },
      { icon: <FaGithub />, url: "https://github.com/" },
    ],
  },
  
  {
    name: "Isha Srivastava",
    role: "Full-Stack Developer",
    img: "/images/IshaCDAC.jpeg",
    desc: "Developers with a mission to make technology work beautifully.",
    socials: [
      { icon: <FaGoogle />, url: "https://www.google.com/" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/" },
      { icon: <FaGithub />, url: "https://github.com/" },
    ],
  },
  {
    name: "Aditi Pateria",
    role: "Frontend Developer",
    img: "/images/AditiCDAC.jpeg",
    desc: "Developers with a mission to make technology work beautifully.",
    socials: [
      { icon: <FaGoogle />, url: "https://www.gmail.com/" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/aditi-pateria-650a8127b" },
      { icon: <FaGithub />, url: "https://github.com/AditiPateria" },
    ],
  },
  
  {
    name: "Karan Mahajan",
    role: "Database Engineer",
     img: "/images/KaranCDAC.jpeg",
    //img: member4,
    desc: "Developers with a mission to make technology work beautifully.",
    socials: [
      { icon: <FaGoogle />, url: "https://www.google.com/" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/" },
      { icon: <FaGithub />, url: "https://github.com/" },
    ],
  },
  {
    name: "Kushal Sehrawat",
    role: "UX Designer",
     img: "/images/KushalCDAC.jpeg",
    //img: member5,
    desc: "Developers with a mission to make technology work beautifully.",
    socials: [
      { icon: <FaGoogle />, url: "https://www.google.com/" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/" },
      { icon: <FaGithub />, url: "https://github.com/" },
    ],
  },
];

const aboutStyles = {
wrapper: {
    minHeight: '100vh',
    width: '100%',               // avoid 100vw scrollbar issue
    margin: 0,
    padding: '0px',              // full-bleed
    backgroundImage: "url('/images/about3.avif')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',        // do not stretch inner content
    justifyContent: 'flex-start',
    overflow: 'hidden',
    boxSizing: 'border-box',      // ensure padding doesn't add to width
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', // match ContactUs overlay style
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1200px',          // constrain inner content
    margin: '0 auto',
    padding: '0 1rem',
    boxSizing: 'border-box',
  },
  glassCard: {
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: 'none',
    color: '#fff',
    margin: '0 auto 2rem auto',
    maxWidth: '1500px',
    width: '100%',
    padding: '2rem',
  },
  heading: {
    color: '#6c63ff',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2.5rem',
    letterSpacing: '1px',
  },
  subheading: {
    color: '#6c63ff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
  },
  featureList: {
    fontSize: '1.1rem',
    color: '#6c63ff',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    marginBottom: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    color: '#6c63ff',
  },
  teamHeading: {
    color: '#6c63ff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  teamRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  teamCard: {
    background: 'rgba(255,255,255,0.10)',
    borderRadius: '16px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: 'none',
    color: '#fff',
    width: '290px',
    padding: '2rem 1.5rem 1.5rem 1.5rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 1,
  },
  teamImg: {
    width: '120px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '3px solid #6c63ff',
    margin: '0 auto 1rem auto',
    display: 'block',
    background: '#fff',
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: '#6c63ff',
    marginBottom: '0.3rem',
  },
  teamRole: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  teamDesc: {
    color: '#fff',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  teamSocial: {
    color: '#6c63ff',
    fontSize: '1.3rem',
    margin: '0 0.4rem',
    transition: 'color 0.2s',
  },
};

const AboutUs = () => (
  <>
 
    
    <div style={aboutStyles.wrapper}>
      {/* Overlay for darkening background */}
      <div style={aboutStyles.overlay}></div>
      {/* Custom style for hover and placeholder */}
      <style>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
        .modern-glass-card {
          transition: transform 0.35s cubic-bezier(.21,1.02,.73,1), box-shadow 0.3s;
          will-change: transform;
        }
        .modern-glass-card:hover {
          transform: scale(1.07) translateY(-6px);
          box-shadow: 0 16px 40px 0 rgba(108,99,255,0.25), 0 2px 12px 0 rgba(0,0,0,0.18);
          z-index: 2;
        }
        a:hover { color: #fff !important; }
      `}</style>
      <div style={aboutStyles.content}>
        <h1 style={aboutStyles.heading}>About Serp Sentry</h1>
        {/* Mission */}
        <div className="modern-glass-card" style={aboutStyles.glassCard}>
          <h2 style={aboutStyles.subheading}><FaBullseye style={{marginRight:'0.5rem'}}/> Our Mission</h2>
          <p style={{ fontSize: "1.15rem", color: "#6c63ff", textAlign: 'center' }}>
            To revolutionize SEO monitoring with cutting-edge technology that provides real-time, accurate search ranking data. 
            We empower businesses to make data-driven decisions and stay ahead in the ever-evolving digital landscape.
          </p>
        </div>
        {/* Features */}
        <div className="modern-glass-card" style={aboutStyles.glassCard}>
          <h2 style={aboutStyles.subheading}><FaStar style={{marginRight:'0.5rem'}}/> Key Features</h2>
          <ul style={aboutStyles.featureList}>
            <li style={aboutStyles.featureItem}><FaChartLine/> Real-time SERP tracking across 100+ search engines</li>
            <li style={aboutStyles.featureItem}><FaSearch/> Competitor benchmarking and keyword gap analysis</li>
            <li style={aboutStyles.featureItem}><FaShieldAlt/> Algorithm update alerts and impact assessment</li>
            <li style={aboutStyles.featureItem}><FaGlobe/> Local and international ranking tracking</li>
          </ul>
        </div>
        {/* Team */}
        <div>
          <h2 style={aboutStyles.teamHeading}><FaUsers style={{marginRight:'0.5rem'}}/> Our Expert Team</h2>
          <div style={aboutStyles.teamRow}>
            {team.map((member, idx) => (
              <div className="modern-glass-card" key={idx} style={aboutStyles.teamCard}>
                {member.img && <img src={member.img} alt={member.name} style={aboutStyles.teamImg} />}
                <div>
                  <div style={aboutStyles.teamName}>{member.name}</div>
                  <div style={aboutStyles.teamRole}>{member.role}</div>
                  <div style={aboutStyles.teamDesc}>{member.desc}</div>
                  <div>
                    {member.socials.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={aboutStyles.teamSocial}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
);

export default AboutUs;