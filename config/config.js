'use strict';

// List of files to be watched for changes.
const watchedFiles = [ 
    {"fileType": "txt", "filePath" : "./texts/test.txt"},
    {"fileType": "log", "filePath" : "./logs/test.log"}
];

// Rest Endpoint to send request file contents.
const restURL = "";

// Logging Options.
const logOptions = {
    dir: 'logs',
    filename: `%DATE%.log`,
    level: 'info',
    handleExceptions: true,
};

// Ignore, please do not edit.
module.exports.watchedFiles = watchedFiles;
module.exports.restURL = restURL;
module.exports.logOptions = logOptions;
