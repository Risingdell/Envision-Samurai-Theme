-- Create users table for authentication
USE envision_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(10) NOT NULL,
  college VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Verify table was created
DESCRIBE users;

-- Show existing users (will be empty initially)
SELECT id, name, email, phone, college, created_at FROM users;
