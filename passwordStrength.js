// Function to check if a character is lowercase
function isLowercase(char) {
  return char >= 'a' && char <= 'z';
}

// Function to check if a character is uppercase
function isUppercase(char) {
  return char >= 'A' && char <= 'Z';
}

// Function to check if a character is a digit
function isDigit(char) {
  return char >= '0' && char <= '9';
}

function strongPasswordChecker(password) {
  let missingTypes = 3; // Number of missing character types (lowercase, uppercase, digit)
  
  if (password.length >= 6 && password.length <= 20) {
    if (/[a-z]/.test(password)) missingTypes--;
    if (/[A-Z]/.test(password)) missingTypes--;
    if (/[0-9]/.test(password)) missingTypes--;
    
    let repeatingChars = 0; // Number of repeating characters in a row
    let changes = 0; // Number of changes needed to make the password strong
    
    for (let i = 0; i < password.length;) {
      let length = 1; // Length of repeating characters
      while (i + length < password.length && password[i + length] === password[i + length - 1]) {
        length++;
      }
      
      repeatingChars += Math.floor(length / 3); // Increment repeatingChars by the number of changes needed
      
      if (length >= 3) {
        // Increment changes by the number of replacements needed to break the repeating characters
        changes += Math.floor(length / 3);
        
        // Update the length of password after replacements
        if (length % 3 === 0) {
          password = password.slice(0, i + 2) + password.slice(i + length);
        } else if (length % 3 === 1) {
          password = password.slice(0, i + 1) + password.slice(i + length);
        } else {
          password = password.slice(0, i) + password.slice(i + length - 1);
        }
      } else {
        i += length;
      }
    }
    
    changes += Math.max(0, missingTypes - repeatingChars); // Increment changes by the missing types
    
    return changes;
  } else {
    // If password length is less than 6 or more than 20, return the number of changes needed to make it within the range
    return Math.max(6 - password.length, password.length - 20);
  }
}

// Unit tests
console.log(strongPasswordChecker("a")); // Output: 5
console.log(strongPasswordChecker("aA1")); // Output: 3
console.log(strongPasswordChecker("1337C0d3")); // Output: 0
