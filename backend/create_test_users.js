import bcrypt from 'bcryptjs';
import db from './db.js';

// Test users data
const testUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    college: 'MIT College',
    password: 'Test123!'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543211',
    college: 'Stanford University',
    password: 'Test123!'
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '9876543212',
    college: 'Harvard University',
    password: 'Test123!'
  },
  {
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '9876543213',
    college: 'Oxford University',
    password: 'Test123!'
  },
  {
    name: 'Test User',
    email: 'test@example.com',
    phone: '9999999999',
    college: 'Test College',
    password: 'TestPass123!'
  }
];

async function createTestUsers() {
  console.log('Creating test users...\n');

  for (const user of testUsers) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // Insert user
      const query = `
        INSERT INTO users (name, email, phone, college, password, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
      `;

      db.query(
        query,
        [user.name, user.email, user.phone, user.college, hashedPassword],
        (err, result) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              console.log(`⚠️  User already exists: ${user.email}`);
            } else {
              console.error(`❌ Error creating user ${user.email}:`, err.message);
            }
          } else {
            console.log(`✅ Created user: ${user.email} (Password: ${user.password})`);
          }
        }
      );
    } catch (error) {
      console.error(`❌ Error hashing password for ${user.email}:`, error);
    }
  }

  // Wait a bit for all queries to complete
  setTimeout(() => {
    console.log('\n✅ Test users creation completed!');
    console.log('\nYou can now login with any of these accounts:');
    console.log('─────────────────────────────────────────────────');
    testUsers.forEach(user => {
      console.log(`Email: ${user.email} | Password: ${user.password}`);
    });
    console.log('─────────────────────────────────────────────────\n');

    process.exit(0);
  }, 2000);
}

createTestUsers();
