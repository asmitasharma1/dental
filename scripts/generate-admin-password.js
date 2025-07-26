const bcrypt = require("bcryptjs")

async function generateHash() {
  const password = "admin123"
  const hash = await bcrypt.hash(password, 10)
  console.log('Password hash for "admin123":', hash)
  console.log("\nUpdate your database with:")
  console.log(`UPDATE admin_users SET password_hash = '${hash}' WHERE username = 'admin';`)
}

generateHash()
