#!/bin/bash
docker run --name palindromer-mongo -d -p 27017:27017 -v /data/db:/data/db mongo:latest --storageEngine=wiredTiger
#If the container already exists just start it
docker start palindromer-mongo
