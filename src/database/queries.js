const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'maintainer', 'member') NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);
`;

const createTableInvitations = `
CREATE TABLE IF NOT EXISTS Invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'maintainer', 'member') NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiresAt DATETIME NOT NULL
);
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, NOW())
`;

const createInvitation =`
INSERT INTO invitations VALUES (?, ?, ?, ?)'
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createTableInvitations,
    createNewUser,
    createInvitation,
    findUserByEmail
};
