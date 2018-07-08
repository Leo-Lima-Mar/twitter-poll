import * as fs from 'fs';
import * as winston from 'winston';

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

winston.configure({
    transports: [
        new winston.transports.File({
            filename: 'logs/twitter-poll.log',
            maxFiles: 10,
            maxsize: 100000
        })
    ]
});

export { winston as logger };
