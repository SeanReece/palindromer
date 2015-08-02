#!/bin/bash
#Run mongo container running latest mongo on wiredtiger storage engine. Persist data storage to host
docker run --name palindromer-mongo --restart=always -d -p 27017:27017 -v /data/db:/data/db mongo:latest --storageEngine=wiredTiger
