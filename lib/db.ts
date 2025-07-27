// db.ts
import mysql from "mysql2/promise"

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "dentalclinic",
    password: process.env.DB_PASSWORD || "gorkhali",
    database: process.env.DB_NAME || "dental_clinic",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

let pool: mysql.Pool | null = null

export function getPool() {
    if (!pool) {
        pool = mysql.createPool(dbConfig)
        console.log("Database pool created with config:", {
            host: dbConfig.host,
            user: dbConfig.user,
            database: dbConfig.database,
        })
    }
    return pool
}

export async function query(sql: string, params?: any[]) {
    const connection = getPool()
    try {
        console.log("Executing query:", sql, "with params:", params)
        const [results] = await connection.execute(sql, params)
        console.log("Query results count:", Array.isArray(results) ? results.length : "Not an array")
        return results
    } catch (error) {
        console.error("Database query error:", error)
        console.error("SQL:", sql)
        console.error("Params:", params)
        throw error
    }
}

export default getPool