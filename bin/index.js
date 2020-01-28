#!/usr/bin/env node

const yargs = require("yargs");

const options = yargs
  .usage('Usage: dcg [options]\nGenerate a sample docker-compose.yml file based on options')
  .option('s', { alias: 'service', describe: 'Service name', type: 'string', default: 'web' })
  .option('i', { alias: 'image', describe: 'Docker image', type: 'string', default: 'nginx:latest' })
  .option('p', { alias: 'port', describe: 'Port to expose', type: "string", default: '3000:80' })
  .argv;


console.log(options)
