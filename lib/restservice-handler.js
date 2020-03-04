'use strict';

const axios = require('axios');
const fileSystem = require('fs');
const formData = require('form-data');
const logger = require('./log-handler');
const url = require('../config/config').restURL;

async function postFile(fileType, filePath) {
    logger.info(`Sending ${fileType} : ${filePath} as post request to ${url}`);

    try {
        const data = new formData();
        data.append('file', fileSystem.createReadStream(filePath));
        data.append('fileType', fileType);
        
        const headers = {'Content-Type': `multipart/form-data; boundary=${data._boundary}`}
        
        const response = await axios.post(url, data, {headers: headers});
        logger.info('Response : %s', response.status);
        logger.info('%o', response.data);
    }
    catch(error) {
        logger.error(error);
    }
}

module.exports.postFile = postFile;
