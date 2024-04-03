const winston = require('winston');
const { transports } = winston;
const { combine, timestamp, printf, errors, cli, json } = winston.format;

// Custom format for JSON logs on a single line with tabs
const singleLineTabbedFormat = printf(info => {
    let logMessage = `${info.timestamp} \t${info.level.toUpperCase()} \t${info.message}`;
    if (info.error) {
        logMessage += ` \t${info.error.message} \t${info.error.stack}`;
    }
    return logMessage;
});

// Combined format for housesLogger
const myCombinedFormat = combine(
    timestamp(),
    errors({ stack: true }),
    singleLineTabbedFormat
);

// create, edit, remove, add task, edit task, add photos
const housesLogger = winston.createLogger({
    level: 'info',   // minimum level to transport
    format: myCombinedFormat,
    transports: [
        new transports.File({ filename: 'loggers/housesLogFile.log' }) 
    ],
});

// create, edit, remove, add TO
const groupsLogger = winston.createLogger({
    level: 'info',   // minimum level to transport
    format: myCombinedFormat,
    transports: [
        new transports.File({ filename: 'loggers/groupsLogFile.log' })
    ],
});

const usersLogger = winston.createLogger({
    level: 'info',   // minimum level to transport
    format: myCombinedFormat,
    transports: [
        new transports.File({ filename: 'loggers/usersLogFile.log' })  
    ],
});

module.exports = {
    housesLogger,
    groupsLogger,
    usersLogger};
