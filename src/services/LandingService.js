// Service for Landing page API calls
export async function checkRankings(url) {
  const response = await fetch('http://localhost:9090/rankings/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
} 