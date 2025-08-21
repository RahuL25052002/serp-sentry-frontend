const checkRankings = async (url) => {
  try {
    const response = await fetch('http://localhost:9090/rankings/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking rankings:', error);
    throw error;
  }
};

export { checkRankings }; 