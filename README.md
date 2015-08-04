Palindromer [![Build Status](https://travis-ci.org/SeanReece/palindromer.svg?branch=master)](https://travis-ci.org/SeanReece/palindromer)
===========
A simple RESTful API to submit and view palindromes. Written using the MEAN stack.

#Setup
Palindromer is configured to run out of the box using Docker Containers. Getting it running is as easy as running a few scripts to run the containers. 

##In production

Install Docker - [On EC2](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker)

###Mongo Setup
Palindromer uses MongoDB as a database. For convenience, a script has been included to run Mongo in a docker container.

The docker container uses the WiredTiger storage engine by default to make the best use of the limited RAM and disk space on an amazon EC2 instance. Since WiredTiger compresses all documents and indexes by default less RAM and disk space is used.

Start the MongoDB container
```
$ sh docker_mongo/create_mongo_container.sh
```

###Node Setup
Start the Node container
```
$ sh docker_node/create_node_container.sh
```
The script will pull the latest `seanreece/palindromer` image from docker hub (image is auto built from master) and run it in production mode and open on port 80.
The node container is configured to auto start on AMI boot and restart if the node process stops.

##On OSX
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



