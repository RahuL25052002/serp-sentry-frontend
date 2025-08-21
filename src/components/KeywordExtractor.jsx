import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Button,
  ListGroup,
  Alert,
  Spinner,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import Footer from './Footer';

const KeywordExtractor = () => {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [trialUsed, setTrialUsed] = useState(localStorage.getItem('freeRankCheckUsed') === 'true');
  const navigate = useNavigate();

  const handleExtract = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:9090/api/keywords', { url });
      setKeywords(res.data);
    } catch (err) {
      setMessage('❌ Error fetching keywords. Please try again.');
    }
  };

  const handleFreeRankCheck = async (keyword) => {
    if (trialUsed) {
      setMessage('⚠️ You have already used your free trial. Please sign up or login to continue.');
      return;
    }

    setLoading(true);
    setMessage(`🔄 Checking rank for "${keyword}"...`);

    try {
      const response = await axios.post('http://localhost:9090/rankings/check', {
        keyword,
        domainUrl: url,
        projectId: 0,
        location: 'United States',
        language: 'en',
        searchEngine: 'google'
      });

      localStorage.setItem('freeRankCheckUsed', 'true');
      setTrialUsed(true);

      const position = response.data.position;
      setMessage(
        `✅ "${keyword}" ranks at: ${position > 0 ? `#${position}` : 'Not Found in Top 100'}`
      );
    } catch (err) {
      setMessage('❌ Failed to check ranking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Container
      fluid
      className="p-0"
      style={{
        background: 'linear-gradient(135deg, #c091f1ff 0%, #96b5ecff 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Row className="justify-content-center w-100 m-0">
        <Col xs={12} md={8} lg={6}>
          <Card
            className="shadow-lg p-4"
            style={{
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <Card.Body>
              <h2 className="text-center fw-bold mb-3" style={{ letterSpacing: '1px' }}>
                🔎 Keyword Extractor & Rank Checker
              </h2>
              <p className="text-center text-light mb-4">
                Extract keywords from your website and get <strong>1 free rank check</strong>.
              </p>

              {message && (
                <Alert
                  variant={message.startsWith('✅') ? 'success' : 'warning'}
                  className="text-dark fw-semibold"
                >
                  {message}
                </Alert>
              )}

              <Form onSubmit={handleExtract}>
                <Form.Group className="mb-3" controlId="urlInput">
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={trialUsed}
                    style={{
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '1rem'
                    }}
                  />
                </Form.Group>
                {!trialUsed && (
                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="light"
                      className="fw-bold"
                      style={{
                        borderRadius: '10px',
                        background: 'linear-gradient(90deg, #ff9966, #ff5e62)',
                        color: 'white',
                        border: 'none',
                        fontSize: '1.1rem'
                      }}
                    >
                      Extract Keywords
                    </Button>
                  </div>
                )}
              </Form>

              {keywords.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-warning">📌 Extracted Keywords</h5>
                  <ListGroup variant="flush">
                    {keywords.map((k, i) => (
                      <ListGroup.Item
                        key={i}
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: 'white',
                          border: 'none'
                        }}
                      >
                        <span>{k}</span>
                        <Button
                          variant={trialUsed ? 'secondary' : 'success'}
                          size="sm"
                          disabled={trialUsed}
                          onClick={() => handleFreeRankCheck(k)}
                          title={
                            trialUsed
                              ? 'Free trial already used. Please sign up.'
                              : 'Check ranking for this keyword'
                          }
                          style={{
                            borderRadius: '8px',
                            fontWeight: 'bold'
                          }}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-1"
                                variant="light"
                              />
                              Checking...
                            </>
                          ) : (
                            'Check Rank (Free)'
                          )}
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}

              {trialUsed && (
                <div className="mt-4 text-center">
                  <p className="text-danger fw-bold">
                    Free trial used. Sign up to continue checking rankings.
                  </p>
                  <Button
                    variant="light"
                    className="fw-bold"
                    style={{
                      borderRadius: '10px',
                      background: 'linear-gradient(90deg, #43cea2, #185a9d)',
                      color: 'white',
                      border: 'none'
                    }}
                    onClick={() => navigate('/register')}
                  >
                    Sign Up to Continue
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default KeywordExtractor;
