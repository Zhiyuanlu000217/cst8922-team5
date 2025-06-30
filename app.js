const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure Express to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configure Express to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// --- NEW FEATURE: /api/stress endpoint for high concurrency simulation ---

// Inefficient recursive Fibonacci function (deliberately not optimized)
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Endpoint to simulate high CPU usage due to inefficient algorithm
app.get('/api/stress', (req, res) => {
  const { n } = req.query; // Get 'n' from query parameter, e.g., /api/stress?n=40

  if (!n || isNaN(n) || n < 0) {
    return res.status(400).json({ error: 'Please provide a positive number "n" for Fibonacci calculation (e.g., /api/stress?n=40).' });
  }

  const num = parseInt(n, 10);
  console.log(`STRESS TEST: Calculating Fibonacci(${num}). This might take a while...`);
  const startTime = process.hrtime.bigint(); // High-resolution time start

  const result = fibonacci(num); // This is the CPU-intensive part

  const endTime = process.hrtime.bigint(); // High-resolution time end
  const durationNs = endTime - startTime;
  const durationMs = Number(durationNs) / 1_000_000;

  console.log(`STRESS TEST: Fibonacci(${num}) calculated. Took ${durationMs.toFixed(2)}ms.`);

  res.json({
    status: 'success',
    message: `Fibonacci(${num}) calculated.`,
    result: result,
    calculation_time_ms: durationMs.toFixed(2),
    note: 'This endpoint simulates high CPU load due to an inefficient algorithm. Consider optimizing the fibonacci function.',
  });
});

// --- END NEW FEATURE ---


// Start the server
app.listen(PORT, () => {
  console.log(`DevOps Demo App is running on http://localhost:${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);
  console.log(`Stress Test endpoint available at: http://localhost:${PORT}/api/stress?n=40`);
});