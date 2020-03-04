'use strict';

const winston = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const logOptions = require('../config/config').logOptions;

const logDir = logOptions.dir;

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFilename = path.join(logOptions.dir, logOptions.filename);

const format = winston.format.combine(
    winston.format.label({ label: path.basename(process.mainModule.filename) }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
        filename: logFilename
    })
]

const logger = winston.createLogger({
    level: logOptions.level,
    format: format,
    transports: transports,
    exitOnError: false
});

module.exports = logger;
