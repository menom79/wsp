const express = require('express');
const path = require('path');
const albumsRoute = require('./routes/albums');
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for albums
app.use('/api/albums', albumsRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
