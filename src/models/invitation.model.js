const db = require('../config/db.config');
const { createInvitation: createInvitationQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class Invitation {
    constructor(email, role, token, expiresAt) {
        this.email = email;
        this.role = role;
        this.token = token;
        this.expiresAt = expiresAt;
    }
    // new Date(Date.now() + 24 * 60 * 60 * 1000)
    static create(newInvitation, cb) {
        db.query(createInvitationQuery,
            [
                newInvitation.email,
                newInvitation.role,
                newInvitation.token,
                newInvitation.expiresAt
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    token: newInvitation.token,
                    // firstname: newUser.firstname,
                    // lastname: newUser.lastname,
                    email: newInvitation.email
                });
            });
    }

//     static findByEmail(email, cb) {
//         db.query(findUserByEmailQuery, email, (err, res) => {
//             if (err) {
//                 logger.error(err.message);
//                 cb(err, null);
//                 return;
//             }
//             if (res.length) {
//                 cb(null, res[0]);
//                 return;
//             }
//             cb({ kind: "not_found" }, null);
//         })
//     }
}

module.exports = Invitation;