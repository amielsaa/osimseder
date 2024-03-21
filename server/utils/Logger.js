const winston = require('winston');
//const { createLogger, transports, format } = winston;
const { combine, timestamp, printf, prettyPrint, errors} = winston.format


const logger = winston.createLogger({
  level: 'info',   // minimum level to transport
  //format: windows.format.json(), 
  //format: windows.format.cli(), 
    format: combine(
        errors({stack: true}),
        timestamp(),
        printf((info) => '${info.timestamp} ${info.level}: ${info.message}')
        //hes suggesting instead of the above line to put 
        //,json(), 
        //prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new transports.File({ filename: 'logfile.log', level: 'error' }) // min level to filename 
  ],
});


// This is how you use the logger !
// when you use this logger it will create a file called logfile.log
logger.info('This is an informational message');
logger.warn('This is a warning message');
logger.error('This is an error message');



const requestLog = {method: "GET", "isAuthenticated": false} //example for add extra fields
logger.error('This is an error message', requestLog);


const childLogger = logger.child(requestLog)//example for new logger
childLogger.error('This is an error message');

module.exports = logger;