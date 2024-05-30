const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Handle the register form submission
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Here you would add code to save the user details to your database
  // For demonstration, we just send a success response
  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
  res.send('Registration successful!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
