#!/usr/bin/env node

const yargs = require('yargs');
const YAML = require('json2yaml');
const fs = require('fs');


const options = yargs
  .usage('Usage: dcg [options]\nGenerate a sample docker-compose.yml file based on options')
  .option('s', { alias: 'service', describe: 'Service name', type: 'string', default: 'web' })
  .option('i', { alias: 'image', describe: 'Docker image', type: 'string', default: 'nginx:latest' })
  .option('p', { alias: 'port', describe: 'Port to expose', type: 'string', default: '3000:80' })
  .option('build', { describe: 'Add build option', type: 'boolean', default: false })
  .option('w', { alias: 'write', describe: 'Write to file', type: 'boolean', default: false })
  .option('f', { alias: 'file', describe: 'File name to write', type: 'string', default: 'docker-compose.yml' })
  .argv;


const service = {
  [options.service]: {
    image: options.image,
    ports: [
      options.port
    ]
  }
}

if (options.build) {
  service[options.service].build = '.';
}

const template = {
  version: '3',
  services: {
    ...service
  }
};

const ymlText = YAML.stringify(template);

console.log(ymlText);

if (options.write) {
  fs.writeFileSync(options.file, ymlText);
}
