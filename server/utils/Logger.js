const winston = require('winston');
const { createLogger, transports, format } = winston;


const logger = createLogger({
  level: 'info', 
  format: format.simple(), 
  transports: [
    new transports.File({ filename: 'logfile.log' }) 
  ],
});


// This is how you use the logger !
// when you use this logger it will create a file called logfile.log
//logger.info('This is an informational message');
//logger.warn('This is a warning message');
//logger.error('This is an error message');

module.exports = logger;