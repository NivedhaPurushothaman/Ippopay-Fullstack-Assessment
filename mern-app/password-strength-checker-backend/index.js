const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for Password models
const passwordSchema = new mongoose.Schema({
  password: { type: String, required: true },
});

const Password = mongoose.model('Password', passwordSchema);

// Endpoint to check password strength
app.post('/checkPasswordStrength', async (req, res) => {
  const password = req.body.password;
  const stepsRequired = checkPasswordStrength(password);

  // Save the password in the MongoDB database
  try {
    await Password.create({ password });
  } catch (error) {
    console.error('Error saving password to MongoDB:', error);
  }

  res.json({ stepsRequired });
});

// Password strength checker function
function checkPasswordStrength(password) {
    let stepsRequired = 0;
  
    // Check if the password is at least 6 and at most 20 characters long
    if (password.length < 6) {
      stepsRequired += 6 - password.length;
    } else if (password.length > 20) {
      stepsRequired += password.length - 20;
    }
  
    // Check if the password contains at least one lowercase letter, one uppercase letter, and one digit
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    if (!lowerCaseRegex.test(password)) {
      stepsRequired++;
    }
    if (!upperCaseRegex.test(password)) {
      stepsRequired++;
    }
    if (!digitRegex.test(password)) {
      stepsRequired++;
    }
  
    // Check if the password contains three repeating characters in a row
    for (let i = 0; i < password.length - 2; i++) {
      if (
        password.charCodeAt(i) === password.charCodeAt(i + 1) &&
        password.charCodeAt(i + 1) === password.charCodeAt(i + 2)
      ) {
        stepsRequired++;
        break;
      }
    }
  
    return stepsRequired;
  }

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
