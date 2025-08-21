import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
  Card,
  Badge
} from 'react-bootstrap';
import { getToken } from '../services/UserService';
import Footer from './Footer';

const GetRankPage = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rankMessage, setRankMessage] = useState('');
  const [error, setError] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [suggesting, setSuggesting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`http://localhost:9090/user/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(res.data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('❌ Could not load project. Please try again.');
      }
    };

    fetchProject();
  }, [projectId]);

  const handleExtractKeywords = async () => {
    if (!project?.domainUrl) return;
    setExtracting(true);
    setKeywords([]);
    setError('');
    setRankMessage('');
    setSuggestion('');

    try {
      const res = await axios.post(`http://localhost:9090/api/keywords`, {
        url: project.domainUrl
      });

      if (res.data && Array.isArray(res.data)) {
        setKeywords(res.data);
      } else {
        setError('⚠️ No keywords found.');
      }
    } catch (err) {
      console.error('Keyword extraction failed:', err);
      setError('❌ Failed to extract keywords. Try again.');
    } finally {
      setExtracting(false);
    }
  };

  const handleCheckRank = async (e) => {
    e.preventDefault();
    if (!keyword || !project?.domainUrl) {
      setError('Please enter a keyword.');
      return;
    }

    setLoading(true);
    setError('');
    setRankMessage(`🔄 Checking rank for "${keyword}"...`);

    try {
      const res = await axios.post(
        `http://localhost:9090/rankings/check`,
        {
          keyword,
          domainUrl: project.domainUrl,
          projectId: parseInt(projectId),
          location: 'United States',
          language: 'en',
          searchEngine: 'google'
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );

      const position = res.data.position;
      setRankMessage(
        `✅ "${keyword}" ranks at: ${position > 0 ? `#${position}` : 'Not Found in Top 100'}`
      );
    } catch (err) {
      console.error('Rank check failed:', err);
      setError('❌ Failed to check rank. Try again later.');
    } finally {
      setLoading(false);
    }
  };

 const handleGetSuggestions = async () => {
  setSuggestion('');
  setSuggesting(true);
  setError('');

  try {
    const res = await axios.post(
      'http://localhost:9090/api/suggestions',
      {
        keywords: keywords,           // ✅ send as field in object
        domainUrl: project.domainUrl  // ✅ include domain URL
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      }
    );

    setSuggestion(res.data);
  } catch (err) {
    console.error('Error getting suggestions:', err);
    setError('❌ Failed to get suggestions.');
  } finally {
    setSuggesting(false);
  }
};

  return (
    <>
    <div className="rank-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center text-primary mb-3">📈 SERP Rank Checker</h3>
                <p className="text-center text-muted">
                  Check keyword ranking for your project domain.
                </p>

                {error && <Alert variant="danger">{error}</Alert>}
                {rankMessage && (
                  <Alert variant={rankMessage.startsWith('✅') ? 'success' : 'info'}>
                    {rankMessage}
                  </Alert>
                )}

                <Form onSubmit={handleCheckRank}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Domain URL</Form.Label>
                    <Form.Control
                      type="url"
                      value={project?.domainUrl || ''}
                      readOnly
                      placeholder="Domain will appear here..."
                    />
                  </Form.Group>

                  <div className="mb-3 d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={handleExtractKeywords}
                      disabled={!project?.domainUrl || extracting}
                    >
                      {extracting ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Extracting...
                        </>
                      ) : (
                        '🔍 Extract Keywords'
                      )}
                    </Button>

                    <Button
                      variant="outline-success"
                      onClick={handleGetSuggestions}
                      disabled={keywords.length === 0 || suggesting}
                    >
                      {suggesting ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Suggesting...
                        </>
                      ) : (
                        '💡 Get Better Keyword Suggestions'
                      )}
                    </Button>
                  </div>

                  {keywords.length > 0 && (
                    <div className="mb-3">
                      <div className="mb-1">Suggested Keywords:</div>
                      {keywords.map((kw, idx) => (
                        <Badge
                          key={idx}
                          bg="secondary"
                          className="me-2 mb-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setKeyword(kw)}
                        >
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {suggestion && (
                    <Alert variant="success" className="mt-3">
                      <strong>AI Suggestions:</strong>
                      <div style={{ whiteSpace: 'pre-line' }}>{suggestion}</div>
                    </Alert>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Keyword to Check</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. best gaming laptop 2025"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading || keyword.trim() === ''}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" /> Checking...
                        </>
                      ) : (
                        'Check Rank'
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .rank-page {
          min-height: 100vh;
          background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80');
          background-size: cover;
          background-position: center;
          font-family: 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
    <Footer/>

    </>
  );
};

export default GetRankPage;
