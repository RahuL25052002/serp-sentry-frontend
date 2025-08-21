import mysql from 'mysql2';

export function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Update this with your MySQL password
        database: 'expense_tracker'
    });
} 