#!/bin/bash
docker run -d -p 8080:8080 --link palindromer-mongo --restart=always palindromer-node-cent