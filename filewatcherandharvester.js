'use strict';

const logger = require('./lib/log-handler');
const configFile = require('./lib/configfile-handler');
const restService = require('./lib/restservice-handler');

const filePaths = configFile.getFilePaths();

global.watcher = require('./lib/filewatcher-handler').watch(filePaths, {
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 1000
  },
  disablePathNormalization: true  
})
.on('change', (filePath) => { 
  logger.info(`Change event detected for : ${filePath}`);
  let fileType = configFile.getFileType(filePath);
  restService.postFile(fileType, filePath);
})
.on('ready', () => { logger.info('Ready'); })

