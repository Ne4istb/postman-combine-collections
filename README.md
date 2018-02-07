# postman-combine-collections
A command line tool to combine several Postman collections into one.
Only collection schema verions >=2.0 are supported. More info about Postman collection schemas could be found here [http://schema.getpostman.com/](http://schema.getpostman.com/)

## Installation

postman-combine-collections can be installed using NPM or directly from the git repository within your NodeJS projects. If
installing from NPM, the following command installs the tool and saves in your `package.json`

```terminal
> npm install postman-combine-collections --save
```

## Usage

```terminal
> postman-combine-collections [options]
```
  *Options*:

    -V, --version              output the version number
    -f, --filePath <filePath>  Path or wildcard to collection files
    -n, --name [name]          New collection name (default: Root collection)
    -o, --output [output]      Output file name (default: ./root.collection.json)
    -h, --help                 output usage information
