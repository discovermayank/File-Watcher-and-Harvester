'use strict';

const path = require('path');
const logger = require('./log-handler');
const watchedFiles = require('../config/config').watchedFiles;

function getFilePaths() {
    logger.info('Retrieving file paths to be watched :');
    var filePaths =  watchedFiles.map(file => file.filePath);
    logger.info(filePaths);
    return filePaths;
}

function getFileType(filePath) {
    logger.info(`Looking file type for : ${filePath}`);
    for (let item in watchedFiles) {
        if (path.basename(filePath) == path.basename(watchedFiles[item].filePath)) {
            logger.info(`File Type found : ${watchedFiles[item].fileType}`);
            return watchedFiles[item].fileType;
        }
    }
}

module.exports.getFilePaths = getFilePaths;
module.exports.getFileType = getFileType;
