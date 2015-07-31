Palindromer
===========
A simple RESTful API to submit and view palindromes. Written using the MEAN stack.

##Setup
Palindromer is a node application so the latest version of node needs to be installed.

###Mongo Setup
Palindromer needs to be configured to connect to the proper MongoDB.

Palindromer uses MongoDB as a database. For convenience, a script has been included to run Mongo in a docker container.

The docker container uses the WiredTiger storage engine to make the best use of the limited RAM and disk space on an amazon EC2 instance. Since WiredTiger compresses all documents and indexes by default less RAM and disk space is used.

####OSX
Install boot2docker

then start up the Mongo docker container
```
$ sh docker_mongo/create_mongo_container.sh
```
Then find the IP of the boot2docker image
```
$ boot2docker ip
```
Add the boot2docker ip as the mongo DB server URL in config.js

###Node
Install palindromer dependancies.
```
$ npm install
```
Run palindromer
```
$ node index.js
```

#Tests
Palindromer comes with some basic API tests using mocha and supertest. 
To run the tests first make sure palindromer is running locally then execute this command
```
$ npm test
```



