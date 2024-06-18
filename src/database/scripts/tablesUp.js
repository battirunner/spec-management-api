const { logger } = require('../../utils/logger');
const { createTableUSers: createTableUSersQuery, createTableInvitations: createTableInvitationsQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(`${createTableUSersQuery} ${createTableInvitationsQuery}`, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users, invitations created!');
        process.exit(0);
    });
})();
