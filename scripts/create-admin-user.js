const bcrypt = require("bcryptjs")
const mysql = require("mysql2/promise")

async function createAdminUser() {
    const dbConfig = {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "dentalclinic",
        password: process.env.DB_PASSWORD || "gorkhali",
        database: process.env.DB_NAME || "dental_clinic",
    }

    try {
        console.log("Connecting to database...")
        const connection = await mysql.createConnection(dbConfig)

        // Generate password hash
        const password = "admin123"
        const passwordHash = await bcrypt.hash(password, 10)
        console.log("Generated password hash:", passwordHash)

        // Check if admin user already exists
        const [existingUsers] = await connection.execute("SELECT * FROM admin_users WHERE username = ?", ["admin"])

        if (existingUsers.length > 0) {
            console.log("Admin user already exists. Updating password...")
            await connection.execute("UPDATE admin_users SET password_hash = ? WHERE username = ?", [passwordHash, "admin"])
            console.log("Admin password updated successfully!")
        } else {
            console.log("Creating new admin user...")
            await connection.execute("INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)", [
                "admin",
                "admin@smilebydrkareen.com",
                passwordHash,
                "admin",
            ])
            console.log("Admin user created successfully!")
        }

        // Verify the user was created/updated
        const [users] = await connection.execute("SELECT id, username, email, role FROM admin_users WHERE username = ?", [
            "admin",
        ])
        console.log("Admin user details:", users[0])

        await connection.end()
        console.log("\n✅ Setup complete! You can now login with:")
        console.log("Username: admin")
        console.log("Password: admin123")
    } catch (error) {
        console.error("❌ Error setting up admin user:", error)
        process.exit(1)
    }
}

createAdminUser()
