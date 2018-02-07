#!/usr/bin/env node

const allowedSchemas = [
  'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
];

var fs = require('fs'),
  path = require('path'),
  glob = require('glob'),
  program = require('commander'),
  Collection = require('postman-collection').Collection;

program
  .version('1.0.1')
  .option('-f, --filePath <filePath>', 'Path or wildcard to collection files')
  .option('-n, --name [name]', 'New collection name', 'Root collection')
  .option('-o, --output [output]', 'Output file name', './root.collection.json')
  .description('A command line tool to combine several Postman collections into one')
  .parse(process.argv);

processFiles(program.filePath, program.name, program.output);

function processFiles(filePath, name, output) {
  const collections = readFiles(filePath);
  const collection = combine(name, collections);

  saveCollection(collection, output);
}

function readFiles(filePath) {
  const collections = [];

  const files = glob.sync(filePath);

  files.forEach(file => {
    try {
      const collection = JSON.parse(fs.readFileSync(file));
      collections.push(collection);
    } catch (ex) {
      console.warn(`File '${file}' is not Postman collection`);
    }
  });

  return collections;
}

function combine(name, collections) {
  const result = new Collection({
    info: {
      name: name
    }
  });

  result.items = collections.map(toFolder).filter(item => !!item);

  return result.toJSON();
}

function toFolder(collection) {
  const isCorrectCollection = collection && collection.info && allowedSchemas.includes(collection.info.schema);

  if (!isCorrectCollection) {
    console.warn(`Collection '${collection.name}' was not added. Not supported Postmant collection schema.`);
    return null;
  }

  const folder = Object.assign({}, collection);

  folder.name = folder.info.name;
  folder.description = folder.info.description;

  delete folder.info;

  console.info(`Collection '${collection.info.name}' was successfully added.`);

  return folder;
}

function saveCollection(collection, filePath) {
  ensureDirectoryExistence(filePath);

  fs.writeFile(filePath, JSON.stringify(collection), function(err) {
    if (err) {
      return console.log(err);
    }

    console.info(`Combined collection is saved to '${filePath}'`);
  });
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
