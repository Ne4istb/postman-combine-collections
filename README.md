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

## Examples
```terminal
# Combines all collections in folder 'collections' and outputs it to 'composed.collection.json'
> postman-combine-collections --name Composed -f 'collections/*.postman_collection.json'  -o composed.collection.json
```

```terminal
# Combines Contributor.collection.json and Program_APIs.collection.json and outputs it to 'composed.collection.json'
> postman-combine-collections --name Composed -f  {Contributor,Program_APIs}.collection.json  -o composed.collection.json
```

> Check [glob-npm](https://www.npmjs.com/package/glob) and [How To Use Bash Wildcards For Globbing](https://www.shell-tips.com/bash/wildcards-globbing/) to understand file globbing better.

## Known issues
Q: tool takse only the first file from wild card file path match. 

A: It works in this way on Unix based systems. Check [this issue](https://github.com/Ne4istb/postman-combine-collections/issues/1#issuecomment-379370606) to find the solution.